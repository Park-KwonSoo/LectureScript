import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';

function RegisterContainer () {    
    const auth = useSelector(state => state.auth);
    const success = useSelector(state => state.auth.getIn(['register', 'success']))

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(success) {
            history.push('/');
        }
    }, [success]);


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
        <>
            <input name = 'email' onChange = {handleChangeInput}/>
            <input name = 'name' onChange = {handleChangeInput}/>
            <input name = 'password' type = 'password' onChange = {handleChangeInput}/>
            <button onClick = {handleRegister}>회원가입하기</button>
        </>
    );
};

export default RegisterContainer;