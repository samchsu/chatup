import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const auth = firebase.auth();
function Status() {

    return auth.currentUser && (
      <div>
        <img src = {auth.currentUser.photoURL} />
      </div>
    )
}

export default Status;  