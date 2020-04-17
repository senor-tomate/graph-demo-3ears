// GraphDemo.js

import React from 'react';
import PiePlot from './GraphDemo/FrequentWordsPiePlot.js';

export default 
function GraphDemo()
{
    return (
        <div className='GraphDemo'>
            {/* <GraphContainer db={null} id='0'/> */}
            {/* <PiePlot db={MASTER} knownWords={[]} id='0'/> */}
            <PiePlot 
                knownWords={['и', 'а', 'я', 'не', 'знаю', 'ничего']}
                id='1'
            />
            {/* <PiePlot db={MASTER} knownWords={[]} id='2'/> */}
        </div>
    );
}