import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

import Modal from './Modal';

const Error = styled.div `
    color : ${oc.red[5]};
    font-size : 1.2rem;
`;

const ErrorComponent = ({open, children}) => {
    return (
        <Modal open = {open} header = "Error!">
            <Error>
                {children}
            </Error>
        </Modal>
    )
};

export default ErrorComponent;