import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

class Posts extends Component {
    render() {
        return (
           
            <div>
                <div>
                    <img src="https://i.ibb.co/kKnZLJ2/bookexploreres.png" alt="Logo" />
                </div>
                <div>
                    <h1 className="welcome">Discover new intresting stuff</h1>
                </div>

                <Card className="card">
                <Card.Title>{this.props.book.title}</Card.Title>
                    <Card.Body className="card">
                        <Card.Text>
                            By: {this.props.book.author}
                        </Card.Text>
                        <Card.Text>
                            Year of publish:{this.props.book.year}
                        </Card.Text>
                        <a   href= {`/Book/${this.props.book._id}`}  className="roll-button button-slider">Discover more!</a>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}



export default Posts
