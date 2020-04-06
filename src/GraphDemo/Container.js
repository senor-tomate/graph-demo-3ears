// Container.js

import React from 'react';

export default
class Container extends React.Component
{
    /**
     * @breif Constructor
     * @param {*} props.id - ID for this graph. 
     */
    constructor(props)
    {
        super(props)
        this.id = props.id;
        console.log(this.id);
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