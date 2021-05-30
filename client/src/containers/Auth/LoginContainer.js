import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';
import storage from '../../lib/storage';

import { MainWrapper, ErrorComponent } from '../../components/Base';
import { LoginComponent } from '../../components/Auth';

import { isEmail, isLength } from 'validator';


function LoginContainer () {
    const auth = useSelector(state => state.auth);

    const token = auth.get('token');
    const error = auth.get('error');
    const status = auth.getIn(['login', 'status']);

    const [loginError, setLoginError] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const validate = {
        email : (value) => {
            if(!isEmail(value)) {
                setLoginError(true);
                return false;
            }
            return true;
        },
        password : (value) => {
            if(!isLength(value, { min : 8 })) {
                setLoginError(true);
                return false;
            }
            return true;
        }
    };


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

        if(validate['email'](auth.getIn(['login', 'email'])) 
            && validate['password'](auth.getIn(['login', 'password']))
        ) {
            setLoginError(false);
        } else setLoginError(true);

    }, [token, dispatch, validate, loginError, auth, history]);
    

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
        <MainWrapper center = {
            <LoginComponent disabled = {loginError} onChange = {handleChangeInput} onClick = {handleLogin}/>
        } down = {
            <ErrorComponent open = {error || status >= 400}>
                {`${status} : ${error}`}
            </ErrorComponent>
        }/>
    );
};

export default LoginContainer;