import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const auth = firebase.auth();

function Logout() 
{
    return auth.currentUser && (
      <button onClick = {() => auth.signOut()}>Log Out</button>
    )
}

export default Logout;