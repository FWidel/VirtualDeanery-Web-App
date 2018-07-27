import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Students } from './components/Students';
import { Login } from './components/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Students' component={Students} />
    <Route path='/login' component={Login} />
</Layout>;
