import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
const serverUri = "api/"
export class NavMenu extends React.Component<{}, { authorized: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            authorized : false
        }
    }


    componentDidMount() {
        var request = new XMLHttpRequest();
    
        request.open('POST', serverUri + 'user/check-authorization', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        request.onload = () => {
            if (request.responseText != "false") {

                this.setState({
                   authorized : true
                });


            }
        }
        request.send();
  

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
                            <NavLink to={'/index'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Students'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Students
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/courses'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Courses
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </div> : <span> </span>;
    }
}
