// index.js

import React from 'react';
import {render} from 'react-dom';

function Hello() {
    return <h1>HELLO</h1>
}

render(<Hello></Hello>, document.getElementById('container'));