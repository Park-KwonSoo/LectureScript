import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';

function RegisterContainer () {    
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.get('token'));
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
    const handleClick = () => {
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
                message : e
            }));
        }
    }




    return (
        <>
            <input name = 'email' onChange = {handleChangeInput}/>
            <input name = 'name' onChange = {handleChangeInput}/>
            <input name = 'password' type = 'password' onChange = {handleChangeInput}/>
            <button onClick = {handleClick}>회원가입하기</button>
        </>
    );
};

export default RegisterContainer;