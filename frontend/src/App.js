import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import LandingPage from './views/LandingPage';
import ChatRoom from './views/ChatRoom';
import Alert from './components/Alert';
import { clear } from './redux/alert/actions';
import { signOut } from './redux/auth/actions';

function App(props) {
    return (
      <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {/*<Nav.Link as={Link} to="/stat">Stat</Nav.Link>
                  <Nav.Link as={Link} to="/train">Train</Nav.Link>*/}
                </Nav>
                <Nav>
                    {props.auth_token ?
                        <Nav.Link onClick={() => props.signOut()}>Sign out</Nav.Link>
                        :
                        <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
                    }
                </Nav>
              </Navbar.Collapse>
        </Navbar>
        <Container>
            <Row>
              <Alert type={props.type} message={props.message} onClose={props.onCloseAlert}/>
            </Row>
        </Container>
        <Switch>
            <Route exact path={'/'} render={() => {
                    return (
                        props.auth_token !== null ?
                            (<Redirect to='/chat' />)
                            :
                            (<LandingPage />)
                        );
                }
            } />
            <Route path={'/signin'} component={LandingPage} />
            <ProtectedRoute path={'/chat'} component={ChatRoom} is_auth={props.auth_token ? true:false}/>
            <Route exact path={'/404'} >
                <h1>404</h1>
            </Route>
            <Redirect from='*' to='/404' />
        </Switch>
      </>
    );
}

function ProtectedRoute(props) {
  const { component, is_auth, ...rest } = props;
  const Component = component;
  return (
    <Route
      {...rest}
      render={({ location }) => (
          is_auth ? (<Component />) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
            />
          )
        )
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    type: state.alert.type,
    message: state.alert.message,
    auth_token: state.auth.auth_token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseAlert: () => {
      dispatch(clear())
    },
    signOut: () => {
      dispatch(signOut());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
