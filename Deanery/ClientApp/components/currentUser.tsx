﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Logout } from './Logout';

var i = 0;
 
export class CurrentUser extends React.Component<RouteComponentProps<{}>, FetchDataAboutUsers> {


    constructor() {
        super();
        this.state = {
            users: {
                id: 0,
                firstname: "",
                lastname: "",
                phone: "",
                login: "",
                surname: "",
                pesel: "",
                email: "",
                image : ""
            },
            loading: true,
            currentEdition: "",
            file: "https://kazut.pl/wp-content/themes/Aether/library/img/default-image.jpg"
        };
        this.changeModalContext = this.changeModalContext.bind(this);
        this.saveModalContext = this.saveModalContext.bind(this);
        this.renderGuestTable = this.renderGuestTable.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.httpGetAsync();
    }

  

    handleChange(event: any) {
       
            

        var newImage = event.target.files[0];
        this.setState({
            file: URL.createObjectURL(newImage)
        })

        var myReader: FileReader = new FileReader();
      
        myReader.onloadend = (e) => {

           
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "api/user/get-image", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify({ "image": myReader.result }));
        }
        myReader.readAsDataURL(newImage);
       // console.log(a);

        
        //var xhr = new XMLHttpRequest();
        //var formData = new FormData();
        //formData.append("image", newImage);
        //xhr.open("POST", "api/user/get-image", true);
    
        //xhr.send({ "image" : newImage });

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

           
            

            self.setState({
                users: data,
                file: data.image,                
                loading: false
            });

        }

        xhr.send();

    }



    private changeModalContext(event: any) {

        var oldValue = event.target.parentElement.firstChild.innerHTML;

        var element = document.getElementById("propertyToChange") as HTMLInputElement;
        element.setAttribute("placeholder", oldValue);
        element.value = "";

        this.setState({
            currentEdition: event.target.id
        })

    }

    private saveModalContext(event: any) {
        var value = document.getElementById("propertyToChange") as HTMLInputElement;

        var request = new XMLHttpRequest();

        request.open('POST', '/api/user/change-' + this.state.currentEdition, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify({ "Property": value.value }));

        request.onreadystatechange = () => {

        }

        request.onload = () => {
            console.log(request.responseText);
            this.httpGetAsync();
        }




        this.httpGetAsync();

    }



    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderGuestTable(this.state.users);

        return <div>
            <h3>Your information</h3>
            {contents}
            <Logout />
        </div>;
    }



    private renderGuestTable(users: User) {
        return <div>
            {
                <div className="panel panel-info" >
                    <div className="panel-heading">
                        <h3 className="panel-title"><b>{this.state.users.login}</b></h3>
                    </div>
                    <div className="col-md-2 col-lg-2 userImage"> 

                        <form action="api/user/get-image" method="post">
                        <label htmlFor="photo" className="custom-file-upload">                  
                                <img alt="User Pic" id="image" src={this.state.file} className="img-circle img-responsive customImage" />
                                <i>Click to change image</i>
                        </label>
                            <input name="photo" id="photo" className="hidden" type="file" onChange={this.handleChange} />
                        </form>
            
                         
                    </div>
                    <div className=" col-md-9 col-lg-9 ">
                        <table className="table table-user-information">
                            <tbody>
                                <tr>
                                    <td>Firstname:</td>
                                    <td>
                                        <span className="currentUserLabel">{this.state.users.firstname}</span>
                                        <button data-toggle="modal" onClick={this.changeModalContext}
                                            data-target="#exampleModal" id="firstname" className="btn glyphicon glyphicon-pencil"></button>
                                    </td>

                                </tr>
                                <tr>
                                    <td>Lastname:</td>
                                    <td>
                                        <span className="currentUserLabel">{this.state.users.lastname}</span>
                                        <button data-toggle="modal" onClick={this.changeModalContext}
                                            data-target="#exampleModal" id="lastname" className="btn glyphicon glyphicon-pencil"></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Surname</td>
                                    <td>
                                        <span className="currentUserLabel">{this.state.users.surname}</span>
                                        <button data-toggle="modal" onClick={this.changeModalContext}
                                            data-target="#exampleModal" id="surname" className="btn glyphicon glyphicon-pencil"></button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Pesel</td>
                                    <td>
                                        <span className="currentUserLabel">{this.state.users.pesel}</span>
                                        <button data-toggle="modal" onClick={this.changeModalContext}
                                            data-target="#exampleModal" id="pesel" className="btn glyphicon glyphicon-pencil"></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <span className="currentUserLabel">{this.state.users.phone}</span>
                                        <button data-toggle="modal" onClick={this.changeModalContext}
                                            data-target="#exampleModal" id="phone" className="btn glyphicon glyphicon-pencil"></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <span className="currentUserLabel">{this.state.users.email}</span>
                                        <button data-toggle="modal" onClick={this.changeModalContext}
                                            data-target="#exampleModal" id="email" className="btn glyphicon glyphicon-pencil"></button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Editing your account information</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form>
                                        <div className="modal-body">
                                            <input className="form-control" autoComplete="off" name="toChange" id="propertyToChange" placeholder="xD" />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" name="modalButton" data-dismiss="modal"
                                                onClick={this.saveModalContext} className="btn btn-primary">Save changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
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
    login: string,
    image : string

}

interface FetchDataAboutUsers {
    users: User,
    loading: boolean,
    currentEdition: string,
    file?: string
}



