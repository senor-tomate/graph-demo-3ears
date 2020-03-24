// PiePlot.js 

import React from 'react'
import Container from './Container';
import Plot from 'react-plotly.js';

import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
    switch: {
        padding: '0 30px',
    },
    slider: {
        padding: "30px"
    }
};

export default 
class PiePlotDemo extends Container
{
    constructor(props)
    {
        super(props);
        this.state = {
            range: [1, this.wordCount],       // Range of words to show.
            switches: {
                adj: true,
                num: true,
                nouns: true,
                verbs: true,
                preps: true,
                prons: true,
                other: true
            }
        }
    }

    handleSliderChange(event, newVal)
    {
        this.setState( {range: newVal} );
    }

    showSwitches()
    {
        switches = this.state.switches;
        for (var key in switches) {
            // check if the property/key is defined in the object itself, not in parent
            if (switches.hasOwnProperty(key)) {           
                
            }
        }
        return <h1>SHIT</h1>
    }

    render()
    {
        console.log(this.state);
        return (
            <div className='PiePlot'>
                <div style={styles.slider}>
                    <Slider 
                        min={1}
                        max={this.wordCount}
                        value={this.state.range} 
                        onChange= { (event, newVal) => this.handleSliderChange(event, newVal) } 
                        valueLabelDisplay="on"
                    />
                </div>
                {/* <div style={styles.switch}>
                    { this.showSwitches() }
                </div> */}
                
            </div>
        );
    }

};