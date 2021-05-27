import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';

function LoginContainer () {
    const auth = useSelector(state => state.auth);

    const history = useHistory();
    const dispatch = useDispatch();

    //컴포넌트가 연결되면
    useEffect(() => {
        dispatch(authActions.setError({
            message : null
        }))
    }, [dispatch])
    

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

            history.push('/');

        }   catch(e) {
            dispatch(authActions.setError({
                message : '알 수 없는 에러가 발생했습니다.'
            }));
        }
    };

    return (
        <>
            <input name = 'email' onChange = {handleChangeInput}/>
            <input name = 'password' type = 'password' onChange = {handleChangeInput}/>
            <button onClick = {handleClick}/>
        </>
    );
};

export default LoginContainer;