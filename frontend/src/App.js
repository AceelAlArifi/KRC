import React, { Component } from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'

import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AllBooks from "./components/AllBooks";
import Events from "./components/Events";
import Posts from "./components/Posts";



class App extends Component {
  render() {
    return (

      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/Home">Book Explorers</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/SignUp">Sign Up</Nav.Link>
              <Nav.Link href="/SignIn">Sign In</Nav.Link>
              <Nav.Link href="/AllBooks">All Books</Nav.Link>
              <Nav.Link href="/Events">Events</Nav.Link>
              <Nav.Link href="/Posts">Posts</Nav.Link>
            </Nav>

            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <div className="App">
          <Route exact path='/Home' component={Home} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/SignIn' component={SignIn} />
          <Route path='/AllBooks' component={AllBooks} />
          <Route path='/Events' component={Events} />
          <Route path='/Posts' component={Posts} />
        </div>

      </Router>
    )
  }
}

export default App





