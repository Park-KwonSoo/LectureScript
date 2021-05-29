import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomeContainer () {
    const token = useSelector(state => state.auth.get('token'));

    const history = useHistory();

    const handleRegisterButton = () => {
        history.push('/auth/register');
    }

    const handleLoginButton = () => {
        history.push('/auth/login');
    }

    const handleLogoutButton = () => {
        history.push('/auth/logout');
    };

    const handleGoToRecordMenu = () => {
        history.push('/record')
    };

    const handleGoToMyMenu = () => {
        history.push('/record/auth')
    };
    

    return (
        token ? 
        <>
            <div>로그인 완료</div>
            <button onClick = {handleLogoutButton}>로그아웃</button>
            <button onClick = {handleGoToRecordMenu}>녹음하기</button>
            <button onClick = {handleGoToMyMenu}>내 record 목록</button>
        </> :
        <>
            <div>Home</div>
            <button onClick = {handleRegisterButton}>회원가입</button>
            <button onClick = {handleLoginButton}>로그인</button>
        </>
    );
};

export default HomeContainer;