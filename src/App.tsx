import { useState } from 'react'
import Messages from "./Messages";
import Sender from "./Sender";
// Import the functions you need from the SDKs you need
function App() {

  return (
    <div className="App">
        <h1>Chat App</h1>
        <Messages />
        <Sender />
    </div>
  )
}

export default App
