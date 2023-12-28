import React, { Component } from "react";
import io from "socket.io-client";
import ChatSection from "./ChatSection";

const socket = io.connect("http://localhost:8000");

export class ChatAppComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      roomName: "",
    };
  }

  handleUserNameChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleRoomNameChange = (event) => {
    this.setState({
      roomName: event.target.value,
    });
  };

  joinRoom = () => {
    if (!this.state.userName || !this.state.roomName) return;

    socket.emit("join_room", { room_name: this.state.roomName });
  };

  render() {
    return (
      <>
        <h4>join A Chat</h4>
        <input
          type="text"
          placeholder="Write your name..."
          onChange={this.handleUserNameChange}
        />
        <input
          type="text"
          placeholder="Write room name..."
          onChange={this.handleRoomNameChange}
        />
        <button onClick={this.joinRoom}>Join Room</button>
        <br />
        <br />

        <ChatSection
          socket={socket}
          room={this.state.roomName}
          userName={this.state.userName}
        />
      </>
    );  
  }
}

export default ChatAppComponent;
