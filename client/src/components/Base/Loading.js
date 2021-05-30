import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
    return(
        <Loader
            type = 'Bars'
            color = "#91a7ff"
            height = {80}
            width = {80}
        />
    );
};

export default Loading;