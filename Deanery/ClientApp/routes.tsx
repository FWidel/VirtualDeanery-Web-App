import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Register } from './components/Register';
import { Students } from './components/Students';
import { Login } from './components/Login';


export const routes = <Layout>
    <Route exact path='/' component={ Login } />
    <Route path='/students' component={Students} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
</Layout>;
