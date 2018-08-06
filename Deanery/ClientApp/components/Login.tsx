import * as React from 'react';
import { RouteComponentProps } from 'react-router';
const serverUri = "/api/";
import { Logout } from './Logout';
export class Login extends React.Component<RouteComponentProps<User>, { Message : string}> {
    constructor(props: any) {
        super(props);
        this.state = {
            Message : ""
        }
        this.userRegister = this.userRegister.bind(this);
    }

    userRegister(z: any) {
        z.preventDefault();
        var formData;
        formData = z.target;
        console.log(formData);

        var request = new XMLHttpRequest();
        var login = formData.login.value;
        var password = formData.password.value;


        request.open('POST', serverUri + 'user/login', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        //formData.reset();
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
            <form className="form-group" onSubmit={this.userRegister} action="#">
                <div className="container">
                    <hr />
                    {this.state.Message != "" ? <div className="alert alert-danger">
                        <strong>Warning!</strong> {this.state.Message}
                    </div> : <span/>}
                    <h1>Login</h1>
                    <hr />
                    <label><b>Login</b></label>
                    <input type="text" placeholder="login" className="form-control" id="login" name="login" required />
                    <label><b>Password</b></label>
                    <input type="password" placeholder="password" className="form-control" id="password" name="password" required />

                    <hr />
                    <button type="submit" className="btn btn-default" >Log in</button>
                </div>
            </form>
            <div className="container signin">
                <p>Dont have account?  <a href="/register">Sign up</a>.</p>
            </div>
            <Logout />
        </div>;
    }
}



interface User {
    Login: string,
    Password: string
}

