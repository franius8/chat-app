import {collection, doc, onSnapshot, query } from "firebase/firestore";
import React, {useEffect} from "react";
import { db } from "./firebase";
import {MessageInterface} from "./d";
import Message from "./Message";

export default function Messages() {

    const [messages, setMessages] = React.useState<MessageInterface[]>([]);
    const q = query(collection(db, "messages"));

    useEffect(() => {
        const unsub = onSnapshot(q, (querysnapshot) => {
            setMessages(querysnapshot.docs.map((doc) => doc.data() as MessageInterface));
        });
        return unsub;
    }, [])

    return (
        <div>
            <h1>Messages</h1>
            {messages.map((message) => (
                <Message key={message.id}  message={message} />
            ))}
        </div>
    )
}