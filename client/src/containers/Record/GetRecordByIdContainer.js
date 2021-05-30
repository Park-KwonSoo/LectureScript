//id를 가지고 record를 가져온다.
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as pdfActions from '../../redux/modules/pdf';
import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

import { MainWrapper, ErrorComponent } from '../../components/Base';
import { OneRecordingView } from '../../components/Record';


function GetRecordByIdContainer ({match}) {
    const { recordId } = match.params;

    const recordInfo = useSelector(state => state.record.get('recordInfo'));
    const token = useSelector(state => state.auth.get('token'));

    const error = useSelector(state => state.record.get('error'));
    const status = useSelector(state => state.record.get('status'));

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!token && !storage.get('token')) {
            history.push('/');
        }

        handleGetRecord();

    }, [token, history, error]);


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
        dispatch(pdfActions.initialize());
        history.push('/pdf');
    };


    return (
        recordInfo ?
        <MainWrapper center = {
            <OneRecordingView onClick = {handleMakePdf}>
                {recordInfo}
            </OneRecordingView>
        } down = {
            <ErrorComponent open = {error}>
                {`${status} : ${error}`}
            </ErrorComponent>
        }/> :
        <></>
    );
};

export default GetRecordByIdContainer;