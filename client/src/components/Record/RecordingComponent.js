import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import { useStopwatch } from 'react-timer-hook';

import microphone_blue from '../../icons/microphone_blue.png';
import microphone_purple from '../../icons/microphone_purple.png';

import recording_blue from '../../icons/recording_blue.png';
import recording_purple from '../../icons/recording_purple.png';


const Wrapper = styled.div `
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

const RecordingOnButton = styled.button `
    background : url(${microphone_blue});
    background-size : cover;

    border : transparent;
    cursor : pointer;

    transition : .25s all;

    margin : 1.5rem 3rem;

    height : 20rem;
    width : 20rem;

    &:hover {
        background : url(${microphone_purple});
        background-size : cover;
    };
`;

const RecordingOffButton = styled.button `
    background : url(${recording_blue});
    background-size : cover;

    border : transparent;
    cursor : pointer;

    transition : .25s all;

    margin : 1.5rem 3rem;

    height : 20rem;
    width : 20rem;

    &:hover {
        background : url(${recording_purple});
        background-size : cover;
    };
`;

const StopWatchWrapper = styled.div `
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`;

const Recording = styled.div `
    font-family : 'Jua'
    font-size : 1.5rem;
    color : ${oc.indigo[4]};
`;

const StopWatchDiv = styled.div `
    font-family : 'Jua';
    font-size : 2rem;
    color : ${oc.indigo[4]};

    transition : .25s all;
`;

const Stopwatch = () => {
    let {
        seconds,
        minutes,
        hours
    } = useStopwatch({ autoStart : true });

    if(parseInt(seconds) < 10)
        seconds = '0' + seconds;

    if(parseInt(minutes) < 10)
        minutes = '0' + minutes;
    
    if(parseInt(hours) < 10)
        hours = '0' + hours;
    

    return (
       <StopWatchWrapper>
           <Recording>녹음 중</Recording>
           <StopWatchDiv>{hours} : {minutes} : {seconds}</StopWatchDiv>
       </StopWatchWrapper>
    )
};

const RecordingComponent = ({onClick, image}) => {
    return (
        <Wrapper>
            {
                image === 'recording' ?
                <>
                    <RecordingOffButton onClick = {onClick}/>
                    <Stopwatch/>
                </> :
                <RecordingOnButton onClick = {onClick}/>
            }
        </Wrapper>
    );
};

export default RecordingComponent;
