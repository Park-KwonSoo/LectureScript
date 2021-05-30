import React from 'react';
import styled from 'styled-components';

import microphone_blue from '../../icons/microphone_blue.png';
import microphone_purple from '../../icons/microphone_purple.png';

import recording_blue from '../../icons/recording_blue.png';
import recording_purple from '../../icons/recording_purple.png';

const Positional = styled.div `
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;

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

    margin : 3rem 3rem;

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

    margin : 3rem 3rem;

    height : 20rem;
    width : 20rem;

    &:hover {
        background : url(${recording_purple});
        background-size : cover;
    };
`;

const RecordingComponent = ({onClick, image}) => {
    return (
        <Positional>
            <Wrapper>
                {
                    image === 'recording' ?
                    <RecordingOffButton onClick = {onClick}/>
                    :
                    <RecordingOnButton onClick = {onClick}/>
                }
            </Wrapper>
        </Positional>
    );
};

export default RecordingComponent;
