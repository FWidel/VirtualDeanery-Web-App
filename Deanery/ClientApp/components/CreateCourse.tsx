import * as React from 'react';
import { RouteComponentProps } from 'react-router';
var ReCAPTCHA = require("react-google-recaptcha");
const serverUri = "/api/";

declare function require(name: string): any;
var Crypto = require('crypto-js')


export class CreateCourse extends React.Component<RouteComponentProps<{}>, User> {
    constructor(props: any) {
        super(props);
        this.createCourse = this.createCourse.bind(this);
        this.state = {
            Message : ""
        }
    }
    createCourse(z: any) {
        z.preventDefault();
        var formData = z.target;

        console.log(formData);
        //var v = grecaptcha.getResponse();

        var request = new XMLHttpRequest();
        var name = formData.name.value;
        var description = formData.description.value;
        var password = formData.password.value;
        var difficulty = formData.difficulty.value;

        //SHA256 hash
        password = Crypto.SHA256(password).toString()


        request.open('POST', serverUri + 'course/add', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');


        request.onload = () => {
            alert(request.responseText);
            if (request.responseText == "Successfully added") {
               // window.location.replace("/login");
            }
        }

        request.send(JSON.stringify({
            "Name": name,
            "Description": description,
            "Password": password,
            "Difficulty" : difficulty
        }));
    }








    public render() {
        return <div>
            <form className="form-group" onSubmit={this.createCourse}>
                <div className="container login-form">
                    {this.state.Message != "" ? <div className="alert alert-danger">
                        <strong>Warning!</strong> {this.state.Message}
                    </div> : <span />}

                    <h3 className="text-center">Create course</h3>
                    <p className="text-center">Please enter your login and password</p>
                    <input type="text" placeholder="Name" className="form-control"
                        id="name" name="name" autoComplete="true" required />
                    <textarea type="text" placeholder="Description" className="form-control"
                        id="description" name="description" autoComplete="true" required />
                    <input type="password" placeholder="Password" className="form-control"
                        id="password" name="password" autoComplete="true" required />
                    <select name="difficulty" className="form-control">
                        <option value="begginer">Begginer</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                   
                    <button type="submit" className="btn btn-primary" >Create course</button>
                </div>
            </form>
        </div>;
    }
}



interface User {
    Message : string
}

