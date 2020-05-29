// FrequentWordsPiePlot.js
// Logic container for the Most Frequent Known Words graph.
// This is the class that should be added to 3ears graph page.

import React from 'react'
import axios from 'axios'

// import './FrequentWordsPiePlot.css';
import FrequentWordsCard from './FrequentWordsCard';

let SLIDER_SCALE_BASE   = 1.0/2.25;

export default
class FrequentWordsPiePlot
extends React.Component
{

    /**
     * @param props must contain user_id for user's words.
     */
    constructor(props)
    {
        super(props)
        this.uid = props.user_id;
        this.wordRange = []

        this.state = {
            data: {},
            maxWordAmount: -1
        }

        this.calibrateSliders();
        this.fetchData();
    }

    calibrateSliders()
    {
        const params = {
            "user_id": this.uid,
            "q[language_code]": 'ru'
        };

        let ret = axios.get(
            'https://itl.3ears.com/api/learner_data/frequent_words/statistic',
            { params: params } 
        ).then( ({ data }) => {
            let maxCount=0;
            for (let key in data) {
                maxCount += data[key];
            }
            // console.log("GRAPH MAX WORD AMOUNT FETCHED");
            this.setState({maxWordAmount: maxCount});
        });
    }

    fetchData()
    {
        const params = {
            "user_id": this.uid,
            "q[language_code]": 'ru',
            "q[rank_gteq]": this.wordRange[0],
            "q[rank_lteq]": this.wordRange[1]
        };
        axios.get(
            'https://itl.3ears.com/api/learner_data/frequent_words/statistic',
            { params: params } 
        ).then( ({ data }) => {
            // console.log("GRAPH DATA FETCHED");
            this.setState({data: data});
        });
    }

    parseData(data)
    {
        // These are the word types returned from the request.
        // I honestly dont like this appraoch of just writing them out like
        // this, but oh well.
        let ret = {
            'adj':      null,
            'noun':     null,
            'verb':     null,
            'pron':     null,
            'adjpron':  null,
            'prep':     null,
            'adv':      null,
            'ord':      null,
            'card':     null,
            'misc':     null
        };

        const wordTypeDict = {
            'adj':     "Adjectives",
            'noun':    "Nouns",
            'verb':    "Verbs",
            'pron':    "Pronouns",
            'adjpron': "Adjective Pronouns",
            'prep':    "Prepositions",
            'adv':     "Adverbs",
            'ord':     "Ordinals",
            'card':    "Cardinals",
            'misc':    "Miscellaneous Words"
        }

        for (let item in data) {
            let label   = "";
            let unknown = false;
            if (item.substring(0, 1)=='u')
                unknown=true;

            let type = ! unknown ? item : item.substr(1);
            label += wordTypeDict[type];
            
            if (ret[type] == null) {
                ret[type] = {
                    wordType: label,
                    counts: [-1, -1]
                }
            }
            if (!unknown)
                ret[type]['counts'][0] = data[item];
            else
                ret[type]['counts'][1] = data[item];
        }
        return ret;
    }

    scaleFunction(num) {
        let ret = Math.floor(this.state.maxWordAmount**Math.pow(num, SLIDER_SCALE_BASE));
        return ret;
    }

    // Values: [] with low and high (0-1 range)
    handleSliderChange(values)
    {
        this.wordRange[0] = this.scaleFunction(values[0]);
        this.wordRange[1] = this.scaleFunction(values[1]);
        this.fetchData();
    }

    render()
    {
        return <FrequentWordsCard 
                    data={this.parseData(this.state.data)}
                    onSliderChange={(values)=>this.handleSliderChange(values)}
                    scaleFunction={(num) => this.scaleFunction(num)}
                />
    }
}