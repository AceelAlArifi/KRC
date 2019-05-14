import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'
import Alert from 'react-bootstrap/Alert'
import Dropdown from 'react-bootstrap/Dropdown'

import { getToken, setToken, logout } from './services/auth'
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';
//pages pathes 
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AllBooks from "./components/AllBooks";
import Events from "./components/Events";
import Posts from "./components/Posts";

let header = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  }
}


class App extends Component {

  state = {
    books: [],
    user: "",
    errorMsg: '',
    isAuthenticated: false,
    hasError: false,
  }
  changeHandler = (e) => {
    console.log("changing")
    let data = { ...this.state }
    data[e.target.name] = e.target.value

    this.setState(data)
    console.log(this.state)

  }
  //get the books (recent, rates or whatever)
  getAllBooks = () => {
    axios.get("http://localhost:3003/books")
      .then(data => {
        console.log("from my api", data)
        // let temp = { ...this.state } // copy
        // temp.todos = data.data.todos // set to api response
        // this.setState(temp) //set the state
      })
      .catch(err => console.log(err))
  }
  //register post request 
  registerHandler = (user_data) => {
    //  e.preventDefault()
    // console.log(e);
    console.log(user_data);
    // this.registerHandler = this.registerHandler.bind(this)
    //all register data how can we get it by sending it 
    //parentUser:{ type: Schema.Types.ObjectId, ref : 'User'},
    //kids:[{ type: Schema.Types.ObjectId, ref : 'User'}]

    axios.post('http://localhost:3003/auth/register',
      {
        email: user_data.email,
        password: user_data.password,
        parent: user_data.parent,
        name: user_data.name,
        userName: user_data.username
      })
      .then(response => {
        console.log(response.data)
        //redirect to hoome page 
      }).catch(err => console.log(err))
  }
  //login post request 
  loginHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3003/auth/login', { email: this.state.email, password: this.state.password })
      .then(response => {
        console.log(response.data)
        //redirect to hoome page 
      }).catch(err => console.log(err))
  }
  //log out handler
  //kill the session and delete token 
  logout = () => {
    logout()
    let data = { ...this.state }
    data.isAuthenticated = false
    data.user = ""
    data.email = ""
    data.password = ""
    data.games = []

    this.setState(data)
  }

  render() {
    const showLogin = (!this.state.isAuthenticated) ? SignIn : null //tag! <login or what ever/>
    return (
      <Router>
        {/* {Logout} */}

        {/* {showLogin} */}
        <Navbar bg="light" expand="lg" >
          {/* className="navbar navbar-expand navbar-dark" */}
          <Navbar.Brand href="/Home" >Book Explorers</Navbar.Brand>
          {/* className="navbar-brand fas fa-apple-alt fa-lg" */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/AllBooks">All Books</Nav.Link>
              <Nav.Link href="/Events">Events</Nav.Link>
              <Nav.Link href="/Posts">Posts</Nav.Link>
              <Nav.Link href="/SignUp">Sign Up</Nav.Link>
              <Nav.Link href="/SignIn">Sign In</Nav.Link>

              <Dropdown id="profile-menu">
                <Dropdown.Toggle id="dropdown01" data-toggle="dropdown" className="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                  Hello {this.state.user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item href="/Profile" className="dropdown-item">My Profile</Dropdown.Item>
                  <Dropdown.Item href="/Lists">My Lists</Dropdown.Item>
                  <Dropdown.Item href="/Kids">My Kids</Dropdown.Item>
                  <Nav.Link href="/Singout" className="dropdown-item">Sing out</Nav.Link>{/*destroy_user_session_path, method: :delete,  */}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="App">
          {/* <Alert color="danger" isopen={this.state.hasError} toggle={this.onDismiss} fade={false}>{this.state.errorMsg}</Alert> */}

          <Route path='/Home' component={Home} />
          <Route path='/SignUp' render={(routeProps) => (
            <SignUp {...routeProps} change={this.changeHandler} register={this.registerHandler} />
          )} />
          <Route path='/SignIn' render={(routeProps) => (
            <SignIn {...routeProps} change={this.changeHandler} login={this.loginHandler} />
          )} />
          <Route path='/AllBooks' component={AllBooks} />
          <Route path='/Events' component={Events} />
          <Route path='/Posts' component={Posts} />
        </div>
        <footer className="footer">
          <div className="container">
            <span className="text-center">© 2019 By Nora and Accel</span>
          </div>
        </footer>
      </Router>

    )
  }
}

export default App





