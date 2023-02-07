import {addDoc, collection, query} from "firebase/firestore";
import React, {useRef} from "react";
import {auth, db, storage} from "./firebase";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {BsImage} from "react-icons/all";
import { ref, uploadBytes } from "firebase/storage";

export default function Sender(props: { scrollToBottom: () => void, activeChat: string | null } ) {

    const [text, setText] = React.useState("");
    const [file, setFile] = React.useState<File | null>(null);
    const uid = auth.currentUser!.uid;
    const collectionArray = [props.activeChat, uid].sort();

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
            console.log(hiddenFileInput.current)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const send = async (e: React.FormEvent) => {
        console.log(file);
        e.preventDefault();
        const message = text
        setText("");
        let fileId = "";
        if (file) {
            fileId = Math.random().toString(36).substring(7);
            const storageRef = ref(storage, `images/${fileId}`);
            const uploadTask = await uploadBytes(storageRef, file);
            console.log(uploadTask);
        }
        await addDoc(collection(db, collectionArray.join("-")), {
            text: message,
            id: Math.random().toString(36).substring(7),
            createdAt: Timestamp.now(),
            sender: auth.currentUser!.uid,
            fileId: fileId
        });
        props.scrollToBottom();
    }

    return (
        <div className={"p-4"}>
            <form onSubmit={send} className={"flex gap-2 justify-center items-center"}>
                <input type={"text"} className={"rounded-lg px-4 py-1 w-4/5"} onChange={handleChange} value={text} />
                <input type={"file"} className={"hidden"} accept={"image/*"} ref={hiddenFileInput} onChange={handleFileChange} />
                <button type={"button"} className={"bg-white py-2 px-2 rounded-lg text-center"} onClick={handleClick}><BsImage/></button>
                <button type={"submit"} className={"bg-white py-1 px-2 rounded-lg w-1/5 text-center"}>Send</button>
            </form>
        </div>
    )
}