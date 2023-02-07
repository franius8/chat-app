import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface MessageInterface {
    id: string;
    text: string;
    createdAt: Timestamp;
    sender: string;
    fileId: string;
}

export interface UserInterface {
    id: string;
    email: string;
}