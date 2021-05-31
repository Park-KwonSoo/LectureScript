//현재 로그인한 유저가 녹음을 해서 db를 만드는 container -> pdfContainer와 연계됨
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

import { Loading, MainWrapper, Modal, ErrorComponent } from '../../components/Base';
import { RecordingComponent, RecordingInputComponent } from '../../components/Record';


function RecordingContainer() {
    const token = useSelector(state => state.auth.get('token'));

    const record = useSelector(state => state.record);

    const title = record.getIn(['input', 'title']);
    const professor = record.getIn(['input', 'professor']);
    const recordInfo = record.get('recordInfo');

    const error = record.get('error');
    const status = record.get('status');


    //녹음과 관련된 state
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();    
    //현재 녹음중 = 녹음 중 ? true : false
    const [onRec, setOnRec] = useState(false);
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    //녹음 완료된 state
    const [recordComplete, setRecordComplete] = useState(false);
    //녹음 완료되고 값을 제대로 입력해야 생성 가능
    const [buttonDisEnabled, setButtonDisEnabled] = useState(true);
    //로딩중
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!token && !storage.get('token'))
            history.push('/');

        if(recordInfo && loading) {
            setLoading(false);
            history.push('/pdf');
        }

        if(status && parseInt(status / 100) >= 4) {
            setLoading(false);
            dispatch(recordActions.setError({
                status,
                message : '에러가 발생했습니다.'
            }));
        }

        if(title.length && professor.length) 
            setButtonDisEnabled(false);
        else    setButtonDisEnabled(true);


    }, [token, history, recordInfo, error, status, title, professor, loading]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        dispatch(recordActions.changeInput({
            name,
            value
        }))
    };

    //녹음하기
    const handleOnRec = () => {
        dispatch(recordActions.initialize());

        if(!navigator.mediaDevices) {
            dispatch(recordActions.setError({
                message : '이 브라우저는 녹음을 진행할 수 없습니다.'
            }));
            console.log(navigator);
        } else {
            const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    
            // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
            const analyser = audioCtx.createAnalyser();
            analyser.connect(audioCtx.destination);
            setAnalyser(analyser);
        
            //녹음 시작
            navigator.mediaDevices.getUserMedia({ audio : true }).then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = e => {
                    setAudioUrl(e.data);
                };
                setStream(stream);
                setMedia(mediaRecorder);
                // makeSound(stream);
                setOnRec(true);
                setRecordComplete(false);
            }).catch(() => {
                dispatch(recordActions.setError({
                    status : 500,
                    message : '녹음 중 문제가 발생했습니다.'
                }));
            });
        }
    };

    //녹음 정지
    const handleOffRec = () => {
        setOnRec(false);

        stream.getAudioTracks().forEach(track => {
            track.stop();
        });

        media.stop();
        setRecordComplete(true);

        analyser.disconnect();

    };

    //녹음된 오디오 파일로 저장 및 script를 만들어서 status에 저장한다.
    const handleSaveAudioFile = () => {

        const file = new File([audioUrl], title + '.ogg', { 
            lastModified : new Date().getTime(), type : 'audio/ogg codecs=opus' 
        });

        const formData = new FormData();
        formData.append('title', title);
        formData.append('professor', professor);
        formData.append('file', file);

        setLoading(true);
        dispatch(recordActions.makeRecordFile(formData, token));

    };

    
    //to DO : 모달 팝업 만들기 : Loading
    return (
        <MainWrapper center = {
            onRec ?
            <RecordingComponent onClick = {handleOffRec} image = 'recording'/>
            :
            <RecordingComponent onClick = {handleOnRec} image = 'record_start'/>
        } down = {
            <>
            {
                recordComplete ? 
                <>
                    <RecordingInputComponent 
                        onChange = {handleChangeInput} 
                        onClick = {handleSaveAudioFile}
                        disabled = {buttonDisEnabled}
                    />
                    <Modal open = {loading} header = "Loading"> 
                        <Loading/>
                    </Modal><></>
                </> : 
                <></>
            }
            {
                <ErrorComponent open = {error}>
                    {`${status} : ${error}`}
                </ErrorComponent>
            }
            </>
        }/>
    );
};

export default RecordingContainer;