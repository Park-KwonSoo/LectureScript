import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';
import storage from '../../lib/storage';

import { MainWrapper } from '../../components/Base';
import { LoginComponent } from '../../components/Auth';

import { isEmail, isLength } from 'validator';


function LoginContainer () {
    const auth = useSelector(state => state.auth);

    const token = auth.get('token');

    const [loginDisable, setLoginDisable] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const validate = {
        email : (value) => {
            if(!isEmail(value)) {
                dispatch(authActions.setError({
                    form : 'login',
                    status : 400,
                    message : "올바르지 않은 이메일입니다."
                }));
                return false;
            }
            return true;
        },
        password : (value) => {
            if(!isLength(value, { min : 8 })) {
                dispatch(authActions.setError({
                    form : 'login',
                    status : 400,
                    message : '비밀번호를 8자 이상 입력하세요.'
                }));
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
            dispatch(authActions.setError({
                form : 'login',
                status : 200,
                message : null
            }));
            setLoginDisable(false);
        } else setLoginDisable(true);

    }, [token, dispatch, validate, loginDisable, auth, history]);
    

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
            <LoginComponent disabled = {loginDisable} onChange = {handleChangeInput} onClick = {handleLogin}/>
        }/>
    );
};

export default LoginContainer;