import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        name: "",
        parent: false,
    }
    change = (e) => {
        let data = {...this.state}
        if (e.target.id == 'parent-radio'){
        this.setState({
            parent: true,
        })}
        else if(e.target.id == 'child-radio'){
        this.setState({
            parent: false,
        })
    }
    else{
        data[e.target.name] = e.target.value
        this.setState(data)
    }
    }
	
    render() {
        var shown = {
			display: this.state.parent ? "none" : "block" 
		};
		
        return (
            <div>
                <h1>Sign Up</h1>
                <Col sm={3} md={4} className="mx-auto">
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label sm={2}>Full Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="FullName" onChange={this.change} />
                        </Form.Group>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label sm={2}>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Username" onChange={this.change} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label sm={2}>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.change} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label sm={2}>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.change} />
                        </Form.Group>

                        <fieldset>
                            <Form.Group controlId="formBasicChecbox" onChange={this.change} >
                                <Form.Label as="legend">
                                    Are you?
                                    </Form.Label><br></br>
                                <Form.Check
                                    inline
                                    type='radio'
                                    id='child-radio'
                                    name="Radios"
                                    label='Child'
                                    defaultChecked/>
                                <Form.Check
                                    inline
                                    type='radio'
                                    id='parent-radio'
                                    name="Radios"
                                    label='Parent'
                                />
                            </Form.Group>
                        </fieldset>
                        <Form.Group controlId="formBasicPEmail" style={shown}>
                            <Form.Label sm={2}>Your Parent Email</Form.Label>
                            <Form.Control type="email" name="parentemail" placeholder="Enter Your Parent Email" onChange={this.change} />
                        </Form.Group>
                        <Button variant="primary"  color="primary" size="lg" block onClick={() => {this.props.register(this.state)}}>Sign Up</Button>
                    </Form>
                </Col>
            </div>
        )
    }
}



export default SignUp
