import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
    return(
        <Loader
            type = 'Bars'
            color = "#91a7ff"
            height = {100}
            width = {100}
        />
    );
};

export default Loading;