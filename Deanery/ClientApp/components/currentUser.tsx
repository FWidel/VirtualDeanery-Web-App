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

        xhr.send({ "XD": 0 });

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
            <h3>Your information</h3>
            {contents}
            <Logout />
        </div>;
    }

    private static renderGuestTable(users: User[]) {
        return <div>
            {users.map(user =>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title"><b>{user.login}</b></h3>
                    </div>
                    <div className="col-md-2 col-lg-2 userImage">
                        <img alt="User Pic" src="https://kazut.pl/wp-content/themes/Aether/library/img/default-image.jpg" className="img-circle img-responsive"/>
                            </div>
                    <div className=" col-md-9 col-lg-9 ">
                        <table className="table table-user-information">
                            <tbody>
                                <tr>
                                    <td>Firstname:</td>
                                    <td>{user.firstname}</td>
                                </tr>
                                <tr>
                                    <td>Lastname:</td>
                                    <td>{user.lastname}</td>
                                </tr>
                                <tr>
                                    <td>Surname</td>
                                    <td>{user.surname}</td>
                                </tr>

                                <tr>
                                    <td>Pesel</td>
                                    <td>{user.pesel}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>;

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



