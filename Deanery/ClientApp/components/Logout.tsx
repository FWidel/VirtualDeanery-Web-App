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



        return this.state.loaded == true ? <div className="rightSidePanel" >
            <span><b>{this.state.login}</b></span>

            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="User Pic"
                    src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
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
    login: string
}
