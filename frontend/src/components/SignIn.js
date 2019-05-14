import React, { Component } from 'react';
// import Profile from "./components/Profile";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'

// import {
//     BrowserRouter as Router,
//     Route,
//     // Link
// } from 'react-router-dom';

class SignIn extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleMouseMove = this.handleMouseMove.bind(this);
    //     this.state = { x: 0, y: 0 };
    //   }

    render() {
        return (

            <div>
                <h1>Sign in</h1>
                <Col sm={3} md={4} className="mx-auto">


                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label sm={2}>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.props.change} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label sm={2}>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.props.change} />
                        </Form.Group>
                        <Button variant="primary" type="submit" color="primary" size="lg" block onClick={this.props.login}  >
                            Login
  </Button>{/* */}
                    </Form>
                </Col>
            </div>
        )
    }
}

export default SignIn
