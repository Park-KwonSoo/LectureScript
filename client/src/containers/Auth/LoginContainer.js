import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';

function LoginContainer () {
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.get('token'));

    const history = useHistory();
    const dispatch = useDispatch();

    //token의 값이 설정되면 변화하면 home 화면으로 간다.
    useEffect(() => {
        if(token) {
            dispatch(authActions.setError({
                message : null
            }));
            
            history.push('/');
        }
    }, [token])
    

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        dispatch(authActions.changeInput({
            form : 'login',
            name,
            value
        }));
    };

    const handleClick = () => {
        try {
            const email = auth.getIn(['login', 'email']);
            const password = auth.getIn(['login', 'password']);
            
            dispatch(authActions.login({
                email,
                password
            }));

        }   catch(e) {
            dispatch(authActions.setError({
                message : e
            }));
        }
    };

    return (
        <>
            <input name = 'email' onChange = {handleChangeInput}/>
            <input name = 'password' type = 'password' onChange = {handleChangeInput}/>
            <button onClick = {handleClick}>로그인</button>
        </>
    );
};

export default LoginContainer;