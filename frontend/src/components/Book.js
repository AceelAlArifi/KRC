import React, { Component } from 'react';

class Book extends Component {
    render() {
        return (
            <div>
                <h1>Book Description</h1>
                <div>
                    <h1>Book: {this.props.image}</h1>
                    <p>
                        Suitable For:{this.props.ageRange}
                        Written By: {this.props.auther}
                        Posted By: {this.props.publishedBy}
                    </p>
                </div>
            </div>
        )
    }
}



export default Book
