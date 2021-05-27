import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';

function LogoutContainer () {
    const token = useSelector(state => state.auth.get('token'));

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(token) {
            dispatch(authActions.logout());
            history.push('/');
        };
    }, []);

    return (
        <></>
    )
};

export default LogoutContainer;