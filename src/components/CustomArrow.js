import React from 'react';

const CustomArrow = ({ className, style, onClick }) => {
    return (
        <button className={className} style={{ ...style, display: 'block' }} onClick={onClick}>
            {className.includes('slick-prev') ? '<' : '>'}
        </button>
    );
};

export default CustomArrow;