import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Asset/Signup.css"
import { VscAccount } from "react-icons/vsc";


const Signup = (props) => {

  const [credentails, setCredentails] = useState({ name: "", email: "", password: "", cpassword:"" })
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password} = credentails;
    const response = await fetch('https://backend-jet-two.vercel.app/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json()
    console.log(json)

    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      history("/")
      props.showAlert("Account Created Successfully","success")

    }
    else {
      props.showAlert("Invalide details", "danger")
     
    }
    //   setNotes(notes.concat(note))
    //   setNotes([...notes, note]); // Update the notes state
    //   setAlert("The note has been added successfully"); // Set the alert
    //   setTimeout(() => setAlert(null), 5000); // Reset the alert after 5 seconds
  }

  const onchange = (e) => {
    setCredentails({ ...credentails, [e.target.name]: e.target.value })

  }

  return (
    <div className='sign-box mt-3'>
      <VscAccount className="icon mx-3 my-1" size={100}/>
      <h2 className='sign-sen'>Please sign up to create an Account on eNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange} name="name" placeholder="Enter Your Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" onChange={onchange} name="email" placeholder="Enter Your email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={onchange} name="password" placeholder="Password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2" onChange={onchange} name="cpassword" placeholder="Confirm Password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
