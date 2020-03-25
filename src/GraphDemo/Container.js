// Container.js

import React from 'react';

export default
class Container extends React.Component
{
    constructor(props)
    {
        super(props)
        this.id = props.id;
        this.db = props.db;
        this.wordCount = (this.db == null) ? 0 : Object.keys(this.db).length;
        console.log(this.wordCount);
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