import noteContext from "./noteContext";
import { useState, useEffect } from "react";


const NoteState = (props) => {

  const host = "http://localhost:5000"

  const noteInitial = []
  const userInitial = JSON.parse(localStorage.getItem("user")) || null; // Assuming user data is an object



  const [notes, setNotes] = useState(noteInitial)
  const [user, setUser] = useState(userInitial);



  // Get all note
  const getNotes = async () => {

    // API Calling
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      if (response.ok) {
        const json = await response.json();
        setNotes(json); // Update the notes state
      } else {
        console.error('Failed to fetch notes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };




  // Add a note
  const addnote = async (title, description, tag) => {
    // API calling
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setNotes(notes.concat(note))
    setNotes([...notes, note]); // Update the notes state
  }





  // Delete a note
  const deletenote = async (id) => {
    // To do API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes)

  }




  // Edit a note
  const editnote = async (id, title, description, tag) => {

    // API Calling
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))



    // Logic to edit the notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag
        break;
      }

    }
    setNotes(newNotes)
  }

  // Get user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        // Handle the case when the token is not present
        return;
      }
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          console.log("Here is the data:", userData);
  
          // Update the user state immediately after receiving the data
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    // Fetch user data whenever the token changes
    fetchUserData();
    // eslint-disable-next-line
  }, [localStorage.getItem('token')]);


  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };


  



  return (
    <noteContext.Provider value={{ notes, user, addnote, deletenote, editnote, getNotes, alert,logoutUser}}>
      {props.children}
    </noteContext.Provider>
  )

}


export default NoteState;


