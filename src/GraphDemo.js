// GraphDemo.js

import React from 'react';
import GraphContainer from './GraphDemo/Container.js'
import PiePlot from './GraphDemo/PiePlot.js';

import MASTER from '../_lemma_MASTER.json'

// export default
// class GraphDemo extends React.Component
// {
//     render()
//     {
//         return (
//             <div class='GraphDemo'>
//                 <GraphContainer db={null} id='0'/>
//                 <PiePlotDemo db='' id='1'/>
//             </div>
//         );
//     }
// };

export default 
function GraphDemo()
{
    return (
        <div className='GraphDemo'>
            <GraphContainer db={null} id='0'/>
            <PiePlot db={MASTER} id='1'/>
        </div>
    );
}