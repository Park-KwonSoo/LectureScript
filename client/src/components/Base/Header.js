import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Wrapper = styled.div `
    background : ${oc.indigo[4]};
    height : 4rem;

    display : flex;
    align-items : center;
    justify-content : center;
`;

const LeftPosition = styled.div `
    flex : 2;
    margin-left : 1rem;
`;

const CenterPosition = styled.div `
    flex : 3;
`;

const RightPosition = styled.div `
    flex : 2;
    margin-right : 1rem;
`;

const PositionWrapper = styled.div `
    display : flex;
    align-items : center;
    justify-content : center;
`;

const Title = styled.div `
    font-size : 2.4rem;
    color : white;

    transition : .25s all;

    &:hover {
        color : ${oc.gray[6]};
        cursor : pointer;
    }
`;

const Header = ({Left_Button, Right_left_Button, Right_right_Button, onClick}) => {
    return (
        <Wrapper>
            <LeftPosition>
                {Left_Button}
            </LeftPosition>
            <CenterPosition>
                <PositionWrapper>
                    <Title onClick = {onClick}>
                        Lecture Script
                    </Title>
                </PositionWrapper>
            </CenterPosition>
            <RightPosition>
                <PositionWrapper>
                    {Right_left_Button}
                    {Right_right_Button}
                </PositionWrapper>
            </RightPosition>
        </Wrapper>
    );
};

export default Header;
