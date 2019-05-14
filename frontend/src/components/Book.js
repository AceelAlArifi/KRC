import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'

class Book extends Component {
    render() {
        return (
            <div>
                <Image src="holder.js/100px250" fluid />
                <h1>Book title</h1>
                <h3>By auther</h3>
                <h3>Published on year</h3>
                <h3>Rate</h3>
                <h3>Age range</h3>

                <div className="Reviews">

                </div>
            </div>
        )
    }
}



export default Book
