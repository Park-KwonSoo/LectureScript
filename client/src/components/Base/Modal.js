import React from 'react';
import styled from 'styled-components';

import '../../lib/modal.css';

const Header = styled.header `
    display : flex;
    justify-content : center;
    align-items : center;

    padding : .5rem 0;

    font-size : 2rem;

    color : white;
`;

const Main = styled.main `
    display : flex;
    justify-content : center;
    align-items : center;
`;


const Modal = ({open, header, children}) => {
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <Header>
                        {header}
                    </Header>
                    <Main>
                        {children}
                    </Main>
                    <footer>

                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;