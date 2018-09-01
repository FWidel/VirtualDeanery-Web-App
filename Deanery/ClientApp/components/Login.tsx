﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
const serverUri = "/api/";
import { Logout } from './Logout';
declare function require(name: string) : any;
var Crypto = require('crypto-js')
export class Login extends React.Component<RouteComponentProps<{}>, LoginStates>{
    constructor(props: any) {
        super(props);
        this.state = {
            Message: ""
        }
        this.userLogin = this.userLogin.bind(this);
    }

    userLogin(z: any) {
        z.preventDefault();

        var formData = z.target;
        var request = new XMLHttpRequest();
        var login = formData.login.value;
        var password = formData.password.value;

        password = Crypto.SHA256(password).toString()


        request.open('POST', serverUri + 'user/login', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.onload = () => {
            if (request.responseText != "Invalid Login or Password") {
                window.location.replace("/index");
            }
            else {
                this.setState({
                    Message: request.responseText
                })
            }
        }

        request.send(JSON.stringify({
            "Password": password,
            "Login": login
        }));
        return false;
    }



    public render() {
        return <div>
            <form className="form-group" onSubmit={this.userLogin}>
                <div className="container login-form">
                    {this.state.Message != "" ? <div className="alert alert-danger">
                        <strong>Warning!</strong> {this.state.Message}
                    </div> : <span />}

                    <h3 className="text-center">Welcome</h3>
                    <p className="text-center">Please enter your login and password</p>
                    <input type="text" placeholder="Login" className="form-control"
                        id="login" name="login" autoComplete="true" required />
                    <input type="password" placeholder="Password" className="form-control"
                        id="password" name="password" autoComplete="true" required />
                    <button type="submit" className="btn btn-primary" >Log in</button>
                </div>
            </form>
            <div className="container signin">
                <a href="/register">Register</a> <a href="/recover">Forgot Password</a>
            </div>
        </div>;
    }
}


interface LoginStates {
    Message: string
}

