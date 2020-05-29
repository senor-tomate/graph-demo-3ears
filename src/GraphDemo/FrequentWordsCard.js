// FrequentWordsCard.js
// Visual container for the Most Frequent Known Words graph.
// Should only be internal to this project.

import React from 'react';

const CIRCLE_CENTER_X     = 360;
const CIRCLE_CENTER_Y     = 135;
const CIRCLE_RADIUS       = 120;
const CIRCLE_INNER_RADIUS = 60;

const SLIDER_TO_CIRCLE_RATIO = 4.0/5.0;
const SLIDER_TO_CIRCLE_PAD   = 20;
const SLIDER_LENGTH          = SLIDER_TO_CIRCLE_RATIO * CIRCLE_RADIUS * 2;
const SLIDER_START_X         = CIRCLE_CENTER_X-SLIDER_LENGTH/2;
const SLIDER_START_Y         = CIRCLE_CENTER_Y + CIRCLE_RADIUS + SLIDER_TO_CIRCLE_PAD;

const SLIDER_LEFT_COLOR      = hslToRgb(210.0/360, 1, .7);
const SLIDER_RIGHT_COLOR     = hslToRgb(280.0/360, 1, .7);

export default
class FrequentWordsCard
extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            show: {},
        }
        this.slider_left_position = 0.0;
        this.slider_right_position= 1.0;
        this.slider_dragged=null;

        this.slice_clicked = false;
        this.clicked_slice = "";
        for (let item in this.props.data) {
            this.state.show[item] = true;
        }
        this.__PT = null; 
        this.__SVG = null;
    }

    //#region sliceEmphasis
    clear_click() {
        if (this.clicked_slice != "")
            this.deemphasize_slice(this.clicked_slice);
        this.slice_clicked = false;
        this.clicked_slice = "";
    }

    handle_slice_emphasis(evt, slice_id) {
        if (document.getElementById(slice_id) == null) return;
        switch (evt.type) {
            case 'pointerenter':
                if (!this.slice_clicked) 
                    this.emphasize_slice(slice_id);
                break;

            case 'pointerleave':
                if (!this.slice_clicked) 
                    this.deemphasize_slice(slice_id);
                break;

            case 'pointerdown':
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

        let factor = 1.02;
        let c1 = -1.0 * (CIRCLE_CENTER_X) * (factor-1);
        let c2 = -1.0 * (CIRCLE_CENTER_Y) * (factor-1);

        slice.setAttribute('filter', 'url(#dropShadow_slice)');
        slice.setAttribute('transform', 'translate('+c1+','+c2+') scale('+factor+','+factor+')');

        text.setAttribute('visibility', 'visible');

        slice.parentNode.appendChild(slice);
    }

    deemphasize_slice(slice_id) {
        let slice = document.getElementById(slice_id);
        let text  = document.getElementById(slice_id+'_text');

        if (slice != null) {
            slice.setAttribute('filter', 'null');
            slice.setAttribute('transform', 'translate(0, 0)');
        }

        text.setAttribute('visibility', 'hidden');
    }
    //#endregion sliceEmphasis

    //#region sliderEmphasis

    sliderMouseEnter() {;
        let slider = document.getElementById("slider_line_middle");
        slider.setAttribute("stroke-opacity", .5);
    }

    sliderMouseLeave() {
        let slider = document.getElementById("slider_line_middle");
        slider.setAttribute("stroke-opacity", .2);
    }

    _getCircleFromHitbox(hitbox) {
        let circle_id = hitbox.getAttribute('id').substring(0, 15);
        return {
            isLeft: hitbox.getAttribute('id')=="slider_circle_1_hitbox",
            circle: document.getElementById(circle_id),
            hitbox: hitbox,
            label: document.getElementById(circle_id+"_label")
        }
    }

    sliderCircleEnter(evt) {
        this.sliderMouseEnter();
        if (this.slider_dragged != null) return;
        let hitbox = evt.target;
        let circle = this._getCircleFromHitbox(hitbox);
        let otherCircle = this._getCircleFromHitbox( circle.isLeft ? 
                            document.getElementById('slider_circle_2_hitbox'): 
                            document.getElementById('slider_circle_1_hitbox'));
        let otherCircle_path = circle.isLeft ?
            document.getElementById('slider_circle_2_label_path') :
            document.getElementById('slider_circle_1_label_path');
        let circle_path = !circle.isLeft ?
            document.getElementById('slider_circle_2_label_path') :
            document.getElementById('slider_circle_1_label_path');

        circle.circle.setAttribute('r', 5);
        circle.circle.setAttribute('filter', 'url(#dropShadow_circle)');
        circle.label.setAttribute('visibility', 'visible');
        circle_path.setAttribute('fill-opacity', .8)

        otherCircle.label.setAttribute('visibility', 'visible');
        otherCircle_path.setAttribute('fill-opacity', .4)
    }

    sliderCircleLeave(evt) {
        let hitbox = evt.target;
        let circle = this._getCircleFromHitbox(hitbox);
        if (this.slider_dragged == null) this.sliderMouseLeave();
        if (this.slider_dragged != null && 
            circle.circle.getAttribute('id')==this.slider_dragged.circle.getAttribute('id')) 
            return;
        let otherCircle = this._getCircleFromHitbox( circle.isLeft ? 
            document.getElementById('slider_circle_2_hitbox'): 
            document.getElementById('slider_circle_1_hitbox'));

        circle.circle.setAttribute('r', 3);
        circle.circle.setAttribute('filter', '');
        circle.label.setAttribute('visibility', 'hidden');
        otherCircle.label.setAttribute('visibility', 'hidden');
    }

    sliderCircleDown(evt) {
        let hitbox = evt.target;
        let circle = this._getCircleFromHitbox(hitbox);

        this.slider_dragged=circle;
    }

    sliderCircleMove(evt) {
        if(this.slider_dragged==null) return;
        let circle = this.slider_dragged;

        let x=0;
        this.__PT.x = evt.clientX;
        this.__PT.y = evt.clientY;
        let cursorpt = this.__PT.matrixTransform(this.__SVG.getScreenCTM().inverse());
        x = cursorpt.x;

        if (circle.isLeft) {
            if (x>SLIDER_START_X+this.slider_right_position*SLIDER_LENGTH) {
                x = SLIDER_START_X+this.slider_right_position*SLIDER_LENGTH;
            }
            if (x<SLIDER_START_X) {
                x = SLIDER_START_X;
            }
            this.slider_left_position=(x-SLIDER_START_X+0.0)/SLIDER_LENGTH;

            document.getElementById('slider_line_left').setAttribute('x2', x);
            document.getElementById('slider_line_middle').setAttribute('x1', x);
            document.getElementById('slider_grad').setAttribute('x1', x)
        }
        else {
            if (x<SLIDER_START_X+this.slider_left_position*SLIDER_LENGTH) {
                x = SLIDER_START_X+this.slider_left_position*SLIDER_LENGTH;
            }
            if (x>SLIDER_START_X+SLIDER_LENGTH) {
                x = SLIDER_START_X+SLIDER_LENGTH;
            }
            this.slider_right_position=(x-SLIDER_START_X+0.0)/SLIDER_LENGTH;

            document.getElementById('slider_line_middle').setAttribute('x2', x);
            document.getElementById('slider_line_right').setAttribute('x1', x);
            document.getElementById('slider_grad').setAttribute('x2', x);
        }

        circle.circle.setAttribute('cx', x);
        circle.hitbox.setAttribute('cx', x);
        circle.label.setAttribute('transform', 'translate('+x+','+SLIDER_START_Y+')');

        let label_text = document.getElementById(circle.label.getAttribute('id')+'_text');
        label_text.textContent=this.props.scaleFunction((x-SLIDER_START_X+0.0)/SLIDER_LENGTH);

    }

    sliderCircleRelease(evt) {
        if (this.slider_dragged==null) return;
        let circle = this.slider_dragged;

        circle.circle.parentNode.appendChild(circle.circle);
        circle.label.parentNode.appendChild(circle.label);
        circle.hitbox.parentNode.appendChild(circle.hitbox);

        this.slider_dragged=null;
        this.sliderCircleLeave({target: circle.hitbox});
        // this.sliderMouseLeave();
        this.props.onSliderChange([this.slider_left_position, this.slider_right_position]);
    }

    //#endregion sliderEmphasis

    //#region sliceGen
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

            if (this.props.data[wordType]['counts'][0]==0) continue;

            let angle = (this.props.data[wordType]['counts'][0]+0.0)/totalWords;
            if (angle==1.0) angle -= .000001;

            let color = hslToRgb(hueMap[i], 1, .25);

            ret.push(this.add_slice(wordType, true, color, start_angle, angle));
            start_angle += angle;
        }
        for (let i=0; i<Object.keys(this.props.data).length; ++i) {
            let wordType = Object.keys(this.props.data)[i];
            if (!this.state.show[wordType] || 
                 this.props.data[wordType] == null) continue;

            if (this.props.data[wordType]['counts'][1]==0) continue;
            
            let angle = (this.props.data[wordType]['counts'][1]+0.0)/totalWords;
            if (angle==1.0) angle -= .000001;

            let color = hslToRgb(hueMap[i], 1, .80);

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
                                CIRCLE_INNER_RADIUS,
                                start_angle*360, 
                                (start_angle+angle)*360)
                }
                onPointerDown ={(evt) => this.handle_slice_emphasis(evt, key)}
                onPointerEnter={(evt) => this.handle_slice_emphasis(evt, key)}
                onPointerLeave={(evt) => this.handle_slice_emphasis(evt, key)}
            />
        );
        return slice;
    }
    //#endregion sliceGen

    //#region labelGen
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
    //#endregion labelGen

    //#region sliderGen
    labelPath() {
        return "M 0 0 l -15 -16.77 a 20 20 0 1 1 30 0 l -15 16.77"
    }

    genSlider() {
        let hue = .5;

        const sliderLabelStyle = {
            textAnchor: "middle",
            fontSize: 12,
            fontFamily: "monospace",
            fill: "#ffffff",

        }
        console.log("GENSLIDERS")
        console.log(this.slider_left_position)
        console.log(this.slider_right_position)
        return (
        <g id="plot_slider">
            <line
                id="slider_line_left"
                x1={SLIDER_START_X}
                y1={SLIDER_START_Y}
                x2={SLIDER_START_X+this.slider_left_position*SLIDER_LENGTH}
                y2={SLIDER_START_Y}
                stroke={SLIDER_LEFT_COLOR}
                strokeLinecap="round"
                strokeOpacity={.2}
                strokeWidth={5}
            />
            <line
                id="slider_line_right"
                x1={SLIDER_START_X+this.slider_right_position*SLIDER_LENGTH}
                y1={SLIDER_START_Y}
                x2={SLIDER_START_X+SLIDER_LENGTH}
                y2={SLIDER_START_Y}
                stroke={SLIDER_RIGHT_COLOR}
                strokeLinecap="round"
                strokeOpacity={.2}
                strokeWidth={5}
            />
            <line
                id="slider_line_middle"
                x1={SLIDER_START_X+this.slider_left_position*SLIDER_LENGTH}
                y1={SLIDER_START_Y}
                x2={SLIDER_START_X+this.slider_right_position*SLIDER_LENGTH}
                y2={SLIDER_START_Y}
                stroke="url(#slider_grad)"
                strokeOpacity={.2}
                strokeLinecap="round"
                strokeWidth={5}
            />
            <line
                id="slider_hitbox"
                x1={SLIDER_START_X}
                y1={SLIDER_START_Y}
                x2={SLIDER_START_X+SLIDER_LENGTH}
                y2={SLIDER_START_Y}
                stroke={"#00000000"}
                strokeLinecap="round"
                strokeWidth={12}
                onPointerEnter={(evt) => this.sliderMouseEnter()}
                onPointerLeave={(evt) => this.sliderMouseLeave()}
            />
            <circle 
                id="slider_circle_1"
                cx={SLIDER_START_X+this.slider_left_position*SLIDER_LENGTH}
                cy={SLIDER_START_Y}
                r={3}
                fill={SLIDER_LEFT_COLOR}
            />
            <g 
                id="slider_circle_1_label"
                visibility='hidden'
                transform={'translate('+(SLIDER_START_X+this.slider_left_position*SLIDER_LENGTH)+','+SLIDER_START_Y+')'}
            >
                <path 
                    id='slider_circle_1_label_path'
                    d={this.labelPath()}
                    fill={SLIDER_LEFT_COLOR}
                    filter="url(#dropShadow_slice)"
                />
                <text 
                    id="slider_circle_1_label_text"
                    style={sliderLabelStyle}
                    x={0}
                    y={-25}
                >
                    {this.props.scaleFunction(this.slider_left_position)}
                </text>
            </g>
            <circle
                id="slider_circle_1_hitbox"
                cx={SLIDER_START_X+this.slider_left_position*SLIDER_LENGTH}
                cy={SLIDER_START_Y}
                fill="#00000000"
                r={6}
                onPointerEnter={(evt) => this.sliderCircleEnter(evt)}
                onPointerLeave={(evt) => this.sliderCircleLeave(evt)}
                onPointerDown= {(evt) => this.sliderCircleDown(evt) }
            />
            
            <circle 
                id="slider_circle_2"
                cx={SLIDER_START_X+this.slider_right_position*SLIDER_LENGTH}
                cy={SLIDER_START_Y}
                r={3}
                fill={SLIDER_RIGHT_COLOR}
            />
            <g 
                id="slider_circle_2_label"
                visibility='hidden'
                transform={'translate('+(SLIDER_START_X+this.slider_right_position*SLIDER_LENGTH)+','+SLIDER_START_Y+')'}
            >
                <path 
                    id='slider_circle_2_label_path'
                    d={this.labelPath()}
                    fill={SLIDER_RIGHT_COLOR}
                    filter="url(#dropShadow_slice)"
                />
                <text
                    id="slider_circle_2_label_text"
                    style={sliderLabelStyle}
                    x={0}
                    y={-25}
                >
                    {this.props.scaleFunction(this.slider_right_position)}
                </text>
            </g>
            <circle
                id="slider_circle_2_hitbox"
                cx={SLIDER_START_X+this.slider_right_position*SLIDER_LENGTH}
                cy={SLIDER_START_Y}
                fill="#00000000"
                r={6}
                onPointerEnter={(evt) => this.sliderCircleEnter(evt)}
                onPointerLeave={(evt) => this.sliderCircleLeave(evt)}
                onPointerDown= {(evt) => this.sliderCircleDown(evt) }
            />
        </g>
        );
    }


    //#endregion sliderGen

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

    componentDidMount()
    {
        document.addEventListener("pointerup", (event) => this.sliderCircleRelease(event) );
        document.addEventListener("pointermove", (evt) => this.sliderCircleMove(evt))
        let svg = document.getElementById('FrequentWordsCard');
        this.__SVG = svg;
        this.__PT = svg.createSVGPoint();
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
        const sliderNumberStyle = {
            fill: "#ffffff",
            "fontSize": 10,
            "textAnchor": "middle",
            "fontFamily": ['monospace']
        }

        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            id="FrequentWordsCard"
            version="1.1" 
            viewBox="0 0 506 306">
            <defs id="filters">
                <linearGradient 
                    id="slider_grad" 
                    x1={SLIDER_START_X}
                    y1={SLIDER_START_Y}
                    x2={SLIDER_START_X+SLIDER_LENGTH}
                    y2={SLIDER_START_Y}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop 
                        id="slider_grad_stop1"
                        offset="0%"
                        stopColor={SLIDER_LEFT_COLOR}
                    />
                    <stop 
                        id="slider_grad_stop2"
                        offset="100%"
                        stopColor={SLIDER_RIGHT_COLOR}
                    />
                </linearGradient>
                <radialGradient id="background_grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop 
                        offset="50%"
                        stopColor='#ffffff'
                    />
                    <stop 
                        offset="100%"
                        stopColor='#fdfdfd'
                    />
                </radialGradient>
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
                <filter id="dropShadow_circle">
                    <feFlood floodColor="#3D4574" floodOpacity="0.2" result="offsetColor"/>
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.3" />
                    <feOffset dx=".5" dy=".5" result="offsetBlur"/>
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
                        fill='url(#background_grad)'
                        filter="url(#dropShadow_bg)"
                        width="500"
                        height="300"
                        ry="20"
                        rx="20"
                        y="0"
                        x="0" 
                        onPointerDown={(evt) => this.clear_click()}
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
                            fill="#f2f2f2" />
                    {this.generateSlices()}
                </g>
                <g id="plot_labels">  
                    {this.generateLabels()}
                </g>
                {this.genSlider()}
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

function describeArc(x, y, radius, innerRadius, startAngle, endAngle)
{
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var start2 = polarToCartesian(x, y, innerRadius, endAngle);
    var end2 = polarToCartesian(x, y, innerRadius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", end2.x, end2.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, start2.x, start2.y,
        "L", start.x, start.y
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