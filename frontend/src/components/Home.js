import React, { Component } from 'react';
import axios from 'axios';


class Home extends Component {
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
                <h1>Home Page</h1>

            </div>
        )
    }
}



export default Home
