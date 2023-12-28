import React, { Component } from "react";

export class ChatSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMessage: "",
      messageList: [],
    };
  }

  sendMessage = async () => {
    if (!this.state.currentMessage) return;

    const sendMessage = {
      room: this.props.room,
      author: this.props.userName,
      messageData: this.state.currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    console.log("Message", this.state.currentMessage);
    console.log("MessageData", sendMessage);

    this.setState({
      messageList: [...this.state.messageList, sendMessage],
    });
    await this.props.socket.emit("send_message", sendMessage);

    this.setState({
      currentMessage: "",
    });
  };

  componentDidMount() {
    this.props.socket.on("receive_message", (receivedMessage) => {
      console.log("receivedMessage", receivedMessage);

      this.setState({
        messageList: [...this.state.messageList, receivedMessage],
      });
    });
  }

  render() {
    console.log("props", this.props);
    return (
      <>
        <div className="chat-header">Live Chat</div>
        <div className="chat-container">
          {this.state.messageList?.map((messageContent) => (
            <div>{messageContent?.messageData}</div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            onChange={(event) =>
              this.setState({
                currentMessage: event.target.value,
              })
            }
          />
          <button onClick={this.sendMessage}>&#9658;</button>
        </div>
      </>
    );
  }
}

export default ChatSection;
