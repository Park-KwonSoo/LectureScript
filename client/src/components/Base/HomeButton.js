import React from 'react';
import styled from 'styled-components';

import home_blue from '../../icons/home_blue.png';
import home_purple from '../../icons/home_purple.png';

const Wrapper = styled.div `
    flex-direction : column;
    align-self : center;
`;

const Button = styled.button `
    background : url(${home_blue});
    background-size : cover;

    border : transparent;
    cursor : pointer;

    width : 70px;
    height : 70px;

    transition : .25s all;

    margin-left : 1rem;
    margin-bottom : 1rem;


    &:hover {
        background : url(${home_purple});
        background-size : cover;
    }
`;

const HomeButton = ({onClick}) => {
    return (
        <Wrapper>
            <Button onClick = {onClick}></Button>
        </Wrapper>
    );
};

export default HomeButton;