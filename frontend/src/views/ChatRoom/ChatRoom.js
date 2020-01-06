import React from 'react';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';

import ChatViewer from '../../components/ChatViewer';
import { initWebsocket, sendMessage } from '../../redux/chat/actions';

class ChatRoom extends React.Component {

    componentDidMount() {
      this.props.initWebsocket();
    }

    handleOnSendMessage = (message) => {
        this.props.sendMessage({
            author: this.props.user_info,
            text: message,
            timestamp: +new Date(),
            roomId: 0,
            type: 'text'
        });
    }

    render() {
        return (
            <Container>
                <ChatViewer
                    messages={this.props.messages}
                    userId={this.props.user_info.id}
                    onSendMessage={this.handleOnSendMessage}
                    timestampFormat={'MMMM Do YYYY, h:mm a'}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.chat.messages,
        user_info: state.auth.user_info
    }
}

const mapDispatchToProps = dispatch => {
  return {
    initWebsocket: () => {
      dispatch(initWebsocket())
    },
    sendMessage: (message) => {
      dispatch(sendMessage(message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
