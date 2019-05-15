import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

class BookCard extends Component {


    componentDidMount() {
    }

    render() {
        return (
            <div className="card">
                <Card className="card">
                    <Card.Img className="cardimg" variant="top" src={this.props.book.image} height="30px"width="20px"/>
                    <Card.Body className="card">
                        <Card.Title>{this.props.book.title}</Card.Title>
                        <Card.Text>
                            By {this.props.book.author}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="card">
                        <small className="text-muted"> {this.props.book.year}</small>
                    </Card.Footer>
                </Card>
            </div>

        )
    }
}

export default BookCard


