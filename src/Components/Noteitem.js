import React, { useContext,useState,useEffect } from 'react';
import noteContext from '../Context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deletenote} = context;
  const { note, updateNote } = props;
  const storedColor = localStorage.getItem(`noteColor-${note._id}`);
  const [color, setColor] = useState(storedColor || "#ffffff"); // Default color is white
  const [showColorPicker, setShowColorPicker] = useState(true);



  const handleColorChange = async (selectedColor) => {
    try {
      // Send a request to update the note's color on the server
      const response = await fetch(`https://backend-jet-two.vercel.app/api/notes/updatenote/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') // Add your authorization token if required
        },
        body: JSON.stringify({ color: selectedColor })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update color');
      }
  
      // Update the color in the frontend
      setColor(selectedColor);
      setShowColorPicker(false);
    } catch (error) {
      console.error('Error updating color:', error.message);
      // Handle error
    }
  };
  

  const handleCardClick = (e) => {
    // Check if the click originated from the color picker input
    if (e.target.type !== "color") {
      setShowColorPicker(!showColorPicker); // Toggle the color picker visibility
    }
  };

   // Function to invert the color
   const invertColor = (hexColor) => {
    // Remove the leading '#' if present
    hexColor = hexColor.replace(/^#/, '');

    // Convert the hex color to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Invert the RGB values
    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;

    // Convert the inverted RGB values back to hex
    const invertedHexColor = `#${((invertedR << 16) | (invertedG << 8) | invertedB).toString(16).padStart(6, '0')}`;

    return invertedHexColor;
  };

  const textColor = invertColor(color);

  useEffect(() => {
    // Clean up localStorage when the component unmounts
    return () => {
      console.log("Stored color:", storedColor);
    };
  }, [storedColor]);




  //   console.log('Noteitem props:', props); // Log the props

  return (
    <div className='col-md-3'>
      <div className="card my-3" style={{border:`2px solid ${color}`, backgroundColor: color, color:textColor}} onClick={handleCardClick}>
        <div className="card-body">
          <div className='d-flex align-items-center'>
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash-can mx-2" onClick={() => { deletenote(note._id); props.showAlert("The note has been deleted successfully","success") }}></i>
            <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            {/* Example color picker using Bootstrap colorpicker */}
            {showColorPicker && (<input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              style={{ marginLeft: 'auto', marginRight: '10px'}}
            />)}
          </div>
          <p className="card-text">{note.description}</p>
          {/* <p className='card-text'><h5>Tag:</h5> {note.tag}</p> */}

        </div>
      </div>
    </div>
  );
};

export default Noteitem;
