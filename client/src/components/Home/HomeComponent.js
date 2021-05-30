import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

import lecture from '../../icons/lecture.png';


const Wrapper = styled.div `
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

const MainImage = styled.div `
    background : url(${lecture});
    background-size : cover;

    height : 20rem;
    width : 20rem;
`;

const MainExplain = styled.div ` 
    margin : 1rem 0;
    font-size : 1.2rem;
    color : ${oc.indigo[5]};
`;

const StartButton = styled.button `
    font-family : 'Jua';
    font-size : 1.5rem;
    padding : .5rem 4rem;

    background : ${oc.indigo[3]};
    border : transparent;
    border-radius : 4px;

    color : white;
    cursor : pointer;

    transition : .25s all;

    &:hover {
        background : ${oc.indigo[4]};
    }
`;

const HomeComponent = ({onClick}) => {
    return (
        <Wrapper>
            <MainImage/>
            <MainExplain>
                교수님의 강의를 대본으로 만들어주는, Lecture Script입니다!<br/>
                로그인해서 강의를 관리하고, 사용해보세요.
            </MainExplain>
            <StartButton onClick = {onClick}>로그인해서 시작하기</StartButton>
        </Wrapper>
    )
};

export default HomeComponent;