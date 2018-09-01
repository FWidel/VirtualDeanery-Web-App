import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Logout } from './Logout';

var i = 0;

export class ViewCourse extends React.Component<RouteComponentProps<{}>, States> {
    constructor() {
        super();
        this.state = {
            courses: [],
            loading: true,
            message: ""
        };
        this.deleteGuest = this.deleteGuest.bind(this)
        this.httpGetAsync = this.httpGetAsync.bind(this)
    }

    componentWillMount() {
        //this.httpGetAsync();
    }



    private httpGetAsync() {
        var xhr = new XMLHttpRequest();
        var json_obj, status = false;
        var self = this;
   

        xhr.open("GET", "api/course/get-all?search=" + (document.getElementById("search") as HTMLInputElement).value, true);

        xhr.onreadystatechange = function () {

          

         
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            self.setState({
                courses: data,
                loading: false
            });

        }

        xhr.send(null);

    }



    //      .then(response =>  response.json() as Promise<User[]>)


    private deleteGuest(z: any) {

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
            ? <p></p>
            : this.renderGuestTable(this.state.courses);

        return <div>
            <form className="form-group">
                <div className="container login-form">
                    {this.state.message != "" ? <div className="alert alert-danger">
                        <strong>Warning!</strong> {this.state.message}
                    </div> : <span />}

                    <h3 className="text-center">Courses panel</h3>
                    <p className="text-center">Use this input to search for courses</p>
                    <input type="text" placeholder="Keyword" className="form-control" 
                        id="search" name="search" autoComplete="true" onChange={this.httpGetAsync} required />
                </div>
            </form>
            {contents}
            <Logout />
        </div>;
    }

    private renderGuestTable(courses: Course[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>Desxription</th>
                    <th>Leader</th>

                </tr>
            </thead>
            <tbody>
                {courses.map(course =>
                    <tr key={course.id} >
                        <td>{course.name}</td>
                        <td>{course.difficulty}</td>
                        <td>{course.description}</td>
                        <td>{course.leader}</td>
                        {/*<td><button type="button" id={(user.id).toString()} onClick={this.deleteGuest} className="btn btn-danger glyphicon glyphicon-trash"></button></td>*/}
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Course {
    name: string,
    difficulty: string,
    leader?: string,
    description: string,
    id: number,
    password: string

}

interface States {
    courses: Course[],
    loading: boolean,
    message?: string
}



