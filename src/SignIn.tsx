import React from "react";
import {auth, db} from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat";
import OAuthCredential = firebase.auth.OAuthCredential;
import {addDoc, collection} from "firebase/firestore";

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
                const docRef = await addDoc(collection(db, "users"), {
                    id: user!.uid,
                    email: user!.email,
                });
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
            <button onClick={onClick}>Sign In</button>
        </div>
    )
}