import '../css/Pagination.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Pagination(props) {
    const pageClick = (page) => {
        props.setCurrentPage(page);
    }

    const prevPage = () => {
        const { currentPage } = props;
        const prevPage = currentPage - 1;
        if (prevPage < 1) {
            return;
        }
        props.setCurrentPage(prevPage);
    }

    const nextPage = () => {
        const { currentPage, total, boardPerPage } = props;
        const nextPage = currentPage + 1;
        const endPage = Math.ceil(total / boardPerPage);
        if (nextPage > endPage) {
            return;
        }
        props.setCurrentPage(nextPage);
    }


    const { total, boardPerPage, currentPage } = props;
    const endPage = Math.ceil(total / boardPerPage);

    let pageNumbers = []
    for (var i = 1; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const pageMap = pageNumbers.map(
        // (page) => (<span id='page' onClick={pageClick(page)}>{page}</span>) 이렇게 하면 클릭을 안 해도 함수가 실행이 됨.
        (page) => (<span className={`page ${currentPage === page ? 'active' : ''}`} onClick={() => pageClick(page)}>{page}</span>) // 이렇게 함수를 정의해주면 클릭 했을 때 정상적으로 함수가 실행이 됨.
    )

    return (
        <div class="pagination">
            <span class='page' onClick={prevPage}>&lt;</span>
            {pageMap}
            <span class='page' onClick={nextPage}>&gt;</span>
        </div>
    )

}

export default Pagination;