import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { MainWrapper } from '../../components/Base';
import { HomeComponent } from '../../components/Home';

function HomeContainer () {
    const token = useSelector(state => state.auth.get('token'));

    const history = useHistory();

    useEffect(() => {
        if(token)
            history.push('/record');

    }, [token]);

    const handleLogin = () => {
        history.push('/auth/login');
    };


    return (
        <MainWrapper center = {
            token ? 
            <></>
            :
            <HomeComponent onClick = {handleLogin}/>           
        }/>
    );
};

export default HomeContainer;