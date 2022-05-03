import React from 'react';
import './style.css';

const Pagination = ({activePage, setActivePage, totalPages}) => {

    const pages = new Array(totalPages).fill('');

    return (
        <div className={'d-flex gap-5 justify-content-between align-items-center'}>
            <div className={'d-flex'}>
                {pages.map((p, i) =>
                    <button
                        className={(i + 1) === activePage ? 'd-flex justify-content-center page-number active' : 'page-number justify-content-center'}
                        key={i * 2}
                        onClick={() => {
                            setActivePage(i + 1)
                        }}
                    >{i + 1}</button>
                )}
            </div>
        </div>
    );
};

export default Pagination;