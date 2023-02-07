import React from "react";
import { auth, db } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat";
import OAuthCredential = firebase.auth.OAuthCredential;
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { FaGoogle } from "react-icons/all";

export default function SignIn() {

    const provider = new GoogleAuthProvider();

    const onClick= () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                const userDocRef = doc(db, "users", user!.uid);
                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists()) {
                    const docRef = await setDoc(doc(db, "users", user!.uid), {
                        id: user!.uid,
                        email: user!.email,
                    });
                }
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log(errorCode, errorMessage, email, credential);
            // ...
        });
    }


    return (
        <div>
            <button className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg text-2xl " +
                "hover:bg-gray-300 flex items-center"}
                    onClick={onClick}>Sign in with <FaGoogle className={"inline-block ml-2 mr-0.5"}/>oogle</button>
        </div>
    )
}