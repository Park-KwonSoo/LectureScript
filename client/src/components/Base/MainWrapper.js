import React from 'react';
import styled from 'styled-components';

const Positioner = styled.div `
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);

    width : 100%;
`;

const Wrapper = styled.div `
    display : flex;
    flex-direction : column;
`;

const Position = styled.div `
    flex : 1;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const MainWrapper = ({up, center, down}) => {
    return (
        <Positioner>
            <Wrapper>
                <Position>{up}</Position>
                <Position>{center}</Position>
                <Position>{down}</Position>
            </Wrapper>
        </Positioner>
    );
};

export default MainWrapper;