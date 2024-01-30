import { Link,useLocation,useNavigate } from "react-router-dom";
import React, { useContext} from 'react'
import noteContext from '../Context/notes/noteContext'
import { FaUser } from "react-icons/fa";



const Navbar = () => {
  let history = useNavigate();
  const { user,logoutUser} = useContext(noteContext);
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history("/login");
    logoutUser()
  }
  let location = useLocation();
 
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            eNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className= {`nav-link ${location.pathname==='/' ? "active" : " "}`} aria-current="page" to="/">
                  Your Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about' ? "active" : " "}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem('token') && user && user.name ?  (
              <div className="d-flex align-items-center">
                <span className="text-white me-3 d-flex align-items-center"> <FaUser className="mx-1"/>Welcome, {user.name}</span> 
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
              </div>
            ) : (
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;