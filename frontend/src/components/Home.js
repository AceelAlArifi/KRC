import React, { Component } from 'react';
import '../style/Home.css';


class Home extends Component {
   
    render() {
        return (
            <div className="home_div">
                <h2 className="welcome">
                Welcome To Book Explorers
               </h2>
                <a href="#" className="roll-button button-slider">Click to begin</a>
            </div>
        )
    }
}

export default Home
