// DemoClass.js

// import React, {Component} from 'react';
import React from 'react';
import { Component } from 'react';

class DemoClass extends Component
{
    constructor(props)
    {
        super(props);
        this.clock = new Date();
        this.tickerID = null
        this.state = {
            time: this.clock.toLocaleString()
        };
        // console.log(Component.prototype);
    }

    render()
    {        
        return <p>It is {this.state.time}</p>;
    }

    tick()
    {
        console.log(this.tickerID);
        this.setState(
            {
                date: this.clock.toLocaleString
            }
        );
    }

    componentDidMount()
    {
        this.tickerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount()
    {
        clearInterval(this.tickerID);
    }
}

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleString()
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
        let date = new Date();
        console.log(date);
        this.setState({
        time: date.toLocaleString()
      });
    }
    render() {
      return (
        <p className="App-clock">
          The time is {this.state.time}.
        </p>
      );
    }
  }

export {DemoClass, Clock};