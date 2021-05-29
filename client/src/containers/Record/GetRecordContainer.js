//현재 로그인한 유저의 recording data를 불러오는 container = 즉 여태까지의 출력 리스트를 가져온다.
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

function GetRecordContainer () {
    const token = useSelector(state => state.auth.get('token'));
    const myRecordList = useSelector(state => state.record.get('myRecordList'));

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!token && !storage.get('token'))
            history.push('/');
        
        if(!myRecordList) {
            handleGetMyRecordList();
        }

        //unmount 함수
        return () => {
            dispatch(recordActions.initialize());
        }

    }, [token, history, dispatch]);

    const handleGetMyRecordList = () => {
        try {
            dispatch(recordActions.getRecordList({
                token
            }));

        }   catch(e) {
            dispatch(recordActions.setError({
                status : 500,
                message : '알 수 없는 에러가 발생했습니다.'
            }));
        }
    };

    const handleGoToHome = () => {
        history.push('/');
    };


    //toDO : 리스트 클릭 시 해당 페이지로 이동하도록
    return (
        myRecordList ?
        <>
            <li>{myRecordList.map(record => record.title + record.id)}</li>
            <button onClick = {handleGoToHome}>홈 화면으로</button>
        </> :
        <></>
    );
};

export default GetRecordContainer;