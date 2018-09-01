import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { createElement, ReactHTMLElement } from 'react';
const serverUri = "api/"
export class NavMenu extends React.Component<{}, { authorized: boolean, courses: boolean, activeButton: HTMLButtonElement }> {
    constructor(props: any) {
        super(props);
        this.state = {
            authorized: false,
            courses: false,
            activeButton: document.createElement("button")
        }

        this.showSubmenu = this.showSubmenu.bind(this);
        this.changeActive = this.changeActive.bind(this);
    }


    componentDidMount() {
        var request = new XMLHttpRequest();

        request.open('POST', serverUri + 'user/check-authorization', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        request.onload = () => {
            if (request.responseText != "false") {

                this.setState({
                    authorized: true
                });


            }
        }
        request.send();


    }

    showSubmenu() {

        this.setState({
            courses: !this.state.courses
        })

    }

    changeActive(event: any) {
        this.state.activeButton.className = "xddd";
        
        event.currentTarget.setAttribute("class", "activeButton");
        this.setState({
            activeButton : event.currentTarget
        })
    }
    public render() {
        return this.state.authorized == true ? < div className='main-nav navMenu' >
            <div className='navbar bg-light' >
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Deanery</Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav'>
                        <li>
                            <button onClick={this.changeActive} name="parentButton">
                                <NavLink to={'/index'}  exact >
                                    <span className='glyphicon glyphicon-home' ></span> Home
                            </NavLink>
                            </button>
                        </li>
                        <li>
                            <button onClick={this.changeActive}>
                                <NavLink to={'/Students'} exact >
                                    <span className='glyphicon glyphicon-home'></span> Students
                            </NavLink>
                            </button>
                        </li>
                        <li onClick={this.showSubmenu}>

                            <button onClick={this.changeActive}>
                                <a>
                                    <span className='glyphicon glyphicon-home'></span> Courses
                                 </a>
                            </button>
                        </li>
                        {this.state.courses == true ?
                            <li>
                                <NavLink to={'/createCourse'} exact > <span className='glyphicon glyphicon-chevron-right'></span>
                                    <span className='glyphicon glyphicon-home'></span> create
                                 </NavLink>
                            </li> : <span></span>}
                        {this.state.courses == true ?
                            <li>
                                <NavLink to={'/viewCourse'} exact >  <span className='glyphicon glyphicon-chevron-right'></span>
                                    <span className='glyphicon glyphicon-home'></span> view
                            </NavLink>
                            </li> : <span></span>}


                    </ul>
                </div>
            </div>
        </div> : <span> </span>;
    }
}
