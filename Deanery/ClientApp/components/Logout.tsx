import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
const serverUri = "/api/";

export class Logout extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    userLogout(z: any) {
        var request = new XMLHttpRequest();
        request.open('POST', serverUri + 'user/logout', true);
        request.send();

        window.location.replace("/login");
    }

    public render() {
        return <div>
            <button type="button" className="btn btn-primary logoutButton" onClick={this.userLogout} name="logout" > Logout </button>
            </div>
    }
}



interface User {
    Login: string,
    Password: string
}

