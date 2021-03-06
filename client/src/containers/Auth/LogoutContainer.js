import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../../redux/modules/auth';
import * as pdfActions from '../../redux/modules/pdf';
import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

function LogoutContainer () {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.logout());
        dispatch(pdfActions.initialize());
        dispatch(recordActions.initialize());

        storage.remove('token');

        alert('로그아웃 되었습니다.');
        history.push('/');

        //홈화면으로 돌아가서 새로고침
        window.location.reload();

    }, [history, dispatch]);

    return (
        <></>
    )
};

export default LogoutContainer;