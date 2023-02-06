import React from "react";
import {MessageInterface} from "./d";
import {auth} from "./firebase";
import dateConverter from "./dateConverter";

export default function Message(props: { message:MessageInterface }) {
    let alignClass;
    let textAlign;

    if (props.message.sender === auth.currentUser!.uid) {
        alignClass = "self-end";
        textAlign = "text-right";
    } else {
        alignClass = "self-start";
        textAlign = "text-left";
    }

    return (
        <div className={"shadow shadow-gray-400 message border-2 border-white py-1 px-5 rounded-xl w-fit " + alignClass}>
            <p className={"text-xl " + textAlign}>{props.message.text}</p>
            <p className={"text-xs text-gray-300 " + textAlign}>{dateConverter.convertDate(props.message.createdAt.toDate())}</p>
        </div>
    )
}