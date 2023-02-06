import {addDoc, collection, query} from "firebase/firestore";
import React from "react";
import {auth, db} from "./firebase";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export default function Sender(props: { scrollToBottom: () => void, activeChat: string | null } ) {

    const [text, setText] = React.useState("");
    const uid = auth.currentUser!.uid;
    const collectionArray = [props.activeChat, uid].sort();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const send = async (e: React.FormEvent) => {
        e.preventDefault();
        const message = text
        setText("");
        await addDoc(collection(db, collectionArray.join("-")), {
            text: message,
            id: Math.random().toString(36).substring(7),
            createdAt: Timestamp.now(),
            sender: auth.currentUser!.uid
        });
        props.scrollToBottom();
    }

    return (
        <div className={"p-4"}>
            <form onSubmit={send} className={"flex gap-2 justify-center items-center"}>
                <input type={"text"} className={"rounded-lg px-4 py-1 w-4/5"} onChange={handleChange} value={text} />
                <button type={"submit"} className={"bg-white py-1 px-2 rounded-lg w-1/5 text-center"}>Send</button>
            </form>
        </div>
    )
}