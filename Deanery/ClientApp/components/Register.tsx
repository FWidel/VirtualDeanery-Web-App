import * as React from 'react';
import { RouteComponentProps } from 'react-router';
var ReCAPTCHA = require("react-google-recaptcha");
const serverUri = "/api/";

declare function require(name: string): any;
var Crypto = require('crypto-js')


export class Register extends React.Component<RouteComponentProps<{}>, User> {
    constructor(props: any) {
        super(props);
    }
    userRegister(z: any) {
        z.preventDefault();
        var formData = z.target;

        console.log(formData);
        //var v = grecaptcha.getResponse();

        var request = new XMLHttpRequest();
        var firstname = formData.firstname.value;
        var surname = formData.surname.value;
        var lastname = formData.lastname.value;
        var password = formData.password.value;
        var email = formData.email.value;
        var phone = formData.phone.value;
        var pesel = formData.pesel.value;
        var login = formData.login.value;
        var captcha = formData.myCaptchaResponse.getAttribute("value");

        //SHA256 hash
        password = Crypto.SHA256(password).toString()


        request.open('POST', serverUri + 'user/register?captcha=' + captcha, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');


        request.onload = () => {
            alert(request.responseText);
            if (request.responseText == "Successfully registered") {
                window.location.replace("/login");
            }
        }

        request.send(JSON.stringify({
            "Firstname": firstname,
            "Password": password,
            "Email": email,
            "Phone": phone,
            "Lastname": lastname,
            "Surname": surname,
            "Pesel": pesel,
            "Login": login

        }));
    }





    public render() {
        return <div>
            <form id="registerForm" className="form-group" onSubmit={this.userRegister} action="#">
                <div className="container login-form">
                    <h3 className="text-center">Register</h3>
                    <p className="text-center">Please fill in this form to create an account.</p>
                    <hr />
                    <input type="text" placeholder="Enter name" className="form-control" id="firstname" name="firstname" required />
                    <input type="text" placeholder="Enter lastname" className="form-control" id="lastname" name="lastname" required />
                    <input type="text" placeholder="Enter surname" className="form-control" id="surname" name="surname" required />
                    <input type="email" placeholder="Enter email" className="form-control" id="email" name="email" required />
                    <input type="number" placeholder="Enter PESEL" className="form-control" id="pesel" name="pesel" required />
                    <input type="text" placeholder="Enter phone number" className="form-control" id="phone" name="phone" required />
                    <input type="text" placeholder="Enter login" className="form-control" id="login" name="login" required />
                    <input type="password" placeholder="Enter password" className="form-control" id="password" name="psw" required />
                    <div id="myCaptcha"></div>
                    <input type="text" id="myCaptchaResponse" name="myCaptchaResponse" />
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>
            </form>
            <div className="container signin">
                <a href="/login">Already have an account? Sign in</a>
            </div>
        </div>;
    }
}



interface User {
    Login: string;
    Password: number;
    email: string;
}

