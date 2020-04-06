// index.js

import React from 'react';
import {render} from 'react-dom';

import GraphDemo from './GraphDemo.js'

render(<GraphDemo />, document.getElementById('container'));

export {
    GraphDemo,
};