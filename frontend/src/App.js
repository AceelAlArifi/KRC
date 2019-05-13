import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import AllBooks from "./components/AllBooks";
import Book from "./components/Book";
import Events from "./components/Events";
import Posts from "./components/Posts";



class App extends Component {
  render() {
    return (
    
      <Router>
        <nav>
          <Link to="/Home">Home</Link>
          <Link to="/SignUp">SignUp</Link>
          <Link to="/SignIn">SignIn</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/AllBooks">AllBooks</Link>
          <Link to="/Book">Book</Link>
          <Link to="/Events">Events</Link>
          <Link to="/Posts">Posts</Link>
        </nav>
        <div className="App">
          <Route exact path='/Home' component={Home} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/SignIn' component={SignIn} />
          <Route path='/Profile' component={Profile} />
          <Route path='/AllBooks' component={AllBooks} />
          <Route path='/Book' component={Book} />
          <Route path='/Events' component={Events} />
          <Route path='/Posts' component={Posts} />
        </div>
   
      </Router>
    )
  }
}

export default App





