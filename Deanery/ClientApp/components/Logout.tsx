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

                this.setState({
                    loaded: true,
                    login: request.responseText
                });


            }
        }
        if (this.state.loaded == false) { request.send(); }

    }

    public render() {



        return this.state.loaded == true ? < div className="rightSidePanel" >
            <span><b>{this.state.login}</b></span>

            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="glyphicon glyphicon-cog settingButton"></span>
            </a>

            <div className="dropdown-menu" >
                <a className="dropdown-item customDropdown" href="/settings">Settings</a>
                <a className="dropdown-item customDropdown" href="/user">My profile</a>
                <a className="dropdown-item customDropdown" href="#">Something else here</a>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.userLogout} name="logout" > Logout </button>
        </div> : null
    }
}



interface User {
    Login: string,
    Password: string
}


interface States {
    loaded: boolean,
    login: string
}
