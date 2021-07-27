import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

if( firebase.apps.length === 0 ){
    firebase.initializeApp({
        apiKey: "AIzaSyDJR5lrX9CViBpGpxjPmLDZcSKRbEOgOck",
          authDomain: "chatup-a6a48.firebaseapp.com",
          projectId: "chatup-a6a48",
          storageBucket: "chatup-a6a48.appspot.com",
          messagingSenderId: "279881348170",
          appId: "1:279881348170:web:4c868cb9a89e60c741e2b3",
          measurementId: "G-RLEBV37EJQ"
    })
}

const auth = firebase.auth();

function Login() {
    const signInGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider); 
    }
  
    return (
        <>
        <div className="title"> 
        <header-title>
            Chatup🚀
        </header-title>
        <br></br>
        <subtitle>Chat with anyone across the world</subtitle>
        </div>

        <signin>
            <button onClick={signInGoogle}>Sign in with Google Account</button>
        </signin>
      </>
    )
}
export default Login;