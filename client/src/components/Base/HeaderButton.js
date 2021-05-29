import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Button = styled.button `
    background : white;
    border : 1px white;
    border-radius : 3px;

    font-family : 'Jua';
    font-size : 1.3rem;

    padding : .2rem 1rem;
    margin-left : 1.5rem;

    cursor : pointer;

    transition : .25s all;

    &:hover {
        background : ${oc.indigo[4]};
        border : 1.2px solid white;
    }
`;

const HeaderButton = ({button_name, onClick}) => {
    return (
        <Button onClick = {onClick}>{button_name}</Button>
    );
};

export default HeaderButton;