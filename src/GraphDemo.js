// GraphDemo.js

import React from 'react';
import PiePlot from './GraphDemo/FrequentWordsPiePlot.js';
import FrequentWordsPiePlot from './GraphDemo/FrequentWordsPiePlot.js';

export default 
function GraphDemo()
{
    return (
        <FrequentWordsPiePlot user_id={6487} />
    );
}