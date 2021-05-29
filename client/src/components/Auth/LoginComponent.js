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

    padding : 3rem 3rem;
`;

const LoginHeader = styled.div `
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

const Input_Id = styled.input.attrs({
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

const Input_Pw = styled.input.attrs({
    type : 'password',
    name : 'password',
    placeholder : 'Password'
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

const Button_Login = styled.button `
    border : transparent;
    border-radius : 3px;

    padding : .5rem 3rem;
    margin : 1rem 0;

    cursor : pointer;


    font-family : 'Jua';
    font-size : 1.3rem;
    color : white;

    transition : .25s all;

    &:hover {
        background : white;
        color : ${oc.indigo[3]};
        border : 2px solid ${oc.indigo[3]};
    }
`;

const LoginComponent = ({disabled, onChange, onClick}) => {
    return (
        <Positional>
            <LoginHeader>Login</LoginHeader>
            <Wrapper>
                <Input_Id onChange = {onChange}></Input_Id>
                <Input_Pw onChange = {onChange}></Input_Pw>
                <Button_Login disabled = {disabled} style = {disabled ? null : {background : `${oc.indigo[3]}`}} 
                    onClick = {onClick}>로그인</Button_Login>
            </Wrapper>
        </Positional>
    )
};

export default LoginComponent;