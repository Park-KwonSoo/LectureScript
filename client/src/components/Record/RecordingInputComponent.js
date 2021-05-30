import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';


const Wrapper = styled.div `
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

const Input = styled.input `
    font-family : 'Jua';
    font-size : 1.2rem;

    border-radius : 3px;
    border : 2px solid ${oc.indigo[3]};

    margin-bottom : .5rem;

    padding : .5rem 1rem;

    color : ${oc.indigo[3]};

    ::placeholder {
        color : ${oc.gray[3]};
        font-size : 1.2rem;
    }
`;

const Button = styled.button `
    border : transparent;
    border-radius : 3px;

    cursor : not-allowed;

    background : ${oc.gray[3]};
    color : white;

    font-family : 'Jua';
    font-size : 1.3rem;

    padding : .5rem 4rem;

    transition : .25s all;

    :not(:disabled) {
        cursor : pointer;
        background : ${oc.indigo[3]};
        &:hover {
            background : ${oc.indigo[4]};
        }
    }
`;


const RecordingInputComponent = ({onChange, onClick, disabled}) => {
    return (
        <Wrapper>
            <Input name = 'title' placeholder = '강의명' onChange = {onChange}/>
            <Input name = 'professor' placeholder = '강의자' onChange = {onChange}/>
            <Button onClick = {onClick} disabled = {disabled}>PDF로 만들기</Button>
        </Wrapper>
    );
};

export default RecordingInputComponent;