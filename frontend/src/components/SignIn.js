import React, { Component } from 'react';
// import Profile from "./components/Profile";
import Nav from 'react-bootstrap/Nav';
// import {
//     BrowserRouter as Router,
//     Route,
//     // Link
// } from 'react-router-dom';

class SignIn extends Component {
    render() {
        return (

                <div>
                    <h1>Sign in</h1>
                    <Nav className="mr-auto">
                        <Nav.Link href="/Profile">Profile</Nav.Link>
                    </Nav>
{/* 
                    <div className="App">
                        <Route path='/Profile' component={Profile} />
                    </div> */}
                </div>
        )
    }
}

export default SignIn
