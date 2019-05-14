import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import * as JWT from 'jwt-decode';

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
    userData: {}
  }
  changeHandler = (e) => {
    let data = { ...this.state }
    data[e.target.name] = e.target.value
    this.setState(data)
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
        if (response.data.token) {
          setToken(response.data.token)
          let data = { ...this.state }
          data.user = response.data.user
          data.isAuthenticated = true
          data.hasError = false
          data.userData = response.data.user
          this.setState(data)
          //redirect to home page
          window.location = '/Home';
        }

        //redirect to hoome page 
      }).catch(err => {
        console.log(err)
        let data = { ...this.state }
        data.hasError = true
        this.setState(data)
      })
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
    data.books = []
    data.userData = {}
    this.setState(data)
  }

  userType = () => {
    if (this.state.isAuthenticated) {
      // if(){ //get user type
      return <Dropdown id="profile-menu">
        <Dropdown.Toggle id="dropdown01" data-toggle="dropdown" className="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
          Hello {this.state.userData.name}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item href="/Profile" className="dropdown-item">My Profile</Dropdown.Item>
          <Dropdown.Item href="/Lists">My Lists</Dropdown.Item>
          <Dropdown.Item href="/Kids">My Kids</Dropdown.Item>
          <Nav.Link href="/Home" onClick={this.logout} className="dropdown-item">Sing out</Nav.Link>
        </Dropdown.Menu>
      </Dropdown>
      // }
    } else {
      return <><Nav.Link href="/SignUp">Sign Up</Nav.Link>
        <Nav.Link href="/SignIn">Sign In</Nav.Link>
      </>
    }



  }
  componentDidMount() {
    /*
      To stay logged in every time the App.js is rendered
      Check if there is a token and if there is decode it and
      set the data to state.
      */
    if (getToken()) {
      //remember the token consists of 3 parts
      //1. HEADER:ALGORITHM & TOKEN TYPE
      //2. PAYLOAD:DATA
      //3. SIGNATURE
      let decoded = JWT(getToken()) //decode token
      console.log(this.state)
      let data = { ...this.state }
      data.user = decoded
      data.isAuthenticated = true
      this.setState(data)
      console.log(this.state)

    }
  }

  render() {
    const showLogin = this.userType()
    return (
      <Router>
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
              {showLogin}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="App">
          {/* <Alert color="danger" isopen={this.state.hasError} toggle={this.onDismiss} fade={false}>{this.state.errorMsg}</Alert> */}

          <Route path='/Home' component={Home} />
          <Route path='/SignUp' render={() => (
            <SignUp change={this.changeHandler} register={this.registerHandler} />
          )} />
          <Route path='/SignIn' render={() => (
            <SignIn change={this.changeHandler} login={this.loginHandler} />
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





