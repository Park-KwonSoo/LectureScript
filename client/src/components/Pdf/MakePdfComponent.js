import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';


const Wrapper = styled.div `
    display : flex;
    flex-direction : column;

    align-items : center;
    justify-content : center;

    height : 20rem;
    padding : 3rem;

    transition : .25s all;
`;

const Title = styled.div `
    font-size : 2.4rem;
    color : ${oc.indigo[3]};

    display : flex;
    justify-content : center;
    align-items : center;

    margin-bottom : 1.5rem;
`;

const DateInput = styled.input.attrs({
    type : 'date',
    name : 'createdDate'
}) `
    border : 3px solid ${oc.indigo[3]};
    border-radius : 10px;

    height : 5rem;
    
    font-family : 'Jua';
    font-size : 2rem;

    cursor : pointer;
    color : black;

    transition : .5s all;

    &:hover {
        color : ${oc.indigo[3]};
    }

    margin-bottom : 1rem;
    padding : .5rem 3rem;
`;

const Button = styled.button `
    margin-top : 2rem;

    font-family : 'Jua';
    font-size : 1.5rem;

    border : transparent;
    border-radius : 4px;

    cursor : pointer;
    color : white;
    background : ${oc.indigo[3]};

    padding : .5rem 3rem;

    transition : .25s all;

    &:hover {
        background : ${oc.indigo[4]};
    }

`;

const LinkButton = styled.button `
    margin-top : 1rem;
    padding : .5rem 3rem;

    font-family : 'Jua';
    font-size : 1.5rem;

    border : transparent;
    border-radius : 4px;

    cursor : pointer;
    color : white;
    background : ${oc.indigo[3]};

    transition : .25s all;

    &:hover {
        background : ${oc.indigo[4]};
    }
`;

const MakePdfComponent = ({onChange, onClick, isLink, link}) => {
    return (
        <Wrapper>
            <Title>강의 날짜 선택</Title>
            <DateInput onChange = {onChange}/>
            {
                isLink ?
                <LinkButton onClick = {link}>다운로드</LinkButton> :
                <Button onClick = {onClick}>PDF 파일 생성</Button>
            }
        </Wrapper>
    )
};

export default MakePdfComponent;

