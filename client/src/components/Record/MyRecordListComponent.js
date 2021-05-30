import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Wrapper = styled.div `
    display : flex;
    flex-direction : column;

    border : 1px solid ${oc.indigo[3]};
    border-radius : 3px;
`;

const Header = styled.div `
    background : ${oc.indigo[3]};
    color : white;

    font-family : 'Jua';
    font-size : 2.4rem;

    padding : .5rem 10rem;

    display : flex;
    align-items : center;
    justify-content : center;
`;

const ListWrapper = styled.div `
    padding : 2rem 2rem;
    height : 20rem;

    display : flex;
    flex-direction : column;
`;

const ListHead = styled.div `
    display : flex;
    justify-content : space-between;

    color : ${oc.indigo[4]};
    margin-bottom : 1rem;
`;

const ListLink = styled(Link) `
    margin-bottm : 1rem;
    text-decoration : none;

    font-size : 1rem;
    color : ${oc.indigo[7]};

    display : flex;
    justify-content : space-between;
    align-items : center;

    transition : .25s all;
    &:hover {
        background : ${oc.indigo[4]};
        color : white;
    }
`;

const ListItem = styled.div `
    margin-left : 1rem;
    margin : .3rem .5rem;
`;

const Pagination = styled.div `
    display : flex;
    align-items : center;
    justify-content : center;
    margin-bottom : 2rem;
`;

const MyRecordListComponent = ({children, pagination}) => {
    return (
        <Wrapper>
            <Header>내 기록들</Header>
            <ListWrapper>
                <ListHead>
                    <ListItem>고유 번호</ListItem>
                    <ListItem>강의명</ListItem>
                    <ListItem>강의자</ListItem>
                    <ListItem>생성일</ListItem>
                </ListHead>
                {
                    children.map(record => {
                        return (
                            <ListLink to = {'auth/' + record.id} key = {record.id}>
                                <ListItem>{record.id}</ListItem>
                                <ListItem>{record.title}</ListItem>
                                <ListItem>{record.professor}</ListItem>
                                <ListItem>{record.createdDate.slice(0, 10)}</ListItem>
                            </ListLink>
                        )
                    })
                }       
            </ListWrapper>
            <Pagination>{pagination}</Pagination>
        </Wrapper>
    )
};

export default MyRecordListComponent;

