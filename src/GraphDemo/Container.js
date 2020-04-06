// Container.js

import React from 'react';

export default
class Container extends React.Component
{
    constructor(props)
    {
        super(props)
        this.id = props.id;
        console.log(this.id);
        this.db = JSON.parse(JSON.stringify(props.db));
        // this.wordCount = (this.db == null) ? 0 : Object.keys(this.db).length;
        this.wordCount = (this.db == null) ? 0 : this.db.length;
        this.knownWords = props.knownWords;
        console.log(this.knownWords);

        for (let i = 0; i < this.wordCount; ++i) {
            if ( !this.knownWords.includes(this.db[i].lemma) ) {
                this.db[i]["known"] = false;
            }
            else {
                this.db[i]["known"] = true;
            }
        }   
        console.log(this.db);
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