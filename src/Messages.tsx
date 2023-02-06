import {collection, doc, onSnapshot, query } from "firebase/firestore";
import React, {useEffect} from "react";
import {auth, db} from "./firebase";
import {MessageInterface} from "./d";
import Message from "./Message";

export default function Messages(props: { activeChat: string | null }) {

    const [messages, setMessages] = React.useState<MessageInterface[]>([]);


    useEffect(() => {
        const uid = auth.currentUser!.uid;
        const collectionArray = [props.activeChat, uid].sort();
        const q = query(collection(db, collectionArray.join("-")));
        const unsub = onSnapshot(q, (querysnapshot) => {
            setMessages(querysnapshot.docs.map((doc) => doc.data() as MessageInterface)
                .sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()));
        });
        return unsub;
    }, [props.activeChat])

    return (
        <div className={"m-2 text-white flex gap-4 flex-col justify-end overflow-auto flex-1 max-h-full px-4"}>
            {messages.map((message) => (
                <Message key={message.id}  message={message} />
            ))}
        </div>
    )
}