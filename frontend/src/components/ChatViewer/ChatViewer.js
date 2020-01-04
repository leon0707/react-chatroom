import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TextareaAutosize from 'react-textarea-autosize';
import { IconContext } from 'react-icons';
import { MdSend, MdError } from 'react-icons/md';
import moment from 'moment';

import './ChatViewer.css';

function MessageBox(props) {
    if(props.type === 'text') {
        return (
            <div className={`MessageBox ${props.left ? "MessageBoxLeft" : "MessageBoxRight"}`}>
                <img
                    alt="avater img"
                    src={props.author.avatarUrl ? props.author.avatarUrl : 'http://identicon.net/img/identicon.png'}
                    className={props.left ? "Avatar AvatarLeft" : "Avatar AvatarRight"}
                />
                <div className={props.left ? "Message MessageLeft" : "Message MessageRight"}>
                    <div className="Additional">
                        {props.author.username}
                    </div>
                    <div className={`Bubble ${props.left ? "LeftBubble" : "RightBubble"} ${props.hasError ? "BubbleWithError" : ""}`}>
                        {props.content}
                        {props.hasError &&
                            <IconContext.Provider value={{ color: "red", className: `Error ${props.left ? "ErrorLeft" : "ErrorRight"}` }}>
                                <MdError size={'1.5em'} />
                            </IconContext.Provider>
                        }
                    </div>
                    <div className="Additional">
                        {moment(props.timestamp).calendar()}
                    </div>
                </div>
            </div>
        );
    } else if(props.type === 'notification') {
        return (
            <div className="my-3 text-center text-secondary Notification">
                {props.content}
            </div>
        );
    }
}

function InputBox(props) {
    const [inputText, setInputText] = useState('');

    const handleOnChange = (e) => {
        setInputText(e.target.value);
    }

    const handleOnClick = (e) => {
        props.onSendMessage(inputText);
        setInputText('');
    }

    const onKeyPress = (e) => {
        if(e.shiftKey && e.charCode === 13) {
            props.onSendMessage(inputText);
            setInputText('');
            e.preventDefault();
            return false;
        }
    }

    return (
        <div className="InputBox">
            <TextareaAutosize
                maxRows={3}
                className="Textare"
                placeholder="Press shift + enter to send"
                value={inputText}
                onChange={handleOnChange}
                onKeyPress={onKeyPress}
                autoFocus
            />
        <button className="SendButton" onClick={handleOnClick}><MdSend size={'1.5em'}/></button>
        </div>
    );
}

class ChatViewer extends React.Component {

    scrollToBottom = () => {
        if (this.messagesList) {
            this.messagesList.scrollTop =
                this.messagesList.scrollHeight - this.messagesList.clientHeight;
        }
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    handleOnSendMessage = (message) => {
        this.props.onSendMessage(message);
    }

    render() {
        const { messages, userId } = this.props;
        const messageList = messages.map((message, idx) => (
            <MessageBox
                key={idx}
                left={message.author && message.author.id !== userId}
                content={message.text}
                author={message.author}
                timestamp={message.timestamp}
                hasError={message.hasError}
                type={message.type}
            />
        ));
        return (
            <Container className="Viewer">
                <Row>
                    <div className="ViewerBox">
                        <div className="MessagesList"
                            ref={(el) => this.messagesList = el}
                        >
                            <div className="MessagesListContent">
                                { messageList }
                            </div>
                        </div>
                        <InputBox onSendMessage={this.handleOnSendMessage} />
                    </div>
                </Row>
            </Container>
        );
    }
}

export default ChatViewer;
