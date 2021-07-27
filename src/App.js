import logo from './logo.svg';
import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Login from '../src/components/Login';
import Logout from '../src/components/Logout';
import Status from '../src/components/Status';

firebase.app(); 
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <Logout />
        <Status />
      </header>
      <section>
        {user ? <Chatroom /> : <Login />}
      </section>
    </div>
  );
}

function Chatroom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(30);
  const [formValue, setFormValue] = useState('');
  const [messages] = useCollectionData(query, {idField:'id'});
  const scroll = useRef();

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add ({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

    scroll.current.scrollIntoView({behavior:'smooth'});
  }

  return (
  <>
    <main>
      {messages && messages.map (msg => <ChatMessage key = {msg.id} message={msg}/>)}
      <div ref={scroll}></div>
    </main>
    <form onSubmit = {sendMessage}>
      <input value = {formValue} onChange={(e) => setFormValue(e.target.value)} />
      <button type = "send">
        <div className="send-text">Send</div>
      </button>
    </form>
  
  </>
  )

  function ChatMessage(props) {
    const {text, uid, photoURL} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return(
       <div className={`message ${messageClass}`}>
         <img src = {photoURL} />
         <p> {text} </p>
       </div>
    )
  }
}

export default App;
