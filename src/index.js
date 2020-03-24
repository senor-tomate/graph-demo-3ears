// index.js

import React from 'react';
import {render} from 'react-dom';

import { DemoClass, Clock } from './DemoClass.js'

function Hello()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(today)
    return <p>{date+'\n'+time}</p>;
}

render(<Clock />, document.getElementById('container'));