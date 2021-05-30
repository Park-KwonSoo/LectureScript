import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Positional = styled.div `
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);

    border : 3px solid ${oc.indigo[3]};
    border-radius : 3px;
`;

const Wrapper = styled.div `
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    padding : 1rem 3rem;
`;

const RegisterHeader = styled.div `
    background : ${oc.indigo[3]};

    border : transparent;

    font-family : 'Jua';
    font-size : 2.4rem;

    color : white;

    display : flex;
    justify-content : center;
    align-items : center;

    padding : .5rem 3rem;
`;

const InputId = styled.input.attrs({
    type : 'email',
    name : 'email',
    placeholder : 'Email'
}) `
    font-family : 'Jua';
    font-size : 1.3rem;

    border-radius : 3px;
    border : 2px solid ${oc.indigo[3]};

    margin : 1rem 0;

    padding : .5rem 1rem;

    color : ${oc.indigo[3]};

    ::placeholder {
        color : ${oc.gray[3]};
        font-size : 1.2rem;
    }

`;

const InputName = styled.input.attrs({
    name : 'name',
    placeholder : 'Name'
}) `
    font-family : 'Jua';
    font-size : 1.3rem;

    border-radius : 3px;
    border : 2px solid ${oc.indigo[3]};

    margin : 1rem 0;

    padding : .5rem 1rem;

    color : ${oc.indigo[3]};

    ::placeholder {
        color : ${oc.gray[3]};
        font-size : 1.2rem;
    }

`;

const InputPw = styled.input.attrs({
    type : 'password'
}) `
    font-family : 'Jua';
    font-size : 1.3rem;

    border-radius : 3px;
    border : 2px solid ${oc.indigo[3]};

    margin : 1rem 0;

    padding : .5rem 1rem;

    color : ${oc.indigo[3]};

    ::placeholder {
        color : ${oc.gray[3]};
        font-size : 1.2rem;
    }
`;

const ButtonWrapper = styled.div `
    display : flex;
    align-items : center;
    justify-content : center;
    margin : 1rem 0;
`;

const ButtonRegister = styled.button `
    border : transparent;
    border-radius : 3px;

    padding : .5rem 2rem;
    margin : 0rem .5rem;

    cursor : not-allowed;

    background : ${oc.gray[3]};

    font-family : 'Jua';
    font-size : 1.3rem;
    color : white;

    transition : .25s all;

    :not(:disabled) {
        cursor : pointer;
        background : ${oc.indigo[3]};
        &:hover {
            background : ${oc.indigo[4]};
        }
    }
`;

const CancelButton = styled.button `
    background : ${oc.indigo[3]};
    color : white;
    
    font-family : 'Jua';
    font-size : 1.3rem;

    cursor : pointer;

    border : transparent;
    border-radius : 3px;

    padding : .5rem 2rem;
    margin : 0 .5rem;

    transition : .25s all;

    &:hover {
        background : ${oc.indigo[4]};
    }
`;

const RegisterComponent = ({disabled, onChange, onClick, cancel}) => {
    return (
        <Positional>
            <RegisterHeader>Register</RegisterHeader>
            <Wrapper>
                <InputId onChange = {onChange}/>
                <InputName onChange = {onChange}/>
                <InputPw name = 'password' placeholder = 'Password' onChange = {onChange}/>
                <InputPw name = 'passwordConfirm' placeholder = 'Password Confirm' onChange = {onChange}/>
                <ButtonWrapper>
                    <ButtonRegister disabled = {disabled} onClick = {onClick}>회원 가입</ButtonRegister>
                    <CancelButton onClick = {cancel}>취소</CancelButton>
                </ButtonWrapper>
            </Wrapper>
        </Positional>
    )
};

export default RegisterComponent;