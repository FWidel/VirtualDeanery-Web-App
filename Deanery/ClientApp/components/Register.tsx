import * as React from 'react';
import { RouteComponentProps } from 'react-router';
const serverUri  = "/api/";
export class Register extends React.Component<RouteComponentProps<{}>, User> {
    constructor(props: any) {
        super(props);
    }
    userRegister(z: any) {
        z.preventDefault();
        var formData;
        formData = z.target;

        var request = new XMLHttpRequest();
        var firstname = formData.firstname.value;
        var surname = formData.surname.value;
        var lastname = formData.lastname.value;
        var password = formData.password.value;
        var email = formData.email.value;
        var phone = formData.phone.value;
        var pesel = formData.pesel.value;
        var login = formData.login.value;

        request.open('POST', serverUri +'user/register', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      

        request.onload = () => {
            alert(request.responseText);
            if (request.responseText == "Successfully registered")
            {
                document.getElementById("registerForm").reset();
                
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
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <label><b>Firstname</b></label>
                    <input type="text" placeholder="Enter name" className="form-control" id="firstname" name="firstname" required />
                    <label><b>Lastname</b></label>
                    <input type="text" placeholder="Enter lastname" className="form-control" id="lastname" name="lastname" required />
                    <label><b>Surname</b></label>
                    <input type="text" placeholder="Enter surname" className="form-control"id="surname" name="surname" required />
                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter email" className="form-control" id="email" name="email" required />
                    <label><b>PESEL</b></label>
                    <input type="number" placeholder="Enter PESEL" className="form-control" id="pesel" name="pesel" required />
                    <label><b>Phone</b></label>
                    <input type="text" placeholder="Enter phone number" className="form-control" id="phone" name="phone" required />
                    <label><b>Login</b></label>
                    <input type="text" placeholder="Enter login" className="form-control" id="login" name="login" required />
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter password" className="form-control" id="password" name="psw" required />
                    <hr />
                    <button type="submit" className="btn btn-default" >Submit</button>
                </div>
            </form>
            <div className="container signin">
                <p>Already have an account? <a href="/login">Sign in</a>.</p>
            </div>
        </div>;
    }
}



interface User {
    Login: string;
    Password: number;
    email: string;
}

