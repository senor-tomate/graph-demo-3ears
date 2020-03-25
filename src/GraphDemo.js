// GraphDemo.js

import React from 'react';
import GraphContainer from './GraphDemo/Container.js'
import PiePlot from './GraphDemo/PiePlot.js';

import MASTER from '../data/_lemma_MASTER.json'
import Top100 from '../data/_lemma_Top100.json'
import Text2  from '../data/_lemma_Text2.json'

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
            {/* <GraphContainer db={null} id='0'/> */}
            <PiePlot db={MASTER} id='1'/>
            <PiePlot db={Top100} id='1'/>
            <PiePlot db={Text2} id='1'/>
        </div>
    );
}