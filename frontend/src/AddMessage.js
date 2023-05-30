import React, { useState } from 'react'
import axios from 'axios';


export default function AddMessage({user, handleRefresh}) {

    const [newMessage, setNewMessage] = useState('');

    const submitMessage = async() => {
        try {
            const response = await axios.post(`http://localhost:9000/messages/new/${user}`, { message: newMessage });
            // setRefresh(refresh+1);
            handleRefresh();
          } catch (error) {
            console.error(error); // Handle any errors that occur
          }
    }

  return (
    <div className='message-card'>
      <input id='user-input' type='text' placeholder='Write a new message' onChange={(e) => setNewMessage(e.target.value)}></input>
      <button className="green-button" onClick={submitMessage}>Submit</button>
    </div>
  )
}
