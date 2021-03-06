import { initializeApp } from 'firebase/app'
// Import authentication tools
import {getAuth, 
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
        } from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'
        


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRTZE3mPHgyHJ0tt0kqHI1HrLxXdskbMU",
    authDomain: "crwn-clothing-db-67850.firebaseapp.com",
    projectId: "crwn-clothing-db-67850",
    storageBucket: "crwn-clothing-db-67850.appspot.com",
    messagingSenderId: "288636762281",
    appId: "1:288636762281:web:ed62a2b8b1f598e38f51b8"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


// Create instance from the googleauthprovider class
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// db for database, allows us to access database
export const db = getFirestore()


export const addCollectionAndDocuments = async (collectionKey, objectstoAdd) => {
        const collectionRef = collection(db, collectionKey)
        const batch = writeBatch(db)
        objectstoAdd.forEach((object) => {
            const docRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(docRef, object)
        })
        await batch.commit()

}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)

    const catergoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})
    
    return catergoryMap

}


export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    // Check if user already in db
    // In other words check if user has a document

    // First create a reference of the user that firestore understands
    const userDocRef = doc(db, 'users', userAuth.uid)
    // Create a snapshot of user document
    const userSnapshot = await getDoc(userDocRef)
    // Check if snapshot exists
    if (!userSnapshot.exists()){
        // Create the document
        const {displayName, email} = userAuth
        // Get date when user logging in
        const createdAt = new Date()
        // Try to set document
        try {
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInfo
                })
        }catch(error){
                console.log( "hola")
        }
    }   

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    
    if (!email || !password){
        return;
    }
    
    return await createUserWithEmailAndPassword(auth, email, password)

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    
    if (!email || !password){
        return;
    }
    
    return await signInWithEmailAndPassword(auth, email, password)

}

export const signOutUser = async () => {
    try {
        await signOut(auth)
    }catch (error){
        console.log(error)
    }
}


export const onAuthStateChangedListener = (callback) => {
    // This function will run the callback passed in whenever there is
    // a change in the auth state. 
    // Signing in triggers a change in auth, signing out too...
    return onAuthStateChanged(auth, callback)
}