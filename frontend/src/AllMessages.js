import React, { useEffect, useState } from 'react'

export default function AllMessages({refresh}) {

    const [allMessages, setAllMessages] = useState();

    useEffect(() => {
        fetch("http://localhost:9000/messages/all")
        .then((res) => res.json())
        .then((res) => setAllMessages(res.result))
        .catch((err) => console.log(err))
      }, [refresh])


      return (
        <div className='card-container'>
          {allMessages?.map((message, index) => (
            <div key={index} className='message-card'>
              <h4>{message.user}:</h4>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      );
}
