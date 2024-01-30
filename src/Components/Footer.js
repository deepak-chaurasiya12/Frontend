import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import noteContext from '../Context/notes/noteContext';
import './Asset/Footer.css'



const Footer = () => {
    const { user,logoutUser} = useContext(noteContext);
    const handleLogout = () => {
        // Call the logoutUser function from the context to update the user state
        logoutUser();
    };

    

    return (
            <div className="footer my-5">
                <section className="">
                    <footer className="text-center text-white">
                        <div className="container p-4 pb-0">
                            <section className="">
                                {user && user.name ? (
                                    // If the user is logged in, show the user name
                                    <p className="d-flex justify-content-center align-items-center">
                                        <span className="me-3">Logged in as {user.name}</span>
                                    </p>
                                ) : (
                                    // If the user is not logged in, show the "Register for free" section
                                    <p className="d-flex justify-content-center align-items-center">
                                        <span className="me-3">Register for free</span>
                                        <button type="button" className="btn btn-outline-light btn-rounded" onClick={handleLogout}>
                                            <Link to="/signup" className="text-decoration-none text-white">Sign up!</Link>
                                        </button>
                                    </p>
                                )}
                            </section>
                        </div>
                        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        © 2024 Copyright:
                            <Link className="text-white" to="/about"> eNotes</Link>
                        </div>
                    </footer>
                </section>
            </div>
        
    );
};

export default Footer;
