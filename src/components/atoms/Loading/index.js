import React from "react";
import { CircularProgress, } from '@material-ui/core';

const Loading = ({ isLoading, children }) => {
    return isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
            <CircularProgress />
        </div>
    ) : children;
};

export default Loading;