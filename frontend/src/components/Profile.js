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
                    var temp = { ...this.state }
                    temp.kidsArray = data.data
                    this.setState(temp)

                    // data.data.forEach(dataelement => {

                    //     this.setState(state => {
                    //         const kidsArray = state.kidsArray.push(dataelement)
                    //     })
                    // })
                })
                .catch(err => console.log(err))
        }
    }
    render() {
        var tabs;
        var tabcontent;
        if (this.state.kidsArray.length > 0) {
            tabs = this.state.kidsArray.map(kid =>
                <Nav.Item>
                    <Nav.Link eventKey={kid._id}>{kid.name}</Nav.Link>
                </Nav.Item>
            )
            tabcontent = this.state.kidsArray.map(kid =>
                <Tab.Pane eventKey={kid._id}>
                    <p>{kid.name}</p>
                </Tab.Pane>
            )

        } else {
            tabcontent = <h3>You don't have any kid signed up into the website</h3>

        }

        var show = { display: this.state.parent ? "block" : "none" }
        return (
           
            <div>
                <h1 className="welcome"> {this.state.name} Your Profile</h1>
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
                                    {tabs}
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
