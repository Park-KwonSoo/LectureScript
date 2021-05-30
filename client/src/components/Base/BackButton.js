import React from 'react';
import styled from 'styled-components';

import previous_blue from '../../icons/previous_blue.png';
import previous_purple from '../../icons/previous_purple.png';

const Button = styled.button `
    transition : .25s all;
    cursor : pointer;

    background : url(${previous_blue});
    background-size : cover;

    border : transparent;

    height : 3rem;
    width : 3rem;

    &:hover {
        background : url(${previous_purple});
        background-size : cover;
    }
`;

const BackButton = ({onClick}) => {
    return (
        <Button onClick = {onClick}/>
    )
};

export default BackButton;