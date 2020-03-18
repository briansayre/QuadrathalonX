import React, { Component } from "react";
import './Game1.css';
import ReactDOM from 'react-dom';

class Game1 extends Component {
    componentDidMount() {
        let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
        canvas.style.width = "800px";
        canvas.style.height = "500px";
        canvas.style.backgrounfColor = "blue";
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(200,0,0)';
        ctx.fillRect(0, 0, 500, 500);
    }

    render() {
        return (
            <div>
                <div class="header"> 
                    QUAD <br/>
                    RATH <br />
                    ALON <br />
                </div>
                <div class="game-container">
                    <canvas ref="myCanvas" />
                </div>
            </div>
        );
    }
}
export default Game1;
