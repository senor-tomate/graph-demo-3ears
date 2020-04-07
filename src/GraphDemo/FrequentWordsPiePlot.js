// PiePlot.js 

import React from 'react'
import Container from './Container';
import Plot from 'react-plotly.js';

import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MASTER_DB from '../../data/_lemma_MASTER3.json';

export default 
class PiePlotDemo extends Container
{
    /**
     * @brief Constructor.
     * 
     * @param {*} props.db - Database, can be null.
     * @param {*} props.knownWords - Array of known word strings. Not copied into object.
     */
    constructor(props)
    {
        super(props);
        
        if (props.db != null) 
            this.db = JSON.parse(JSON.stringify(props.db));
        else
            this.db = JSON.parse(JSON.stringify(MASTER_DB));
        this.wordCount = this.db.length;

        this.knownWords = props.knownWords;
        for (let i = 0; i < this.wordCount; ++i) {
            if ( !this.knownWords.includes(this.db[i].lemma) ) {
                this.db[i]["known"] = false;
            }
            else {
                this.db[i]["known"] = true;
            }
        }   

        this.state = {
            range: [0, 100],       // Range of words to show.
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

    /**
     * @brief Returns graph data according to settings set in this object.
     * 
     * Generally used only with @code this.graphData=this.getGraphData(); @endcode
     */
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
        console.log(this.state.range);
        let range = [this.sliderScaleFunction(this.state.range[0]), 
                     this.sliderScaleFunction(this.state.range[1])
                    ];
        console.log(range);
        console.log(this.wordCount);
        for (const entry of this.db) {
            // If not in selected range
            if (!(entry.rank>=range[0] && entry.rank<=range[1])) {
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

    /**
     * @brief Scaler function for slider.
     * @param {*} x - integers to scale.
     */
    sliderScaleFunction(x)
    {
        let ret = Math.floor(this.wordCount ** Math.pow(x/100.0, 2/5));
        return ret;
    }

    /**
     * @brief Returns size of graph according to window size.
     * 
     * Should be changed later to accomodate for css and such.
     */
    getGraphSize()
    {
        return (window.innerWidth <= window.innerHeight) ? 
        window.innerWidth-30 : window.innerHeight-30;
    }

    /**
     * @brief Callback to change size of component.
     * 
     * @param {*} ev 
     */
    handleGraphSizeChange(ev)
    {
        this.setState( { graphDims: this.getGraphSize() } );
    }

    /**
     * @brief Callback to change target word range according to slider.
     * 
     * @param {*} event  - ???
     * @param {*} newVal - Array with 2 integers, low then high.
     */
    handleSliderChange(event, newVal)
    {
        this.setState( { range: newVal } );
        this.setState( { graphData: this.getGraphData() } );
    }

    /**
     * @brief Callback to switch word types on or off according to switches.
     * 
     * @param {*} event   - ???
     * @param {*} checked - Boolean to signify whether word type is turned on.
     * @param {*} type    - Word type to turn on or off.
     */
    handleSwitchChange(event, checked, type)
    {
        // console.log("SWITCH STATE @ " + type + " changed to " + checked);
        this.state[type] = checked;
        console.log(this.state);
        this.setState( { graphData: this.getGraphData() } );
    }

    /**
     * @brief Return html for the switch rendering.
     */
    switches()
    {
        let state = this.state;
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox 
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
                        <Checkbox
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
                        <Checkbox 
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
                        <Checkbox 
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
                        <Checkbox 
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
                        <Checkbox 
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
                        <Checkbox 
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
                        <Checkbox 
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
                        <Checkbox 
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
                        <Checkbox 
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

    /**
     * @brief Renders component.
     */
    render()
    {
        console.log(this.state.range);
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
                <div className='Slider'>
                    <Slider 
                        min={0}
                        max={100}
                        scale={ (disp) => this.sliderScaleFunction(disp) }
                        value={this.state.range} 
                        onChange= { (event, newVal) => this.handleSliderChange(event, newVal) } 
                        valueLabelDisplay="on"
                    />
                </div>
                <div className='Switches'>
                    { this.switches() }
                </div>
            </div>
        );
    }

};