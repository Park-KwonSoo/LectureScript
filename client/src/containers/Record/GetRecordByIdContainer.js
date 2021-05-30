//id를 가지고 record를 가져온다.
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

import { MainWrapper } from '../../components/Base';


function GetRecordByIdContainer ({match}) {
    const { recordId } = match.params;

    const recordInfo = useSelector(state => state.record.get('recordInfo'));
    const token = useSelector(state => state.auth.get('token'));

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!token && !storage.get('token')) {
            history.push('/');
        }

        if(token && !recordInfo) {
            handleGetRecord();
        };

    }, [token, recordInfo]);


    const handleGetRecord = () => {
        try {
            dispatch(recordActions.getRecordById({
                token,
                recordId
            }));
    
        }   catch(e) {
            dispatch(recordActions.setError({
                status : 500,
                message : '알 수 없는 에러가 발생했습니다.'
            }));
        }
    };


    const handleMakePdf = () => {
        history.push('/pdf');
    };


    return (
        recordInfo ?
        <MainWrapper center = {
            <>
                <div>{'title : ' + recordInfo.title}</div>
                <div>{'professor : ' + recordInfo.professor}</div>
                <div>{'createdDate :' + recordInfo.createdDate}</div>
                <div>{'typeScript : ' + recordInfo.typeScript}</div>
                <button onClick = {handleMakePdf}>PDF로 만들기</button>
                
            </>
        }/>
        :
        <>
        </>
    );
};

export default GetRecordByIdContainer;