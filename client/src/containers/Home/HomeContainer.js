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
    }

    const handleGoToMenu = () => {
        history.push('/record/auth')
    }
    
    //이거 지우고 녹음하기로 바꾸기
    const handleGoToRecordMenu = () => {
        history.push('/record/auth/1')
    }

    return (
        token ? 
        <>
            <div>로그인 완료</div>
            <button onClick = {handleLogoutButton}>로그아웃</button>
            <button onClick = {handleGoToMenu}>내 record 목록</button>
            <button onClick = {handleGoToRecordMenu}>record 1번 메뉴로</button>
        </> :
        <>
            <div>Home</div>
            <button onClick = {handleRegisterButton}>회원가입</button>
            <button onClick = {handleLoginButton}>로그인</button>
        </>
    );
};

export default HomeContainer;