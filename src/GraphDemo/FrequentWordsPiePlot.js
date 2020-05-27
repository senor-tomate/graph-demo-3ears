// FrequentWordsPiePlot.js
// Logic container for the Most Frequent Known Words graph.
// This is the class that should be added to 3ears graph page.

import React from 'react'
import axios from 'axios'

// import './FrequentWordsPiePlot.css';
import FrequentWordsCard from './FrequentWordsCard';

let SLIDER_SCALE_BASE   = 1.0/2.5;

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
        this.maxWordAmount=-1;
        this.wordRange = []

        this.state = {
            data: {},
        }

        this.fetchData();
        this.calibrateSliders();
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
            this.maxWordAmount=maxCount;
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
            // console.log("DATA FETCHED");
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
            'adj':      "Adjectives",
            'noun':     "Nouns",
            'verb':     "Verbs",
            'pron':     "Pronouns",
            'adjpron':  "Adjective Pronouns",
            'prep':     "Prepositions",
            'adv':      "Adverbs",
            'ord':      "Ordinals",
            'card':     "Cardinals",
            'misc':     "Misclaneous Words"
        }

        for (let item in data) {
            let label   = "";
            let unknown = false;
            if (item.substring(0, 1)=='u')
                unknown=true;

            let type = ! unknown ? item : item.substr(1);
            label += wordTypeDict[type];
            
            // console.log("ret[type]=" + ret[type])
            // console.log(ret[type]);
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

    // Values: [] with low and high (0-1 range)
    handleSliderChange(values)
    {
        let scaleFunction = (num) => 
            Math.floor(this.maxWordAmount**Math.pow(num, SLIDER_SCALE_BASE));

        this.wordRange[0] = scaleFunction(value[0]);
        this.wordRange[1] = scaleFunction(value[1]);
        this.fetchData();
    }

    render()
    {
        // console.log("PARENT RENDERING");
        // console.log(this.parseData(this.state.data));
        return <FrequentWordsCard 
                    data={this.parseData(this.state.data)}
                    onSliderChange={(values)=>this.handleSliderChange(values)}
                />
    }
}