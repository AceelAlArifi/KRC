import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import * as JWT from 'jwt-decode';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
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
import Profile from "./components/Profile";
import Book from './components/Book'
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
    let data = { ...this.state }
    data[e.target.name] = e.target.value
    this.setState(data)
  }

  //get the books (recent, rates or whatever)
  getAllBooks = () => {
    axios.get("http://localhost:3003/books")
      .then(data => {
        console.log("from my api", data)
      })
      .catch(err => console.log(err))
  }

  //register post request 
  registerHandler = (user_data) => {
    console.log(user_data);
    var register_data ={
      email: user_data.email,
      password: user_data.password,
      parent: user_data.parent,
      name: user_data.name,
      userName: user_data.username,
    }
    //all register data how can we get it by sending it 
    //kids:[{ type: Schema.Types.ObjectId, ref : 'User'}]
    if(!user_data.parent){
      axios.get(`http://localhost:3003/users/${user_data.parentemail}`)
      .then(response => {
        register_data.parentUser = response.data.parent
        // axios.get(`http://localhost:3003/users/${user_data.parentemail}`)
        // .then(response => {
        //   console.log(response.data.parent._id)
        //   register_data.parentUser = response.data.parent
        // })
        console.log(register_data)
        this.submitRegister(register_data)
    })
  }
    else{
      this.submitRegister(user_data)
    }
  

  }
  submitRegister =(user_data) =>{

    axios.post('http://localhost:3003/auth/register',
    user_data)
    .then(response => {
      console.log(response.data)
      window.location = '/Home';
    }).catch(err => console.log(err))
    //401 already on data pase 
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
          //data.userData = response.data.user
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
    //data.userData = {}
    this.setState(data)
  }
//custumize drop down depend on user type
  userType = () => {
    if (this.state.isAuthenticated) {
      var dropdown 
      if(this.state.user.parent){ //get user type
       dropdown = <Dropdown.Item href="/Kids">My Kids</Dropdown.Item>
      }
      else{
        dropdown = <Dropdown.Item href="/Lists">My Lists</Dropdown.Item>

      }
      return <Dropdown id="profile-menu">
      <Dropdown.Toggle id="dropdown01" data-toggle="dropdown" className="nav-link dropdown-toggle" variant="light" aria-haspopup="true" aria-expanded="false">
        Hello {this.state.user.name}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item href="/Profile" className="dropdown-item">My Profile</Dropdown.Item>
        {dropdown}
        <Nav.Link href="/Home" onClick={this.logout} className="dropdown-item">Sing out</Nav.Link>
      </Dropdown.Menu>
    </Dropdown>
    } else {
      return <><Nav.Link href="/SignUp">Sign Up</Nav.Link>
        <Nav.Link href="/SignIn">Sign In</Nav.Link>
      </>
    }
  }
  openBook = (id) => {
    console.log("bookk")
    return <Book  />

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
      console.log(decoded)
      let data = {...this.state}
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
          <div className="logo">
          <Navbar.Brand  href="/Home"><img src="https://i.ibb.co/BVMhP4J/logo1.png"  height= "70px"/> Book Explorers
          </Navbar.Brand>
          </div>
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
          <Route path='/Home' component={Home} />
          <Route path='/SignUp' render={() => (
            <SignUp change={this.changeHandler} register={this.registerHandler} />
          )} />
          <Route path='/SignIn' render={() => (
            <SignIn change={this.changeHandler} login={this.loginHandler} />
          )} />
          <Route path='/AllBooks' render={(props) => (
            <AllBooks {...props} openBook={this.openBook}/>
          )}/>
          <Route path='/Events' component={Events} />
          <Route path='/Posts' component={Posts} />
          <Route path='/Profile'  render={(props) => (
            <Profile {...props} user={this.state.user.name}/>
          )} /> 
            <Route path='/Book/:id'  render={(props) => (
            <Book {...props} openBook={this.openBook}/>
          )} /> 
        </div>
        <footer className="footer-copyright text-left py-3">
          <div className="container">
            <span className="text-center">© 2019 By Nora and Aceel</span>
          </div>
        </footer>
      </Router>
    )
  }
}

export default App;