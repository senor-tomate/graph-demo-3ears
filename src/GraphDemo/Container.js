// Container.js

import React from 'react';
import Plot  from 'react-plotly.js';

export default
class Container extends React.Component
{
    constructor(props)
    {
        super(props)
        this.id = props.id;
        this.db = props.db;
        // this.dbLink = (db!=null) ?
        //               new SQL.Da
        // this.wordCount = 
        this.wordCount = 1000
    }

    render()
    {
        const mystyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"
        };

        return (
            <div className='GraphDemoContainer' id={this.id}>
                <h1 style={mystyle}>
                    This Container is empty... :/
                </h1>
            </div>
        );
    }
};