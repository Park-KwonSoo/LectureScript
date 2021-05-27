import React from 'react';
import { Route } from 'react-router-dom';

import { Login, Logout, Register } from '../containers/Auth'

function Auth() {
    return (
        <>
            <Route path = 'auth/login' component = { Login }/>
            <Route path = 'auth/logout' component = { Logout }/>
            <Route path = 'auth/register' component = { Register }/>
        </>
    )
};

export default Auth;