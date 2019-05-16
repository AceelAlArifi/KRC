import React, { Component } from 'react';
import * as JWT from 'jwt-decode';
import { getToken, setToken, logout } from '../services/auth'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'

class Profile extends Component {

    state = {
        kidsArray: []
    }
    componentDidMount() {

        if (getToken()) {
            let decoded = JWT(getToken()) //decode token
            this.setState({
                id: decoded._id,
                email: decoded.email,
                kids: decoded.kids,
                name: decoded.name,
                parent: decoded.parent,
                password: decoded.password,
                userName: decoded.userName,

            })
            this.getTabs(decoded.parent, decoded._id)
        }
    }
    getTabs = (p, id) => {
        if (p) {
            axios.get(`http://localhost:3003/users/kids/${id}`)
                .then(data => {
                    console.log("from my api", data)
                    data.data.forEach(dataelement => {
                        this.setState(state => {
                            const kidsArray = state.kidsArray.push(dataelement)
                        })
                    })
                })
                .catch(err => console.log(err))
        }
    }
    render() {
        var tabs, tabcontent;
        if (this.state.kidsArray) {
            console.log("true")
            tabs = this.state.kidsArray.map(kid => {
                return  kid
                // <Nav.Item>
                //     <Nav.Link eventKey={kid._id}>{kid.name}</Nav.Link>
                // </Nav.Item>;
            })
            tabcontent = this.state.kidsArray.map(kid => {
                return <Tab.Pane eventKey={kid._id}>
                    <p>{kid.name}</p>
                </Tab.Pane>;
            })
            console.log(tabs)

        }

        var show = { display: this.state.parent ? "block" : "none" }
        console.log(this.state.kidsArray)
        return (
            <div>
                <h1>{this.state.name}  Profile {this.props.user}</h1>
                <Col className="justify-content-md-center">
                    <Col xs lg="2"> User Name:  {this.state.userName}  </Col>
                    <Col xs lg="2"> Name:  {this.state.name}    </Col>
                    <Col xs lg="2"> Email:  {this.state.email}    </Col>
                </Col>
                <br></br>
                <div className="justify-content-md-center" style={show}>
                    <h2>Kids Activites </h2>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    {this.state.kidsArray.map(kid => {
                return   <Nav.Item>
                    <Nav.Link eventKey={kid._id}>{kid.name}</Nav.Link>
                </Nav.Item>;
            })}
                                    
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    {tabcontent}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}
export default Profile
