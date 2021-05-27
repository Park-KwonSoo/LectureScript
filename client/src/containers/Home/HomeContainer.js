import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomeContainer () {

    const history = useHistory();

    const handleRegisterButton = () => {
        history.push('/auth/register');
    }

    const handleLoginButton = () => {
        history.push('/auth/login');
    }

    const handleLogoutButton = () => {
        history.push('/auth/logout');    
    }

    return (
        <>
            <div>Home</div>
            <button onClick = {handleRegisterButton}>회원가입</button>
            <button onClick = {handleLoginButton}>로그인</button>
            <button onClick = {handleLogoutButton}>로그아웃</button>
        </>
    );
};

export default HomeContainer;