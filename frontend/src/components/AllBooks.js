import React, { Component } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'

// import Book from "./components/Book";
// import {
//     BrowserRouter as Router,
//     Route,
//     // Link
// } from 'react-router-dom';

class AllBooks extends Component {
    state = {
    books: []
}
    getAllBooks = () => {

        axios.get("http://localhost:3003/books")
            .then(data => {
                console.log("from my api", data)
                // let temp = { ...this.state } // copy
                // temp.todos = data.data.todos // set to api response
                this.setState({
                    books: data.books}) //set the state
            })
            .catch(err => console.log(err))
    }
    
    componentDidMount() {
        this.getAllBooks() // load axios data on component mount
    }

    displayBooks = () => {

        return this.state.books.map(book =>{
           return <li key={book._id} id={book._id}>{book.name}</li>
        }
        )
    }

    render() {
        return (
<div>
                <div>
                    <Nav className="mr-auto">
                        <h1>Discover All Books</h1>
                    </Nav>
                </div>
                <CardGroup>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Book title</Card.Title>
                            <Card.Text>
                              Book description!
      </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Published year</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Book title</Card.Title>
                            <Card.Text>
                                Book description!
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Published year</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Book title</Card.Title>
                            <Card.Text>
                            Book description!
      </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Published year</small>
                        </Card.Footer>
                    </Card>
                </CardGroup>


</div>

        )
    }
}

export default AllBooks
