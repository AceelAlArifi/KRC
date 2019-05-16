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
<div className="container">
                <Card className="card">
                    <Card.Title>Wow in the World</Card.Title>
                    <Card.Body className="card">
                        <Card.Text>
                           Hosts Mindy Thomas and Guy Raz guide curious kids and their grown-ups on a journey into the wonders of the world around them. 
                           We'll go inside our brains, out into space and deep into the coolest new stories in science and technology.
                        </Card.Text>
                        <Card.Text>
                            From NPR
                        </Card.Text>
                        <a   href="#" className="roll-button button-slider">Discover more!</a>
                    </Card.Body>
                </Card>
                </div>
            </div>
        )
    }
}



export default Posts
