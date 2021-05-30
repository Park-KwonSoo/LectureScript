import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';


const Wrapper = styled.div `
    display : flex;
    flex-direction : column;

    border : 1px solid ${oc.indigo[3]};
`;

const Header = styled.div `
    background : ${oc.indigo[3]};
    display : flex;
    justify-content : center;
    align-items : center;

    font-family : 'Jua';
    font-size : 2.4rem;

    color : white;

    padding : .5rem 3rem;

`;

const Item = styled.div `
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;

    padding : 2rem 2rem;
`;

const CreatedDateWrapper = styled.div `
    font-size : 1rem;
    color : ${oc.indigo[7]};
`;

const CreatedDate = styled.div `
    font-size : 1rem;
    color : ${oc.indigo[4]};
    margin-bottom : 1rem;
`;

const Info = styled.div `
    font-family : 'Jua';
    font-size : 1rem;

    color : ${oc.indigo[7]};
    margin : 0;
`;

const View = styled.div `
    font-family : 'Jua';    
    font-size : 1.5rem;

    color : ${oc.indigo[3]};
    margin-bottom : 1rem;
`;

const Button = styled.button `
    background : ${oc.indigo[3]};
    border : transparent;
    border-radius : 4px;

    color : white;
    cursor : pointer;

    transition : .25s all;

    margin : 1rem 0;
    padding : .5rem 3rem;

    font-family : 'Jua';
    font-size : 1.5rem;

    &:hover {
        background : ${oc.indigo[4]};
    }
`;

const OneRecordingView = ({children, onClick}) => {
    return (
        <Wrapper>
            <Header>PDF 정보</Header>
            <Item>
                <CreatedDateWrapper>수업일</CreatedDateWrapper>
                <CreatedDate>{children.createdDate.slice(0, 10)}</CreatedDate>

                <Info>강의명</Info>
                <View>{children.title}</View>
                
                <Info>강의자</Info>
                <View>{children.professor}</View>

                <Button onClick = {onClick}>PDF 만들기</Button>
            </Item>
        </Wrapper>
    )
};

export default OneRecordingView;