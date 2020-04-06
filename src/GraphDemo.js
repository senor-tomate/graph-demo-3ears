// GraphDemo.js

import React from 'react';
import GraphContainer from './GraphDemo/Container.js'
import PiePlot from './GraphDemo/FrequentWordsPiePlot.js';

import MASTER from '../data/_lemma_MASTER3.json'

export default 
function GraphDemo()
{
    return (
        <div className='GraphDemo'>
            {/* <GraphContainer db={null} id='0'/> */}
            <PiePlot db={MASTER} knownWords={[]} id='0'/>
            <PiePlot db={MASTER} 
                     knownWords={['и', 'а', 'я', 'не', 'знаю', 'ничего']}
                     id='1'/>
            <PiePlot db={MASTER} knownWords={[]} id='2'/>
        </div>
    );
}