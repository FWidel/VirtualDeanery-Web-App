import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Logout } from './Logout';

var i = 0;

export class CurrentUser extends React.Component<RouteComponentProps<{}>, FetchDataAboutUsers> {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        };
    }

    componentDidMount() {
        this.httpGetAsync();
    }


    private httpGetAsync() {
        var xhr = new XMLHttpRequest();
        var json_obj, status = false;
        var self = this;

        xhr.open("POST", "api/user/get-current", true);

        xhr.onreadystatechange = function () {

            if (xhr.responseText == "Unauthorized session") {
                window.location.replace("login");
            }
            var data = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);

            self.setState({
                users: data,
                loading: false
            });

        }

        xhr.send({"XD" : 0});

    }



    //      .then(response =>  response.json() as Promise<User[]>)


    private static deleteGuest(z: any) {

        var id = z.target.id;
        console.log(id);
        var request = new XMLHttpRequest();
        request.open('POST', '/api/user/delete', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(parseInt(id));
        z.target.parentElement.parentNode.remove();

        request.onload = () => {
            alert(request.responseText);
        }
    }



    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CurrentUser.renderGuestTable(this.state.users);

        return <div>
            <h1>Your information</h1>
            {contents}
            <Logout />
        </div>;
    }

    private static renderGuestTable(users: User[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Surname</th>
                    <th>Pesel</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Login</th>
                    <th>Password</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user.id} >
                        <td><input type="text" name="xD" placeholder={user.firstname} /></td>
                        <td>{user.lastname}</td>
                        <td>{user.surname}</td>
                        <td>{user.pesel}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.login}</td>
                        <td>{user.password}</td>
                        
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface User {
    id: number,
    firstname: string,
    lastname: string,
    surname: string,
    pesel: string,
    phone: string,
    email: string,
    password: string,
    login: string

}

interface FetchDataAboutUsers {
    users: User[],
    loading: boolean
}



