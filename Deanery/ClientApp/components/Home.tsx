import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, User> {
    constructor(props: any) {
        super(props);
    }
    userRegister(z: any) {
        var dataFromForm;
        dataFromForm = z.target.parentElement.parentElement;
        console.log(dataFromForm);

        var request = new XMLHttpRequest();
        request.open('POST', '/api/user/register', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        var login = dataFromForm.login.value;
        var password = dataFromForm.password.value;
        var email = dataFromForm.email.value;


        dataFromForm.reset();
        request.onload = () => {
            alert(request.responseText);
        }

        request.send({ "Login": login, "Password": password, "Email": email });
    }

    public render() {
        return <div>
            <form>
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <label><b>Login</b></label>
                    <input type="text" placeholder="Enter Login" id="login" name="login" required />

                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" id="email" name="email" required />

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" id="password" name="psw" required />

                    <hr />


                    <button type="button" onClick={this.userRegister} className="btn btn-default" >Submit</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <a href="#">Sign in</a>.</p>
                </div>
            </form>
        </div>;
    }
}



interface User {
    Login: string;
    Password: number;
    email: string;
}

