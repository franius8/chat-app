import {collection, doc, onSnapshot, query } from "firebase/firestore";
import React, {useEffect} from "react";
import {auth, db} from "./firebase";
import {MessageInterface} from "./d";
import Message from "./Message";

export default function Messages(props: { activeChat: string | null, divRef: React.RefObject<HTMLDivElement> }) {

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

    let messageComponent;

    if (messages.length === 0) {
        messageComponent = <div className={"flex justify-center items-center"}>
            <h1 className={"text-2xl text-gray-300"}>No Messages</h1>
        </div>
    } else {
        messageComponent = messages.map((message) => (
            <Message key={message.id}  message={message} />
        ))
    }

    return (
        <div className={"m-2 text-white flex gap-4 flex-col overflow-auto max-h-full px-4"}>
            {messageComponent}
            <div ref={props.divRef}></div>
        </div>
    )
}