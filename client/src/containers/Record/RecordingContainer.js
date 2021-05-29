//현재 로그인한 유저가 녹음을 해서 db를 만드는 container -> pdfContainer와 연계됨
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

import { HomeButton, Loading, MainWrapper } from '../../components/Base';


function RecordingContainer() {
    const token = useSelector(state => state.auth.get('token'));
    const record = useSelector(state => state.record);
    const recordInfo = record.get('recordInfo');

    //녹음과 관련된 state
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();    
    //현재 녹음중 = 녹음 중 ? true : false
    const [onRec, setOnRec] = useState(false);
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    //녹음 완료된 state
    const [recordComplete, setRecordComplete] = useState(false);
    //로딩중
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!token && !storage.get('token'))
            history.push('/');

        if(recordInfo) {
            setLoading(false);
            history.push('/pdf');
        }

    }, [token, dispatch, history, recordInfo]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        dispatch(recordActions.changeInput({
            name,
            value
        }))
    };

    //녹음하기
    const handleOnRec = () => {
        if(!navigator.mediaDevices) {
            dispatch(recordActions.setError({
                message : '이 브라우저는 녹음을 진행할 수 없습니다.'
            }));
        } else {
            const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    
            // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
            const analyser = audioCtx.createAnalyser();
            analyser.connect(audioCtx.destination);
            setAnalyser(analyser);
        
            // const makeSound = stream => {
            //   // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            //   const source = audioCtx.createMediaStreamSource(stream);
            //   setSource(source);
              
            //   // AudioBufferSourceNode 연결
            //   source.connect(analyser);
            //   analyser.connect(audioCtx.destination);
            // }

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
                    message : '알 수 없는 에러가 발생했습니다.'
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
        // source.disconnect();

    };

    //녹음된 오디오 파일로 저장 및 script를 만들어서 status에 저장한다.
    const handleSaveAudioFile = () => {
        const title = record.getIn(['input', 'title']);
        const professor = record.getIn(['input', 'professor']);

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

    const handleGoHome = () => {
        history.push('/');
    };


    return (
        <MainWrapper center = {
            onRec ?
            <button onClick = {handleOffRec}>녹음 중지</button> 
            :
            <>
                <button onClick = {handleOnRec}>녹음 하기</button>
                {
                    recordComplete ? 
                    <>
                        <input name = 'title' onChange = {handleChangeInput}/>
                        <input name = 'professor' onChange = {handleChangeInput}/>
                        <button onClick = {handleSaveAudioFile}>PDF로 만들러 가기</button>
                        {
                            loading ? <Loading/> : <></>
                        }
                    </> : 
                    <></>
                }
            </>
        } down = {
            <HomeButton onClick = {handleGoHome}/>
        }/>
    );
};

export default RecordingContainer;