import React from "react";
import {MessageInterface} from "./d";

export default function Message(props: { message:MessageInterface }) {
    return (
        <div className="message">
            <p>{props.message.text}</p>
        </div>
    )
}