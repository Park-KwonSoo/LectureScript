import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Wrapper = styled.div `
    background : ${oc.indigo[4]};
    height : 4rem;

    display : flex;
    align-items : center;
    justify-content : center;

    padding-left : 1rem;
    padding-right : 1rem;
`;
const LeftPosition = styled.div `
    flex : 1;
`;

const CenterPosition = styled.div `
    flex : 1;
`;

const RightPosition = styled.div `
    flex : 1;
`;

const PositionWrapper = styled.div `
    display : flex;
    align-items : center;
    justify-content : center;
`;


const Title = styled.div `
    font-size : 2.4rem;
    color : white;
`;

const Header = ({Left_Button, Right_left_Button, Right_right_Button}) => {
    return (
        <Wrapper>
            <LeftPosition>
                {Left_Button}
            </LeftPosition>
            <CenterPosition>
                <PositionWrapper>
                    <Title>
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
