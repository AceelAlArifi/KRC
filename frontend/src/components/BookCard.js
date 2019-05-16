import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class BookCard extends Component {


    componentDidMount() {
    }

    render() {
        return (
            // <a href="/Posts" className="roll-button button-slider">Start Discovering!</a>
            // <div onClick={this.handleClickOpen} className="roll-button button-slider">Add New Book</div>

            <div className="card">
                <Card.Title>{this.props.book.title}</Card.Title>
                <Card className="card">
                    <Card.Img className="cardimg" variant="top" src={this.props.book.image} height="70%"width="50%"/>
                    <Card.Body className="card">
                        <Card.Text>
                            By: {this.props.book.author}
                        </Card.Text>
                        <Card.Text>
                          Year of publish:{this.props.book.year}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="card">
                        <a href="/Book" className="roll-button button-slider">Discover more!</a>
                    </Card.Footer>
                </Card>
            </div>

        )
    }
}

export default BookCard


