import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
            <div className='navbar bg-light' >
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Deanery</Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Students'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Students
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home3
                            </NavLink>
                        </li>
 
                    </ul>
                </div>
            </div>
        </div>;
    }
}
