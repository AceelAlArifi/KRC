import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

class BookCard extends Component {


    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Img variant="top" src={this.props.book.image} />
                    <Card.Body>
                        <Card.Title>{this.props.book.title}</Card.Title>
                        <Card.Text>
                            By {this.props.book.author}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted"> {this.props.book.year}</small>
                    </Card.Footer>
                </Card>
            </div>

        )
    }
}

export default BookCard


