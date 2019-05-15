import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SweetAlert from 'sweetalert-react';

function validateLength(element) {
    // true means invalid, so our conditions got reversed
    return element.length > 3;
}
function CheckPassword(password) {
    var passw = /^[A-Za-z]\w{7,15}$/;
    if (password.match(passw)) {
        return true;
    }
    else {
        document.getElementById("error").innerHTML= '<p>PassWord have to be 7 charecters with capital and small case</p>';
        return false;
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())){
        return true;
    }
    else{
        document.getElementById("error").innerHTML= '<p>Email format not correct</p>';
        return false;
    }
}

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        name: "",
        parent: false,
        open:false
    }
    submit = () => {        

        if (validateEmail(this.state.email)&& CheckPassword(this.state.password) && validateLength(this.state.username)&& validateLength(this.state.name) ){
        if(!this.state.parent){
            if (validateEmail(this.state.parentemail)){
                this.props.register(this.state)
                this.setState({
                    open:true
                })
            }else{
                document.getElementById("error").innerHTML= '<p>Enter Your Parent Email</p>';
            }
        }else{
            this.props.register(this.state)
            this.setState({
                open:true
            })
        }
    }
    else{
        document.getElementById("error").innerHTML=  document.getElementById("error").innerHTML+ '<p>Fill the form </p>';
    }}
    change = (e) => {
        let data = { ...this.state }
        if (e.target.id == 'parent-radio') {
            this.setState({
                parent: true,
            })
        }
        else if (e.target.id == 'child-radio') {
            this.setState({
                parent: false,
            })
        }
        else {
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
                    <div id="error"></div>
                    <Dialog
                    id = "done"
                    open={this.state.open}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> Registered </DialogTitle>
                        <DialogContentText>
                        You are Now Registered Go Home and SignIn to the  website
                        </DialogContentText>
                    <DialogActions>
                        <Button onClick={() =>{ window.location = '/Home'}} color="primary">
                            Go to home Page
            </Button>
                    </DialogActions>
                </Dialog>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label sm={2}>Full Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="FullName" onChange={this.change} required />
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
                                    defaultChecked />
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
                        <Button variant="primary" color="primary" size="lg" block onClick={this.submit}>Sign Up</Button>
                    </Form>
                </Col>


            </div>
        )
    }
}



export default SignUp
