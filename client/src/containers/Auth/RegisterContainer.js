import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';

import { MainWrapper } from '../../components/Base';
import { RegisterComponent } from '../../components/Auth';

import { isEmail, isLength } from 'validator';


function RegisterContainer () {    
    const auth = useSelector(state => state.auth);
    const success = useSelector(state => state.auth.getIn(['register', 'success']))

    const dispatch = useDispatch();
    const history = useHistory();

    const [registerDisable, setRegisterDisable] = useState(true);

    const validate = {
        email : (value) => {
            if(!isEmail(value)) {
                dispatch(authActions.setError({
                    form : 'register',
                    status : 400,
                    message : "올바르지 않은 이메일입니다."
                }));
                return false;
            }
            return true;
        },
        name : (value) => {
            if(!value.length) {
                dispatch(authActions.setError({
                    form : 'register',
                    status : 400,
                    message : '올바른 이름을 입력해야 합니다.'
                }));
                return false;
            }
            return true;
        },
        password : (value) => {
            if(!isLength(value, { min : 8 })) {
                dispatch(authActions.setError({
                    form : 'register',
                    status : 400,
                    message : '비밀번호를 8자 이상 입력하세요.'
                }));
                return false;
            }
            return true;
        },
        passwordConfirm : (value) => {
            if(!isLength(value, { min : 8 }) || value !== auth.getIn(['register', 'password'])) {
                dispatch(authActions.setError({
                    form : 'register',
                    status : 400,
                    message : '비밀번호가 다릅니다.'
                }));
                return false;
            }
            return true;
        }
    };

    useEffect(() => {
        if(success) {
            history.push('/');
        }

        if(validate['email'](auth.getIn(['register', 'email']))
            && validate['name'](auth.getIn(['register', 'name']))
            && validate['password'](auth.getIn(['register', 'password']))
            && validate['passwordConfirm'](auth.getIn(['register', 'passwordConfirm']))
        ) {
            dispatch(authActions.setError({
                form : 'register',
                status : 200,
                message : null
            }));

            setRegisterDisable(false);
        } else  setRegisterDisable(true);

    }, [success, dispatch, registerDisable, validate]);



    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        dispatch(authActions.changeInput({
            form : 'register',
            name,
            value
        }));
    };

    //to Do : validate하기 = password 2번 입력받기
    const handleRegister = () => {
        try {
            const email = auth.getIn(['register', 'email']);
            const name = auth.getIn(['register', 'name']);
            const password = auth.getIn(['register', 'password']);

            dispatch(authActions.register({
                email,
                name,
                password
            }));

        }   catch(e) {
            dispatch(authActions.setError({
                form : 'register',
                status : 500,
                message : '알 수 없는 에러가 발생했습니다.'
            }));
        }
    }




    return (
        <MainWrapper center = {
            <RegisterComponent disabled = {registerDisable} onChange = {handleChangeInput} onClick = {handleRegister}/>
        }/>
    );
};

export default RegisterContainer;