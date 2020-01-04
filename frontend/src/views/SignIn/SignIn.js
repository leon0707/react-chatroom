import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { signIn } from '../../redux/auth/actions';

import './SignIn.css';

class SignIn extends React.Component {
  state = {
      username: '',
      password: ''
  };

  handleOnChange = (evt) => {
      const { id, value } = evt.target;
      this.setState({
          [id]: value
      });
  }

  handleSubmit = (evt) => {
      evt.preventDefault();

      const { username, password } = this.state;
      const { from } = this.props;
      this.props.signIn(username, password, from);
  }

  render() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={this.handleOnChange}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" onChange={this.handleOnChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                    <Row className="my-2 justify-content-md-between">
                        <Link to="/forgotpass">Forgot password</Link>
                        <Link to="/signup">Sign up</Link>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
  }
}

const actions = {
  signIn: signIn
}

export default connect(null, actions)(SignIn);
