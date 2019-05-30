import React from 'react';
import PaginatorItem from './PaginatorItem.jsx';

export default (props) => {
  const paginatorItems = [
    <PaginatorItem onClick={props.onPageLinkClick} key="previous" text="Previous" pageNum={ +props.pageNum - 1 } disabled={ +props.pageNum === 1 }/>,
    <PaginatorItem onClick={props.onPageLinkClick} key="1" text="1" pageNum={1} active={ +props.pageNum === 1 } />
  ];

  const totalPages = Math.ceil( props.totalItemsLength / props.itemsPerPage);
  
  if (totalPages !== 1) {

    const pageNums = [];

    if (totalPages > props.maxPageLinks) {
      let leftSideLength = (props.maxPageLinks - 2) / 2;
      let rightSideLength = leftSideLength;

      if ( isFloat(leftSideLength) ) {
        rightSideLength = Math.ceil(rightSideLength);
        leftSideLength = rightSideLength - 1;
      }

      for (let i = leftSideLength; i >= 0; i--) {
        const leftSidePage = +props.pageNum - i;

        if (leftSidePage > 1 && leftSidePage < totalPages) {
          pageNums.push(leftSidePage);
        }
      }

      for (let i = 1; i < rightSideLength; i++) {
        const rightSidePage = +props.pageNum + i;

        if (rightSidePage < totalPages) {
          pageNums.push(rightSidePage);
        }
      }

    } else {

      for (let i = 2; i < totalPages; i++) {
        pageNums.push(i)
      }
    
    }

    pageNums.forEach((num) => {
      paginatorItems.push(
        <PaginatorItem onClick={props.onPageLinkClick} key={num} text={num} pageNum={num} active={ +props.pageNum === num } />
      );
    })


    paginatorItems.push(
      <PaginatorItem onClick={props.onPageLinkClick} key={totalPages} text={totalPages} pageNum={totalPages } active={ +props.pageNum === totalPages } />
    )
  
  }

  paginatorItems.push(
    <PaginatorItem onClick={props.onPageLinkClick} key="next" text="Next" pageNum={ +props.pageNum + 1 } disabled={ +props.pageNum === totalPages } />
  );

  return (
    <ul className="pagination">
      {paginatorItems}
    </ul>
  );
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}
