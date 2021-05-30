import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';


const Button = styled.button `
    border : transparent;
    border-radius : 3px;

    background : ${oc.indigo[3]};
    color : white;

    font-family : 'Jua';
    font-size : 1rem;
    margin : 0 .1rem;

    cursor : pointer;
    transition : .25s all;

    &:hover {
        background : ${oc.indigo[4]};
    }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumber = [];
    
    // Math.ceil: 올림
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumber.push(i);
    }
  
    return (
      <>
        {
            pageNumber.map((pageNum) => (
            <Button
                key={pageNum}
                onClick={() => paginate(pageNum)}
            > {pageNum} </Button>
            ))
        }
      </>
    );
  };
  
export default Pagination;