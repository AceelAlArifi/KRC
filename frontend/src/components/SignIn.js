import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
//user css 
class SignIn extends Component {
    render() {
        return (
           
            <div>
                <div>
                    <img src="https://i.ibb.co/kKnZLJ2/bookexploreres.png" alt="Logo" />
                    <h1 className="welcome">Sign In</h1>
                </div>
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
                        <Button variant="light" type="submit" color="primary" size="lg" block onClick={this.props.login}  >
                            Login</Button>
     
                    </Form>
                </Col>
             
            </div>
        )
    }
}
export default SignIn
