import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
const serverUri = "/api/";

export class Logout extends React.Component<{}, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: true,
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
            if (request.responseText != "notFound" && request.responseText !="") {

                this.setState({
                    loaded: true,
                    login: request.responseText
                });
                

            }
        }

        request.send();
    }

    public render() {

   

        return this.state.loaded == true ? < div >
            <span>{this.state.login}</span><button type="button" className="btn btn-primary logoutButton" onClick={this.userLogout} name="logout" > Logout </button>
            </div> : <div> </div>
    }
}



interface User {
    Login: string,
    Password: string
}


interface States {
    loaded: boolean,
    login : string
}
