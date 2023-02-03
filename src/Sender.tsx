import {addDoc, collection } from "firebase/firestore";
import React from "react";
import {db} from "./firebase";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export default function Sender() {

    const [text, setText] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const send = async (e: React.FormEvent) => {
        e.preventDefault();
        const message = text
        setText("");
        await addDoc(collection(db, "messages"), {
            text: message,
            id: Math.random().toString(36).substring(7),
            createdAt: Timestamp.now()
        });
    }

    return (
        <div>
            <form onSubmit={send}>
                <input type={"text"} onChange={handleChange} value={text} />
                <button type={"submit"}>Send</button>
            </form>
        </div>
    )
}