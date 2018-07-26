import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

var i = 0;

export class Students extends React.Component<RouteComponentProps<{}>, FetchDataAboutGuests> {
    constructor() {
        super();
        this.state = {
            guests: [],
            loading: true
        };
    }

    componentDidMount() {
        this.fetchDataFromServer();
    }

    private fetchDataFromServer() {

        fetch('api/student/get-all')
            .then(response => response.json() as Promise<Guest[]>)
            .then(data => {
                this.setState({
                    guests: data,
                    loading: false
                });
            });

    }


    private static deleteGuest(z: any) {

        var containerWithElements = z.target.parentElement.parentNode.children;
        var name = containerWithElements[0].innerText;
        var surname = containerWithElements[1].innerText;
        var phone = containerWithElements[2].innerText;
        var attendace = containerWithElements[3].innerText == "true" ? true : false;
        var request = new XMLHttpRequest();

        request.open('POST', '/api/guests/remove', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send('{"Name":"' + name + '", "Surname":"' + surname + '", "Phone":"' + phone + '", "WillAttend":"' + attendace + '" }');
        z.target.parentElement.parentNode.remove();
    }



    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Students.renderGuestTable(this.state.guests);

        return <div>
            <h1>List of all students</h1>
            {contents}
        </div>;
    }

    private static renderGuestTable(guests: Guest[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {guests.map(guest =>
                    <tr key={i++} >
                        <td>{guest.name}</td>
                        <td><button type="button" onClick={this.deleteGuest} className="btn btn-danger glyphicon glyphicon-trash"></button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Guest {
    name: string;
}

interface FetchDataAboutGuests {
    guests: Guest[];
    loading: boolean
}
