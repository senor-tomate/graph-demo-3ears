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
            adj : true,
            adjpron: true,
            noun: true,
            verb: true,
            prep: true,
            pron: true,
            adv : true,
            ord : true,
            card: true,
            misc: true,
            graphDims: this.getGraphSize(),
            graphData: [], 
        }
        this.state.graphData = this.getGraphData();
        window.addEventListener('resize', (ev) => this.handleGraphSizeChange(ev) )
    }

    getGraphData()
    {
        let data = {adj: 0, uadj: 0,
                    adjpron: 0, uadjpron: 0,
                    noun: 0, unoun: 0,
                    verb: 0, uverb: 0,
                    prep: 0, uprep: 0,
                    pron: 0, upron: 0,
                    adv: 0 , uadv: 0,
                    ord: 0 , uord: 0,
                    card: 0, ucard: 0,
                    misc: 0, umisc: 0
        };
        for (const entry of this.db) {
            // console.log(entry);
            //If not in selected range
            if (!(entry.rank>=this.state.range[0] && entry.rank<=this.state.range[1])) {
                //console.log(entry.lemma + " out of range");
                continue;
            }
            switch (entry.wtype) {
                case 'adj':
                    if (!this.state.adj) continue;
                    if (entry.known) data.adj++;
                    else data.uadj++;
                    break;
                case 'adjpron':
                    if (!this.state.adjpron) continue;
                    if (entry.known) data.adjpron++;
                    else data.uadjpron++;
                    break;
                case 'noun':
                    if (!this.state.noun) continue;
                    if (entry.known) data.noun++;
                    else data.unoun++;
                    break;
                case 'verb':
                    if (!this.state.verb) continue;
                    if (entry.known) data.verb++;
                    else data.uverb++;
                    break;
                case 'prep':
                    if (!this.state.prep) continue;
                    if (entry.known) data.prep++;
                    else data.uprep++;
                    break;
                case 'pron':
                    if (!this.state.pron) continue;
                    if (entry.known) data.pron++;
                    else data.upron++;
                    break;
                case 'adv':
                    if (!this.state.adv) continue;
                    if (entry.known) data.adv++;
                    else data.uadv++;
                    break;
                case 'ord':
                    if (!this.state.ord) continue;
                    if (entry.known) data.ord++;
                    else data.uord++;
                    break;
                case 'card':
                    if (!this.state.card) continue;
                    if (entry.known) data.card++;
                    else data.ucard++;
                    break;
                case 'misc':
                    if (!this.state.misc) continue;
                    if (entry.known) data.misc++;
                    else data.umisc++;
                    break;
                default:
                    console.log("Invalid wtype found " + entry.wtype);
                    break;
            }
        }
        console.log(data);
        return data;
    }

    getGraphSize()
    {
        return (window.innerWidth <= window.innerHeight) ? 
        window.innerWidth-30 : window.innerHeight-30;
    }

    handleGraphSizeChange(ev)
    {
        this.setState( { graphDims: this.getGraphSize() } );
    }

    handleSliderChange(event, newVal)
    {
        this.setState( {range: newVal} );
        this.setState( { graphData: this.getGraphData() } );
    }

    handleSwitchChange(event, checked, type)
    {
        this.setState( { [type] : checked} );
        console.log(this.state);
        this.setState( { graphData: this.getGraphData() } );
    }

    // Stolen from [https://material-ui.com/components/switches/] 
    // (Switch with FormControlLabel)
    switches()
    {
        let state = this.state;
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.adj} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'adj') 
                            } 
                            color='primary'
                        />
                    }
                    label="Adjectives"
                />
                <FormControlLabel
                    control={
                        <Switch
                        checked={state.adjpron}
                        onChange={ (event, newCheck) => 
                            this.handleSwitchChange(event, newCheck, 'adjpron')
                        }
                        color='primary'
                        />
                    }
                    label="Adjective Pronouns"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.noun} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'noun') 
                            } 
                            color='primary'
                        />
                    }
                    label="Nouns"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.verb} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'verb') 
                            } 
                            color='primary'
                        />
                    }
                    label="Verbs"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.pron} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'pron') 
                            } 
                            color='primary'
                        />
                    }
                    label="Pronouns"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.prep} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'prep') 
                            } 
                            color='primary'
                        />
                    }
                    label="Prepositions"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.misc} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'misc') 
                            } 
                            color='primary'
                        />
                    }
                    label="Other"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.adv} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'adv') 
                            } 
                            color='primary'
                        />
                    }
                    label="Adverb"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.ord} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'ord') 
                            } 
                            color='primary'
                        />
                    }
                    label="Ordinal"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={state.card} 
                            onChange={ (event, newCheck) => 
                                    this.handleSwitchChange(event, newCheck, 'card') 
                            } 
                            color='primary'
                        />
                    }
                    label="Cardinal"
                />
            </FormGroup>
        );
    }

    render()
    {
        let colors = [
            '#f04060', '#f0a040', '#e0e030', '#30e040', '#30e0e0', '#3040e0', '#b030e0',
            '#f3647e', '#f3b264', '#efef96', '#96ef9e', '#96efef', '#969eef', '#d796ef'
        ];
        let gd = this.state.graphData;
        let data = [{
            labels: ["Adjectives", "Nouns", "Verbs", "Pronouns", "Adjective Pronouns", "Prepositions", 
                     "Adverbs", "Ordinals", "Cardinals", "Other", "Unknown Adjectives", "Unknown Nouns", "Unknown Verbs", 
                     "Unknown Pronouns", "Unknown Adjective Pronouns", "Unknown Prepositions", 
                     "Unknown Adverbs", "Unknown Ordinals", "Unknown Cardinals", "Unknown Other"],
            values: [gd.adj, gd.noun, gd.verb, gd.pron, gd.adjpron, gd.prep, gd.adv, gd.ord, gd.card, gd.misc, gd.uadj, gd.unoun, gd.uverb, gd.upron, gd.uadjpron, gd.uprep, gd.uadv, gd.uord, gd.ucard, gd.umisc],
            type: 'pie',
            textinfo: 'label+precent',
            textposition: "inside",
            automargin: true,
            marker: {
                colors: colors
            },
        }];
        
        let GraphLayout = {
            width: this.state.graphDims,
            height: this.state.graphDims,
            title: 'The Words',
            showlegend: false,
        }
        return ( 
            <div className='PiePlot'>
                <Plot
                    data = {data}
                    layout={GraphLayout}
                />
                <div style={styles.slider} className='Slider'>
                    <Slider 
                        min={1}
                        max={this.wordCount}
                        value={this.state.range} 
                        onChange= { (event, newVal) => this.handleSliderChange(event, newVal) } 
                        valueLabelDisplay="on"
                    />
                </div>
                <div style={styles.switch} className='Switches'>
                    { this.switches() }
                </div>
            </div>
        );
    }

};