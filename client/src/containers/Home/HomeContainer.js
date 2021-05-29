import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { MainWrapper } from '../../components/Base';


function HomeContainer () {
    const token = useSelector(state => state.auth.get('token'));

    const history = useHistory();

    const handleGoToRecordMenu = () => {
        history.push('/record')
    };

    return (
        <MainWrapper center = {
            token ? 
            <>
                <div>로그인 완료</div>
                <button onClick = {handleGoToRecordMenu}>녹음하기</button>
            </>
            :
            <div>Home</div>            
        }/>
    );
};

export default HomeContainer;