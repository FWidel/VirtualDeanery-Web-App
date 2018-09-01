import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
const serverUri = "/api/";

export class Logout extends React.Component<{}, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
            login: ""
        }
    }
    userLogout(z: any) {
        var request = new XMLHttpRequest();
        request.open('POST', serverUri + 'user/logout', true);
        request.send();

        window.location.replace("/login");
    }

    componentDidMount() {

        var request = new XMLHttpRequest();

        request.open('POST', serverUri + 'user/get-current-user', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        request.onload = () => {
            if (request.responseText != "notFound") {

                var parsedResponsetext = JSON.parse(request.responseText);
                if (parsedResponsetext.image == "No image") {
                    parsedResponsetext.image = "https://kazut.pl/wp-content/themes/Aether/library/img/default-image.jpg"
                }
{}
                this.setState({
                    loaded: true,
                    login: parsedResponsetext.login,
                    image: parsedResponsetext.image
                });


            }
        }
        if (this.state.loaded == false) { request.send(); }

    }

    public render() {



        return this.state.loaded == true ? <div className="rightSidePanel" >
            <span><b>{this.state.login}</b></span>

            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="User Pic"
                    src={this.state.image}
                    className="img-circle img-responsive miniImage" />
                <span className="glyphicon glyphicon-triangle-bottom settingButton">   
                </span>

            </a>

            <div className="dropdown-menu" >
                <a className="dropdown-item customDropdown" href="/settings">Settings</a>
                <a className="dropdown-item customDropdown" href="/user">My profile</a>
                <a className="dropdown-item customDropdown" href="#">Something else here</a>
                <button type="button" className="btn btn-primary" onClick={this.userLogout} name="logout" > Logout </button>
            </div>

        </div> : null
    }
}



interface User {
    Login: string,
    Password: string
}


interface States {
    loaded: boolean,
    login: string,
    image? : string
}
