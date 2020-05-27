// FrequentWordsCard.js
// Visual container for the Most Frequent Known Words graph.
// Should only be internal to this project.

import React from 'react';

const CIRCLE_CENTER_X = 360;
const CIRCLE_CENTER_Y = 140;
const CIRCLE_RADIUS   = 120;

export default
class FrequentWordsCard
extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            show: {}
        }
        this.slice_clicked = false;
        this.clicked_slice = ""
        for (let item in this.props.data) {
            this.state.show[item] = true;
        }
    }

    clear_click() {
        if (this.clicked_slice != "")
            this.deemphasize_slice(this.clicked_slice);
        this.slice_clicked = false;
        this.clicked_slice = "";
    }

    handle_slice_emphasis(evt, slice_id) {
        switch (evt.type) {
            case 'mouseenter':
                if (!this.slice_clicked) 
                    this.emphasize_slice(slice_id);
                break;

            case 'mouseleave':
                if (!this.slice_clicked) 
                    this.deemphasize_slice(slice_id);
                break;

            case 'click':
                if (this.slice_clicked) {
                    if (this.clicked_slice == slice_id) {
                        this.clear_click();
                    }
                    else {
                        this.deemphasize_slice(this.clicked_slice);
                        this.clicked_slice = slice_id;
                        this.emphasize_slice(slice_id);
                    }
                }
                else {
                    this.slice_clicked = true;
                    this.clicked_slice = slice_id;
                    this.emphasize_slice(slice_id);
                }
                break;

            default:
                break;
        }
    }

    emphasize_slice(slice_id) {
        let slice = document.getElementById(slice_id);
        let text  = document.getElementById(slice_id+'_text');

        slice.setAttribute('filter', 'url(#dropShadow_slice)');
        slice.setAttribute('transform', 'translate(-6.6, -3.0) scale(1.02, 1.02)');

        text.setAttribute('visibility', 'visible');

        slice.parentNode.appendChild(slice);
    }

    deemphasize_slice(slice_id) {
        let slice = document.getElementById(slice_id);
        let text  = document.getElementById(slice_id+'_text');

        slice.setAttribute('filter', 'null');
        slice.setAttribute('transform', 'translate(0, 0)');

        text.setAttribute('visibility', 'hidden');
    }

    generateSlices()
    {
        let ret = [];
        let start_angle = -.125;
        let hueMap = genHueMap(Object.keys(this.props.data).length);
        let totalWords = this.allCount();

        for (let i=0; i<Object.keys(this.props.data).length; ++i) {
            let wordType = Object.keys(this.props.data)[i];
            if (!this.state.show[wordType] || 
                 this.props.data[wordType] == null) continue;

            let angle = (this.props.data[wordType]['counts'][0]+0.0)/totalWords;
            let color = hslToRgb(hueMap[i], 1, .25);

            ret.push(this.add_slice(wordType, true, color, start_angle, angle));
            start_angle += angle;
        }
        for (let i=0; i<Object.keys(this.props.data).length; ++i) {
            let wordType = Object.keys(this.props.data)[i];
            if (!this.state.show[wordType] || 
                 this.props.data[wordType] == null) continue;

            let angle = (this.props.data[wordType]['counts'][1]+0.0)/totalWords;
            let color = hslToRgb(hueMap[i], .8, .80);

            ret.push(this.add_slice(wordType, false, color, start_angle, angle));
            start_angle += angle;
        }
        return ret;
    }

    add_slice(wordType, known, color, start_angle, angle)
    {
        let key = known ? wordType: wordType+"_u"
        let slice = (
            <path
                key={key}
                id= {key}
                fill={color}
                d={
                    describeArc(CIRCLE_CENTER_X, 
                                CIRCLE_CENTER_Y, 
                                CIRCLE_RADIUS, 
                                start_angle*360, 
                                (start_angle+angle)*360)
                }
                onClick={(evt) => this.handle_slice_emphasis(evt, key)}
                onMouseEnter={(evt) => this.handle_slice_emphasis(evt, key)}
                onMouseLeave={(evt) => this.handle_slice_emphasis(evt, key)}
            />
        );
        return slice;
    }

    generateLabels()
    {
        let ret = [];
        let hueMap = genHueMap(Object.keys(this.props.data).length);
        let totalWords = this.allCount();

        for (let i=0; i<Object.keys(this.props.data).length; ++i) {
            let wordType = Object.keys(this.props.data)[i];
            if (!this.state.show[wordType] || 
                 this.props.data[wordType] == null) continue;

            let precentage = (this.props.data[wordType]['counts'][0]+0.0)/totalWords;
            let color = hslToRgb(hueMap[i], 1, .1);

            ret.push(this.add_label(wordType, true, color, precentage));
        }
        for (let i=0; i<Object.keys(this.props.data).length; ++i) {
            let wordType = Object.keys(this.props.data)[i];
            if (!this.state.show[wordType] || 
                 this.props.data[wordType] == null) continue;

            let precentage = (this.props.data[wordType]['counts'][1]+0.0)/totalWords;
            let color = hslToRgb(hueMap[i], 1, .1);

            ret.push(this.add_label(wordType, false, color, precentage));
        }
        return ret;
    }

    add_label(wordType, known, color, precentage)
    {
        const precent = {
            fill: color,
            textAnchor: "middle",
            fontSize: 34,
            fontFamily: ["Impact", "Arial Black", "Gadget", "sans-serif"]
        }
        const count = {
            fill: color+"80",
            textAnchor: "middle",
            fontSize: 18,
            fontFamily: ["Impact", "Arial Black", "Gadget", "sans-serif"]
        }
        const type = {
            fill: color+"80",
            textAnchor: "middle",
            fontSize: 10,
            fontFamily: ["Impact", "Arial Black", "Gadget", "sans-serif"]
        }

        let split_text = () => {
            let text = this.props.data[wordType]['wordType'];
            if (!known) text = "Unknown " + text;
            if (text.length < 25) 
                return (
                    <text 
                        x={CIRCLE_CENTER_X}
                        y={CIRCLE_CENTER_Y+15}
                        style={type}
                        dy="1.2em">
                        {text}
                    </text>
                );

            let split = text.split(" ");
            return (
                <text 
                    x={CIRCLE_CENTER_X}
                    y={CIRCLE_CENTER_Y+15}
                    style={type}
                    dy="1.2em"
                >
                    <tspan 
                        x={CIRCLE_CENTER_X}
                        dy="1.2em"
                        textAnchor="middle"
                    >
                        {split[0]+" "+split[1]}
                    </tspan>
                    <tspan 
                        x={CIRCLE_CENTER_X} 
                        dy="1.2em"
                        textAnchor="middle"
                    >
                        {split[2]}
                    </tspan>
                </text>
            );
        }

        return (
            <g 
                key={known ? wordType+"_text": wordType+"_u_text"}
                id= {known ? wordType+"_text": wordType+"_u_text"}
                visibility='hidden'
                filter= 'dropShadow_slice'
            >
                <text
                    x={CIRCLE_CENTER_X}
                    y={CIRCLE_CENTER_Y}
                    style={precent}
                    dy=".3em"
                >
                    {(precentage*100).toFixed(2)+"%"}
                </text>
                <text
                    x={CIRCLE_CENTER_X}
                    y={CIRCLE_CENTER_Y}
                    style={count}
                    dy="-1.2em"
                >
                    {this.props.data[wordType]['counts'][known ? 0:1]}
                </text>
                {split_text(this.props.data[wordType]['wordType'])}

            </g>
        )
    }

    knownCount()
    {
        let count = 0;
        for (let item in this.props.data) {
            if (this.state.show[item] && this.props.data[item] != null) {
                count += this.props.data[item]['counts'][0];                
            }
        }
        return count;
    }

    allCount() {
        let count = 0;
        for (let item in this.props.data) {
            if (this.state.show[item] && this.props.data[item] != null) {
                count += this.props.data[item]['counts'][0];
                count += this.props.data[item]['counts'][1];
            }
        }
        return count;
    }

    render()
    {
        const headingStyle = {
            "fill": "#333333",
            "fontSize": 22,
            "textAnchor": "start",
            "fontFamily": ["Impact", "Arial Black", "Gadget", "sans-serif"]
        }
        const numberStyle = {
            "fill": "#404040",
            "fontSize": 60,
            "textAnchor": "middle",
            "fontFamily": ["Impact", "Arial Black", "Gadget", "sans-serif"]
        }
        const numberSmallStyle = {
            "fill": "#999999",
            "fontSize": 12,
            "textAnchor": "middle",
            "fontFamily": ["Impact", "Arial Black", "Gadget", "sans-serif"]
        }

        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            id="svg8"
            version="1.1" 
            viewBox="0 0 506 306">
            <defs id="filters">
                <filter id="dropShadow_bg">
                    <feFlood floodColor="#3D4574" floodOpacity="0.5" result="offsetColor"/>
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.3" />
                    <feOffset dx="3" dy="3" result="offsetBlur"/>
                    <feComposite in="offsetColor" in2="offsetBlur" operator="in"/>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="dropShadow_slice">
                    <feFlood floodColor="#3D4574" floodOpacity="0.5" result="offsetColor"/>
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.3" />
                    <feOffset dx="1" dy="1" result="offsetBlur"/>
                    <feComposite in="offsetColor" in2="offsetBlur" operator="in"/>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="blurABit">
                    <feGaussianBlur in="SouceImage" stdDeviation=".1"/>
                </filter>
            </defs>
            <g id="widget">
                <g id="background"
                   height='300'
                   width='500'
                >
                    <rect
                        id="background_sheet"
                        fill="#f0f0f0"
                        filter="url(#dropShadow_bg)"
                        width="500"
                        height="300"
                        ry="20"
                        rx="20"
                        y="0"
                        x="0" 
                        onClick={(evt) => this.clear_click()}
                    />
                </g>
                <text id="heading" 
                    x="20" 
                    y="30" 
                    dy=".3em" 
                    textLength="200" 
                    lengthAdjust="spacingAndGlyphs"
                    style={headingStyle}
                >
                    Most Frequent Known Words
                </text>
                <text id="total_known" 
                    x="120" 
                    y="110" 
                    style={numberStyle}
                >
                    {this.knownCount()}
                </text>
                <text id="total" 
                    x="120"
                    y="110"
                    dy="2em"
                    style={numberSmallStyle}
                >
                    {"Total words selected: " + this.allCount()}
                </text>
                <g id="plot">
                    <circle cx={CIRCLE_CENTER_X} 
                            cy={CIRCLE_CENTER_Y} 
                            r= {CIRCLE_RADIUS} 
                            fill="#d9d9d9" />
                    {this.generateSlices()}
                </g>
                <g id="plot_labels">  
                    <circle cx={CIRCLE_CENTER_X}
                            cy={CIRCLE_CENTER_Y}
                            r="60" 
                            fill="#f2f2f2" />
                    {this.generateLabels()}
                </g>
            </g>
        </svg>
        )
    }

}


function genHueMap(amount, startHue=0) {
    let ret = []
    let step = 1.0/amount;
    let minChange = .25;
    let delta = Math.floor(minChange/step) + 1;
    for (let i=0; i<amount; ++i)
        ret.push((i*delta*step+startHue)%1);
    return ret;
}

function hslToRgb(h, s, l)
{
    var r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    r = Math.round(r * 255).toString(16);
    g = Math.round(g * 255).toString(16);
    b = Math.round(b * 255).toString(16);
    r = r.length<2 ? "0"+r : r;
    g = g.length<2 ? "0"+g : g;
    b = b.length<2 ? "0"+b : b;
    return "#" + r + g + b;
} 

function describeArc(x, y, radius, startAngle, endAngle)
{
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", x, y,
        "L", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y
    ].join(" ");
    return d;       
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) 
{
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}


{/* <script type="text/javascript"><![CDATA[
        
    // Hue is float 0-1. size is in ratio of cirle (1/4 = 90deg)
    function add_slice(wordType, hue, size) {
        if (typeof add_slice.end == 'undefined') add_slice.end = -.25;
        start = add_slice.end;
        end   = add_slice.end + size + .00075;
        color = wordType.charAt(0)=='u' ? hslToRgb(hue, 1.0, .75) : hslToRgb(hue, 1.0, .2)

        let slice     = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let text_main = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let text_alt  = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let text_desc = document.createElementNS("http://www.w3.org/2000/svg", "text");

        slice.setAttribute('id', wordType);
        slice.setAttribute('fill', color);
        slice.setAttribute('d', describeArc(325, 140, 110, start*360, end*360));

        slice.addEventListener('mouseover', (evt) => handle_slice_emphasis(evt, wordType) );
        slice.addEventListener('mouseout',  (evt) => handle_slice_emphasis(evt, wordType) );
        slice.addEventListener('click',     (evt) => handle_slice_emphasis(evt, wordType) );

        text_main.setAttribute('id', wordType+'_text_main');
        text_main.setAttribute('fill', hslToRgb(hue, 1.0, .1));
        text_main.setAttribute('filter', 'dropShadow_slice');
        text_main.setAttribute('x', 325);
        text_main.setAttribute('y', 140);
        text_main.setAttribute('dy', '.4em');
        text_main.setAttribute('text-anchor', 'middle');
        text_main.setAttribute('font-family', '"Impact", "Arial Black", "Gadget", "sans-serif"');
        text_main.setAttribute('font-size', 32);
        text_main.textContent  = "100%"
        text_main.setAttribute('visibility', 'hidden');

        text_alt.setAttribute('id', wordType+'_text_alt');
        text_alt.setAttribute('fill', hslToRgb(hue, 1.0, .1)+"80");
        text_alt.setAttribute('filter', 'dropShadow_slice');
        text_alt.setAttribute('x', 325);
        text_alt.setAttribute('y', 120);
        text_alt.setAttribute('text-anchor', 'middle');
        text_alt.setAttribute('font-family', '"Impact", "Arial Black", "Gadget", "sans-serif"');
        text_alt.setAttribute('font-size', 12);
        text_alt.textContent  = "32099"
        text_alt.setAttribute('visibility', 'hidden');

        text_desc.setAttribute('id', wordType+'_text_desc');
        text_desc.setAttribute('fill', hslToRgb(hue, 1.0, .1)+"80");
        text_desc.setAttribute('filter', 'dropShadow_slice');
        text_desc.setAttribute('x', 325);
        text_desc.setAttribute('y', 165);
        text_desc.setAttribute('text-anchor', 'middle');
        text_desc.setAttribute('textLength', 100);
        text_desc.setAttribute('font-family', '"Impact", "Arial Black", "Gadget", "sans-serif"');
        text_desc.setAttribute('font-size', 8);
        text_desc.textContent  = "Unknown Adjective Pronouns"
        text_desc.setAttribute('visibility', 'hidden');

        document.getElementById('plot_labels').appendChild(text_main);
        document.getElementById('plot_labels').appendChild(text_alt);
        document.getElementById('plot_labels').appendChild(text_desc);        
        document.getElementById('plot').appendChild(slice);

        add_slice.end = end - .00075;
    }

    // returns rgb string.
    function hslToRgb(h, s, l) {
        var r, g, b;

        if(s == 0) {
            r = g = b = l; // achromatic
        }
        else {
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        r = Math.round(r * 255).toString(16);
        r = r.length<2 ? r.concat("0") : r;
        g = Math.round(g * 255).toString(16);
        g = g.length<2 ? g.concat("0") : g;
        b = Math.round(b * 255).toString(16);
        b = b.length<2 ? b.concat("0") : b;

        return "#" + r + g + b;
    } 

    function clear_click() {
        if (handle_slice_emphasis.clicked_slice != null && 
            handle_slice_emphasis.clicked_slice != ""
            )
            deemphasize_slice(handle_slice_emphasis.clicked_slice);
        handle_slice_emphasis.click_enabled = false;
        handle_slice_emphasis.clicked_slice = "";
    }

    function handle_slice_emphasis(evt, wordType) {
        if (typeof handle_slice_emphasis.click_enabled == 'undefined') 
            handle_slice_emphasis.click_enabled = false;
        if (typeof handle_slice_emphasis.clicked_slice == 'undefined') 
            handle_slice_emphasis.clicked_slice = "";

        switch (evt.type) {
            case 'mouseover':
                if (!handle_slice_emphasis.click_enabled) 
                    emphasize_slice(wordType);
                break;

            case 'mouseout':
                if (!handle_slice_emphasis.click_enabled) 
                    deemphasize_slice(wordType);
                break;

            case 'click':
                if (handle_slice_emphasis.click_enabled) {
                    if (handle_slice_emphasis.clicked_slice == wordType) {
                        clear_click();
                    }
                    else {
                        deemphasize_slice(handle_slice_emphasis.clicked_slice);
                        handle_slice_emphasis.clicked_slice = wordType;
                        emphasize_slice(wordType);
                    }
                }
                else {
                    handle_slice_emphasis.click_enabled = true;
                    handle_slice_emphasis.clicked_slice = wordType;
                    emphasize_slice(wordType);
                }
                break;

            default:
                break;
        }
    }

    function emphasize_slice(wordType) {
        let slice     = document.getElementById(wordType);
        let text_main = document.getElementById(wordType+'_text_main');
        let text_alt  = document.getElementById(wordType+'_text_alt');
        let text_desc = document.getElementById(wordType+'_text_desc');

        slice.setAttribute('filter', 'url(#dropShadow_slice)');
        slice.setAttribute('transform', 'translate(-6.6, -3.0) scale(1.02, 1.02)');

        text_main.setAttribute('visibility', 'visible');
        text_alt.setAttribute('visibility', 'visible');
        text_desc.setAttribute('visibility', 'visible');

        slice.parentNode.appendChild(slice);
    }

    function deemphasize_slice(wordType) {
        let slice     = document.getElementById(wordType);
        let text_main = document.getElementById(wordType+'_text_main');
        let text_alt  = document.getElementById(wordType+'_text_alt');
        let text_desc = document.getElementById(wordType+'_text_desc');

        slice.setAttribute('filter', 'null');
        slice.setAttribute('transform', 'translate(0, 0)');

        text_main.setAttribute('visibility', 'hidden');
        text_alt.setAttribute('visibility', 'hidden');
        text_desc.setAttribute('visibility', 'hidden');
    }


    ]]></script> */}