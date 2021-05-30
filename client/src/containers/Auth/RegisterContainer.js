import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';

import { MainWrapper, ErrorComponent } from '../../components/Base';
import { RegisterComponent } from '../../components/Auth';

import { isEmail, isLength } from 'validator';


function RegisterContainer () {    
    const auth = useSelector(state => state.auth);

    const success = auth.getIn(['register', 'success']);
    const error = auth.get('error');
    const status = auth.getIn(['register', 'status']);

    const history = useHistory();
    const dispatch = useDispatch();

    const [registerError, setRegisterError] = useState(true);

    const validate = {
        email : (value) => {
            if(!isEmail(value)) {
                setRegisterError(true);
                return false;
            }
            return true;
        },
        name : (value) => {
            if(!value.length) {
                setRegisterError(true);
                return false;
            }
            return true;
        },
        password : (value) => {
            if(!isLength(value, { min : 8 })) {
                setRegisterError(true);
                return false;
            }
            return true;
        },
        passwordConfirm : (value) => {
            if(!isLength(value, { min : 8 }) || value !== auth.getIn(['register', 'password'])) {
                setRegisterError(true);
                return false;
            }
            return true;
        }
    };

    useEffect(() => {
        if(success) {
            alert('회원가입에 성공했습니다!');
            history.push('/');
            dispatch(authActions.initialize());
        }

        if(validate['email'](auth.getIn(['register', 'email']))
            && validate['name'](auth.getIn(['register', 'name']))
            && validate['password'](auth.getIn(['register', 'password']))
            && validate['passwordConfirm'](auth.getIn(['register', 'passwordConfirm']))
        ) {
            setRegisterError(false);
        } else  setRegisterError(true);

    }, [history, auth, success, dispatch, registerError, validate]);



    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        dispatch(authActions.changeInput({
            form : 'register',
            name,
            value
        }));
    };

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
    };

    const handleCancel = () => {
        dispatch(authActions.initialize());
        history.push('/');
    };


    return (
        <MainWrapper center = {
            <RegisterComponent disabled = {registerError} onChange = {handleChangeInput} 
            onClick = {handleRegister} cancel = {handleCancel}/>
        } down = {
            <ErrorComponent open = {error || status >= 400}>
                {`${status} : ${error}`}
            </ErrorComponent>
        }/>
    );
};

export default RegisterContainer;