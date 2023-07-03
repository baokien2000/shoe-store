import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <div style={{ width: "100%", height: "100vh ", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>
    );
};

export default Loading;