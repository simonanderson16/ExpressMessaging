import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditableMessage from './EditableMessage';

export default function MessagesByUser({ user, refresh, onRefresh }) {
  const [allMessages, setAllMessages] = useState();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:9000/messages/user/${user}`)
        .then((res) => res.json())
        .then((res) => setAllMessages(res.result))
        .catch((err) => console.log(err));
    }
  }, [user, refresh]);

  return (
    <>
    <div className='card-container'>
      {allMessages?.map((message, index) => (
        <div key={index}>
          <EditableMessage message={message} onRefresh={onRefresh} />
        </div>
      ))}
    </div>
    {allMessages?.length == 0 && <p className='no-messages'>You have not written any messages</p>}
    </>
  );
}
