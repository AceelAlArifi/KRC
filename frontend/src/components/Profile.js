import React, { Component } from 'react';
import * as JWT from 'jwt-decode';
import { getToken, setToken, logout } from '../services/auth'

class Profile extends Component {

  state = {
    user: '',
}
    componentDidMount() {
        console.log(this.props)
        if (getToken()) {
            //remember the token consists of 3 parts
            //1. HEADER:ALGORITHM & TOKEN TYPE
            //2. PAYLOAD:DATA
            //3. SIGNATURE
            let decoded = JWT(getToken()) //decode token
            let data = { ...this.state }
            data.user = decoded
            this.setState(data)
            console.log(this.state)

          }
          console.log(this.state)
        }
    render() {
        return (
            <div>
                <h1>Your Profile</h1>

            </div>
        )
    }
}



export default Profile
