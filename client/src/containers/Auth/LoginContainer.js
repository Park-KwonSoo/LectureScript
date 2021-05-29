import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';
import storage from '../../lib/storage';

function LoginContainer () {
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.get('token'));

    const history = useHistory();
    const dispatch = useDispatch();

    //token의 값이 설정되면 home 화면으로 간다.
    useEffect(() => {
        if(token) {
            //localStorage에 token값을 저장
            storage.set('token', token);

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

    const handleLogin = () => {
        try {
            const email = auth.getIn(['login', 'email']);
            const password = auth.getIn(['login', 'password']);
            
            dispatch(authActions.login({
                email,
                password
            }));

        }   catch(e) {
            dispatch(authActions.setError({
                form : 'login',
                status : 500,
                message : '알 수 없는 에러가 발생했습니다'
            }));
        }
    };

    return (
        <>
            <input name = 'email' onChange = {handleChangeInput}/>
            <input name = 'password' type = 'password' onChange = {handleChangeInput}/>
            <button onClick = {handleLogin}>로그인</button>
        </>
    );
};

export default LoginContainer;