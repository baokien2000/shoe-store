import React from 'react';

const NotFound = ({ Title }) => {
    return (
        <div className='NotFound'>
            <p>{Title}</p>
            <img src='./images/NotFound.png' alt='NotFound.png' />
        </div>
    );
};

export default NotFound;