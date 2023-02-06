import React, {useEffect} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {MessageInterface, UserInterface} from "./d";
import {auth, db} from "./firebase";

export default function UsersList(props: { activeChat: string | null, setActiveChat: (id: string) => void }) {

    const [users, setUsers] = React.useState<UserInterface[]>([]);
    const q = query(collection(db,"users"));

    useEffect(() => {
        const unsub = onSnapshot(q, (querysnapshot) => {
            setUsers(querysnapshot.docs.map((doc) => doc.data() as UserInterface))
        });
        return unsub;
    }, [])

    const handleClick = (id: string) => {
        props.setActiveChat(id);
    }

    return (
        <div className={"fixed left-40 top-1/2 bg-white -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl text-center flex flex-col gap-2"}>
            <h1>Users List</h1>
            {users.map((user) => (
                <div key={user.id} onClick={() => handleClick(user.id)} className={"cursor-pointer p-2 rounded-lg " +
                    (user.id === props.activeChat ? "bg-amber-400 hover:bg-amber-500" : "hover:bg-gray-300")}>
                    <h2>{user.email}</h2>
                </div>
                ))}
            <button className={"hover:bg-red-500 cursor-pointer p-2 rounded-lg"} onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )
}