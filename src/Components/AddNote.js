import React, { useContext, useState} from 'react'
import noteContext from '../Context/notes/noteContext'



const AddNote = (props) => {
    const contextValue = useContext(noteContext);
    const {addnote} = contextValue;

    
   const [note,setNote]= useState({title:"", description:"", tag:""})
    
    const handleClick=(e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag )
        setNote({title:"", description:"", tag:""})
        props.showAlert("The note has been added successfully", "success")

    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})

    }

  return (
    <div>
      <div className='container my-3'>
        <h2>Add your notes here</h2>
        <form>
          <div className="my-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name ="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="desc" name='description' value={note.description} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
