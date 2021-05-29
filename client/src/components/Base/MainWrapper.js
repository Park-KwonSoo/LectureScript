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
    flex : 1
`;

const Up = styled.div `
    flex : 1;
`;

const Center = styled.div `
    flex : 1;
`;

const Down = styled.div `
    flex : 1;
`;

const MainWrapper = ({up, center, down}) => {
    return (
        <Positioner>
            <Wrapper>
                <Up>{up}</Up>
                <Center>{center}</Center>
                <Down>{down}</Down>
            </Wrapper>
        </Positioner>
    );
};

export default MainWrapper;