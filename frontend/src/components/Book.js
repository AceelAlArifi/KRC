import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'
import axios from 'axios';

class Book extends Component {
    state ={
        book:''
    }
    componentDidMount() {
        this.getBookInfo()
    }
    getBookInfo = () => {
        axios.get(`http://localhost:3003/books/${this.props.match.params.id}`)
            .then(data => {
                console.log("from my api", data)
                    this.setState({
                        book: data.data.book
                    }) //set the state
            })
            .catch(err => console.log(err))
    }
    render() {
        // this.getBookInfo()
        console.log(this.props.match.params.id)
        return (
             <div>

            <div className="card" className="">
            
                <Image src={this.state.book.image} fluid></Image>
                </div>
                <h1>Book Title:  {this.state.book.title}</h1>
                <h3>By Author:   {this.state.book.author}</h3>
                <h3>Published on year: {this.state.book.year}</h3>
                <h3>Rate</h3>
                <h3>Age range: {this.state.book.ageRange}</h3>

                <div className="Reviews">
                </div>
            </div>
        )
    }
}



export default Book
