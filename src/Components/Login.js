import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Asset/Login.css"
import { VscAccount } from "react-icons/vsc";



const Login = (props) => {
    const [credentails, setCredentails] = useState({ email: "", password: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://backend-jet-two.vercel.app/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentails.email, password: credentails.password }),
        });
        const json = await response.json()
        console.log("Here is my result", json)
        // Clear the input fields after successful submission
        setCredentails({ email: "", password: "" });

        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logned in Successfully","success")
            history("/")
            

        }
        else {
            props.showAlert("Invalide credentials","danger")
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
        <div className='mt-3'>
            <div className='login-box'>
            <VscAccount className="icon mx-3 my-1" size={100}/>
            <h2 className='Login-sen'>Login to access the eNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={credentails.email} onChange={onchange} name="email" placeholder="Email Address" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentails.password} onChange={onchange} name="password" placeholder='Password' id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary" >Log in</button>
            </form>
            </div>
        </div>
    )
}

export default Login
