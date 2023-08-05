import React, { useEffect } from 'react'
import { io } from "socket.io-client";

export default function Chat() {


  // establish socket connection
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connection made")
    })
  }, []);

    return (
        <div>
            <h1>Chat</h1>

        </div>
    )
}

