import React, { useState } from 'react'
import axios from 'axios';


export default function EditableMessage({message, setRefresh, refresh, onRefresh}) {

    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(message.message);


    const deleteMessage = async(id) => {
        try {
            const response = await axios.delete(`http://localhost:9000/messages/delete/${id}`);
          } catch (error) {
            console.error(error); // Handle any errors that occur
          }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };


      const submitEdit = async() => {
        try {
            const response = await axios.put(`http://localhost:9000/messages/edit/${message.id}`, { message: inputValue });
          } catch (error) {
            console.error(error); // Handle any errors that occur
          }
    }

  return (
    <div className='message-card'>
        {/* <h4>{message.user}</h4> */}
        <p>{message.message}</p>
        <button className='blue-button' onClick={() => setEditing(!editing)}>Edit</button>
        <button className='red-button' onClick={() => {deleteMessage(message.id).then(onRefresh())}}>Delete</button>
        {editing && 
        <div>
            <input type='text' value={inputValue} onChange={handleInputChange}></input>
            <button className='green-button' onClick={() => submitEdit().then(onRefresh())}>Submit</button>
        </div>}
    </div>
  )
}
