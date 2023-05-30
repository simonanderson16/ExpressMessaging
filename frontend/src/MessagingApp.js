import React, { useEffect, useState } from 'react'
import AllMessages from './AllMessages';
import MessagesByUser from './MessagesByUser';
import AddMessage from './AddMessage';

export default function MessagingApp() {

    const [typedUser, setTypedUser] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        // console.log("refresh changed")
    }, [refresh])
    
    const handleRefresh = () => {
        // console.log("handleRefresh")
        setRefresh(refresh+1);
    }

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h1>Messaging App</h1>
      <h4 className='byline'>By: Simon Anderson</h4>
        <div className='message-card'>
            <input type='text' placeholder='Username' onChange={e => setTypedUser(e.target.value)}></input>
            <button className="purple-button" onClick={() => setCurrentUser(typedUser)}>Log In</button>
        </div>
        <br></br>
        <br></br>
        <hr></hr>
        {currentUser &&
            <div className='container'>
            <h2>Write Message</h2>
            <AddMessage user={currentUser} refresh={refresh} handleRefresh={handleRefresh}/>
            <br></br>
            <hr></hr>
            <h2>My Messages</h2>
            <MessagesByUser user={currentUser} refresh={refresh} onRefresh={handleRefresh}/>
            <br></br>
            <hr></hr>
            <h2>All Messages</h2>
            <AllMessages refresh={refresh} handleRefresh={handleRefresh}/>
            </div>
        }
    </div>
  )
}
