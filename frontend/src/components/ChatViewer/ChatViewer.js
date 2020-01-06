import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IconContext } from 'react-icons';
import { MdSend, MdError } from 'react-icons/md';
import moment from 'moment';

import './ChatViewer.css';

function MessageBox(props) {
    if(props.type === 'text') {
        let time;
        if(props.timestampFormat === 'calendar') {
            time = moment(props.timestamp).calendar();
        } else if(props.timestampFormat === 'fromNow') {
            time = moment(props.timestamp).fromNow();
        } else {
            time = moment(props.timestamp).format(props.timestampFormat);
        }
        return (
            <div className={`react-chat-messageBox ${props.left ? 'react-chat-messageBoxLeft' : 'react-chat-messageBoxRight'}`}>
                <img
                    alt="avater img"
                    src={props.author.avatarUrl ? props.author.avatarUrl : 'http://identicon.net/img/identicon.png'}
                    className={`react-chat-avatar ${props.left ? 'react-chat-avatarLeft' : 'react-chat-avatarRight'}`}
                />
                <div className={`react-chat-message ${props.left ? 'react-chat-messageLeft' : 'react-chat-messageRight'}`}>
                    <div className="react-chat-additional">
                        {props.author.username}
                    </div>
                    <div className={`react-chat-bubble ${props.left ? 'react-chat-leftBubble' : 'react-chat-rightBubble'} ${props.hasError ? 'react-chat-bubbleWithError' : ''}`}>
                        {props.content}
                        {props.hasError &&
                            <IconContext.Provider value={{ color: "red", className: `${props.left ? 'react-chat-errorLeft' : 'react-chat-errorRight'} react-chat-error` }}>
                                <MdError size={'1.5em'} />
                            </IconContext.Provider>
                        }
                    </div>
                    <div className="react-chat-additional">
                        { time }
                    </div>
                </div>
            </div>
        );
    } else if(props.type === 'notification') {
        return (
            <div className="my-3 text-center text-secondary react-chat-notification">
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
        <div className="react-chat-inputBox">
            <TextareaAutosize
                maxRows={3}
                className="react-chat-textarea"
                placeholder="Press shift + enter to send"
                value={inputText}
                onChange={handleOnChange}
                onKeyPress={onKeyPress}
                autoFocus
            />
        <button className="react-chat-sendButton" onClick={handleOnClick}><MdSend size={'1.5em'}/></button>
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
                timestampFormat={this.props.timestampFormat}
                hasError={message.hasError}
                type={message.type}
            />
        ));
        return (
            <div className="react-chat-container">
                <div className="react-chat-row">
                    <div className="react-chat-viewerBox">
                        <div className="react-chat-messagesList"
                            ref={(el) => this.messagesList = el}
                        >
                            <div className="react-chat-messagesListContent">
                                { messageList }
                            </div>
                        </div>
                        <InputBox onSendMessage={this.handleOnSendMessage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatViewer;
