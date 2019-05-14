import React, { Component } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
// import Book from "./components/Book";
// import {
//     BrowserRouter as Router,
//     Route,
//     // Link
// } from 'react-router-dom';

class AllBooks extends Component {
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

    componentDidMount() {
        this.getAllBooks() // load axios data on component mount
    }

    render() {
        return (
<div>
                <div>
                    <h1>Discover All Books</h1>
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="/Book">Book</Nav.Link> */}
                    </Nav>
                </div>
{/* 
                <div className="App">
                    <Route path='/Book' component={Book} />
                </div> */}
</div>

        )
    }
}

export default AllBooks
