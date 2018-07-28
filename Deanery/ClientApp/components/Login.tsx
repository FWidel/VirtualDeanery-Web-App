﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
const serverUri = "/api/";

export class Login extends React.Component<RouteComponentProps<{}>, User> {
    constructor(props: any) {
        super(props);
    }
    userRegister(z: any) {
        var formData;
        formData = z.target.parentElement.parentElement;
        //console.log(formData);

        var request = new XMLHttpRequest();
        var login = formData.login.value;
        var password = formData.password.value;
    

        request.open('POST', serverUri + 'user/login', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        formData.reset();

        request.onload = () => {
            alert(request.responseText);
        }

        request.send(JSON.stringify({
            "Password": password,
            "Login" : login
        }));
    }

    public render() {
        return <div>
            <form className="form-group">
                <div className="container">
                    <h1>Login</h1>
                    <hr />
                    <label><b>Login</b></label>
                    <input type="text" placeholder="login" className="form-control" id="login" name="login" required />
                    <label><b>Password</b></label>
                    <input type="password" placeholder="password" className="form-control" id="password" name="password" required />
             
                    <hr />
                    <button type="button" onClick={this.userRegister} className="btn btn-default" >Log in</button>
                </div>

                <div className="container signin">
                    <p>Dont have account?  <a href="/register">Sign up</a>.</p>
                </div>
            </form>
        </div>;
    }
}



interface User {
    Login: string,
    Password: string
}
