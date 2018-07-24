import * as React from 'react';
import { RouteComponentProps } from 'react-router';
const serverUri  = "/api/";
export class Home extends React.Component<RouteComponentProps<{}>, User> {
    constructor(props: any) {
        super(props);
    }
    userRegister(z: any) {
        var formData;
        formData = z.target.parentElement.parentElement;
        //console.log(formData);

        var request = new XMLHttpRequest();
        var firstname = formData.firstname.value;
        var surname = formData.surname.value;
        var lastname = formData.lastname.value;
        var password = formData.password.value;
        var email = formData.email.value;
        var phone = formData.phone.value;
        var pesel = formData.pesel.value;

        request.open('POST', serverUri +'user/register', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        formData.reset();

        request.onload = () => {
            alert(request.responseText);
        }

        request.send(JSON.stringify({
            "Firstname": firstname,
            "Password": password,
            "Email": email,
            "Phone": phone,
            "Lastname": lastname,
            "Surname": surname,
            "Pesel": pesel
        }));
    }

    public render() {
        return <div>
            <form>
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <label><b>Firstname</b></label>
                    <input type="text" placeholder="Enter name" id="firstname" name="firstname" required />
                    <label><b>Lastname</b></label>
                    <input type="text" placeholder="Enter lastname" id="lastname" name="lastname" required />
                    <label><b>Surname</b></label>
                    <input type="text" placeholder="Enter surname" id="surname" name="surname" required />
                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter email" id="email" name="email" required />
                    <label><b>PESEL</b></label>
                    <input type="text" placeholder="Enter PESEL" id="pesel" name="pesel" required />
                    <label><b>Phone</b></label>
                    <input type="text" placeholder="Enter phone number" id="phone" name="phone" required />
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter password" id="password" name="psw" required />
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

