import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Register } from './components/Register';
import { Students } from './components/Students';
import { Login } from './components/Login';
import { Index } from './components/Index';
import { CurrentUser } from './components/CurrentUser';
import { Settings } from './components/Settings';
import { CreateCourse } from './components/CreateCourse';
import { ViewCourse } from './components/ViewCourse';
import { Chat } from './components/Chat';


export const routes = <Layout>
    <Route exact path='/' component={ Login } />
    <Route path='/students' component={Students} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/index' component={Index} />
    <Route path='/user' component={CurrentUser} />
    <Route path='/settings' component={Settings} />
    <Route path='/createCourse' component={CreateCourse} />
    <Route path='/viewCourse' component={ViewCourse} />
    <Route path='/chat' component={Chat} />
   
</Layout>;
