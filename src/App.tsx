import { onAuthStateChanged } from 'firebase/auth';
import {useEffect, useRef, useState} from 'react'
import Messages from "./Messages";
import Sender from "./Sender";
import {auth} from "./firebase";
import SignIn from "./SignIn";
import { BsChatSquare } from "react-icons/all";
import UsersList from "./UsersList";
// Import the functions you need from the SDKs you need
function App() {

    const [user, setUser] = useState( auth.currentUser);
    const [activeChat, setActiveChat] = useState<string | null>(null);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setActiveChat(user!.uid)
        })
        scrollToBottom()
    }, [])

    const scrollToBottom = () => {
        divRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const activeChatSetter = (id: string) => {
        setActiveChat(id)
    }

    let content;

    if (user) {
        content = (
            <>
                <UsersList activeChat={activeChat} setActiveChat={activeChatSetter} />
                    <div className={"flex-1"}></div>
                    <Messages activeChat={activeChat} divRef={divRef}/>
                    <div className={"self-auto bg-gray-800"}>
                        <Sender scrollToBottom={scrollToBottom} activeChat={activeChat} />
                    </div>
            </>
        )
    } else {
        content = <SignIn />
    }

    return (
        <div className="App bg-gray-800 w-screen h-screen flex items-center justify-center">
            <div className={"min-w-[50%] flex flex-col h-screen"}>
                <div className={"flex gap-2 items-center justify-center text-white mb-5 fixed left-5 " +
                    "top-0 p-4 bg-gray-800 rounded-lg"}>
                    <BsChatSquare className={"text-6xl"}/>
                    <h1 className={"font-bold"}>SimpleChat</h1>
                </div>
                {content}
            </div>
        </div>
    )
}

export default App
