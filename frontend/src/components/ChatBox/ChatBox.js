import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Chat } from '@progress/kendo-react-conversational-ui';

import './ChatBox.css';

class ChatBox extends React.Component {
    addNewMessage = (evt) => {
        // const chat_message = {
        //   author: this.state.bot,
        //   selectionIndex: evt.message.selectionIndex + 1,
        //   text: `${evt.message.text.length} characters`
        // };
        const { onSendMessage } = this.props;
        onSendMessage(evt.message);
        // this.setState((prevState) => {
        //     return { messages: [ ...prevState.messages, evt.message, chat_message ] };
        // });
    }

    customMessage = (props) => {
        return (
            <React.Fragment>
                {props.messageInput}
                {props.sendButton}
            </React.Fragment>
        );
    }

    render() {
        const { user, messages } = this.props;
        return (
            <Container>
                <Row>
                    <Chat
                        className="HeightControl"
                        width={400}
                        user={user}
                        messages={messages}
                        onMessageSend={this.addNewMessage}
                        placeholder={"Type a message..."}
                    />
                </Row>
            </Container>
        );
    }
}

export default ChatBox;
