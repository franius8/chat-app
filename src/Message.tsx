import React, {useEffect} from "react";
import { MessageInterface } from "./d";
import { auth, storage } from "./firebase";
import dateConverter from "./dateConverter";
import { getDownloadURL, ref } from "firebase/storage";

export default function Message(props: { message:MessageInterface }) {
    let alignClass: string;
    let textAlign: string;

    const [fileUrl, setFileUrl] = React.useState<string>("");

    if (props.message.sender === auth.currentUser!.uid) {
        alignClass = "self-end";
        textAlign = "text-right";
    } else {
        alignClass = "self-start";
        textAlign = "text-left";
    }

    useEffect(() => {
        if (props.message.fileId) {
            getDownloadURL(ref(storage, 'images/' + props.message.fileId)).then((url) => {
                setFileUrl(url);
            })
        }
    }, [props.message.fileId])

    if (props.message.fileId) {
        return (
            <div className={"shadow shadow-gray-400 message border-2 border-white py-1 px-5 rounded-xl w-fit " + alignClass}>
                <img src={fileUrl} alt={""} className={"rounded-lg m-2 max-w-xl"}/>
                <p className={"text-xs text-gray-300 " + textAlign}>{dateConverter.convertDate(props.message.createdAt.toDate())}</p>
            </div>
        )
    } else {
        return (
            <div className={"shadow shadow-gray-400 message border-2 border-white py-1 px-5 rounded-xl w-fit " + alignClass}>
                <p className={"text-xl " + textAlign}>{props.message.text}</p>
                <p className={"text-xs text-gray-300 " + textAlign}>{dateConverter.convertDate(props.message.createdAt.toDate())}</p>
            </div>
        )
    }
}