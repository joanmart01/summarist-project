// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, 
         setDoc, doc, deleteDoc, getDoc, getDocs } from "firebase/firestore";
import { getStripePayments } from "@invertase/firestore-stripe-payments";
import { deleteUser, getAuth,
         createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
         signOut} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC5QZ6xwyipWqwnX7YLHVDV5PpuduUaVY",
  authDomain: "summarist-firebase.firebaseapp.com",
  projectId: "summarist-firebase",
  storageBucket: "summarist-firebase.firebasestorage.app",
  messagingSenderId: "1080573503901",
  appId: "1:1080573503901:web:999c99c8c1e920839a2774"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const usersDb = collection(db, "users");

export const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

async function getCustomClaimRole(user) {
  console.log("getting Role");
  await user.getIdToken(true);
  const decodedToken = await user.getIdTokenResult();
  return decodedToken?.claims.stripeRole;
}

export async function signup(email, password) {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      subscription: "basic",
      userLevel: 1
    })
    await signOut(auth);
  } catch(error) {
    throw error;
  }
}

export async function loginWithEmail(email, password){
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function loginWithGoogle() {
    /*try {
      //const auth = getAuth();
      console.log(auth);
      const provider = new GoogleAuthProvider();
      console.log(provider);
      //const result =  await signInWithPopup(auth, provider);
      signInWithPopup(auth, provider).then((result) => {
        console.log(result);
        const user = result.user;
        setAuthenticatedUser(user, setUser);
        return "";
      }) */      
      /*const customerRole = await getCustomClaimRole(user);
      const status = customerRole ?? "basic";
      setUser({
        email: user.email,
        subscription: status
      })*/
      
  /*  } catch(error) {
      return error.code + ": " + error.message;
    }*/

    //const auth = getAuth();
  /*const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    throw error;
  });*/

}

export async function addToFinishedLibrary(userId, book) {
  const collectionRef = collection(db, "users", userId, "finished_books");
  const docRef = doc(collectionRef, book.id);
  await setDoc(docRef, {...book});
}

export async function getUserLibraryBooks(libraryRef) {
  const array = [];
  if(libraryRef===undefined || libraryRef===null || libraryRef.length === 0) return array;
  getDocs(libraryRef).then(querySnapshot => {
      querySnapshot.forEach(doc => array.push(doc.data()));
      return array;
  })
}

//deletes user from firebase and firestore, and cancels subscription
export async function deleteCurrentUserAccount() {
  const user = auth.currentUser;
  try {
    await deleteDoc(doc(db, "users", user.uid));
    await deleteUser(user);
  } catch(error) {
    return error.message
  }
}