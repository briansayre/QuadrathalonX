import React from "react";
import Sketch from "react-p5";
import './Game4.css';
import { useHistory } from "react-router";

import Piece from "./Piece";
import Playfield from "./Playfield";

let playfield, fallingPiece, ghostPiece, paused;
let score = 0;
let gameOver = false;
let ghostMode = true;

const width = 15;
const height = 20;
let prev = 0;


function Game4() {
    const history = useHistory();

    let states = {
        gp5: null,
        cnv: null,
    };


    // Handles if a key is pressed
    function keyPressed (key) {
        switch (key.key.toLowerCase()) {
            case ' ':
                hardDrop(fallingPiece, playfield);
                spawnNewPiece(states.gp5);
                break;

            case 'r':
                spawnNewPiece(states.gp5);
                playfield.resetGrid();
                break;

            case 'p':
                paused = !paused;
                break;

            case 'arrowup':
                fallingPiece.rotateCW();
                // if not valid, rotate back
                if (!playfield.isValid(fallingPiece))
                    fallingPiece.rotateCCW();
                break;

            case 'arrowdown':
                fallingPiece.moveDown();
                if (!playfield.isValid(fallingPiece))
                    fallingPiece.moveUp()
                else
                    fallingPiece.resetBuffer()
                break;

            case 'arrowleft':
                fallingPiece.moveLeft();
                if (!playfield.isValid(fallingPiece))
                    fallingPiece.moveRight()
                break;

            case 'arrowright':
                fallingPiece.moveRight();
                if (!playfield.isValid(fallingPiece))
                    fallingPiece.moveLeft()
                break;

            default:
                break;

        }


    };


    function hardDrop (piece, playfield) {
        // move down as long as current position is valid
        while (playfield.isValid(piece)) {
            piece.moveDown();
        }
        // in the last iteration the position isn't valid,
        // so move up
        piece.moveUp();

    }


    function spawnNewPiece (p5) {

        if (fallingPiece) {
            playfield.addToGrid(fallingPiece);
        }

        const pieces = ['O', 'J', 'L', 'S', 'Z', 'T', 'I']
        const choice = pieces[Math.floor(Math.random() * 7)];

        fallingPiece = new Piece(choice, playfield, null, null, p5);


        ghostPiece = new Piece(choice, playfield, null, null, p5);
        ghostPiece.isghost = true;
        ghostPiece.cells = fallingPiece.cells;

        p5.redraw();
    };

    // Draw each frame
    function draw (p5) {
        gameOver = playfield.gameOver;
        if (!gameOver) {

            let curr = p5.millis();
            let delta = curr - prev;
            prev = curr;

            if (!paused)
                fallingPiece.update(delta);

            // move down piece and spawn a new one
            // if necessary
            if (fallingPiece.timeToFall()) {
                fallingPiece.resetBuffer();
                fallingPiece.moveDown();

                if (!playfield.isValid(fallingPiece)) {
                    fallingPiece.moveUp();
                    if (fallingPiece.y < 2) {
                        console.log(fallingPiece.y);
                        gameOver = true;
                    } else {

                        spawnNewPiece(p5);

                    }
                }
            }

            // copy falligPiece's location and
            // orientation, then hardDrop() it
            // if ghostMode is on

            ghostPiece.copy(fallingPiece)
            hardDrop(ghostPiece, playfield);


            let rowCount = 0;
            for (let row = playfield.rows - 1; row >= 0; row--) {

                // if this row is full
                if (!playfield.grid[row].includes(playfield.foreground)) {
                    // remove the row
                    playfield.grid.splice(row, 1)
                    // and add an empty row to the top
                    playfield.grid.unshift(new Array(playfield.cols).fill(playfield.foreground));
                    rowCount++;
                }

            }

            score += rowCount * rowCount;
            states.gp5.background(251);

            playfield.show();
            if (ghostMode) ghostPiece.show();
            fallingPiece.show();

            p5.fill(0);
            p5.stroke(255);
            p5.strokeWeight(3);
            p5.textSize(20);
            let text = 'Score: ' + score;
            p5.text(text, 10, 30);
        } else {
            p5.fill(0);
            p5.stroke(255);
            p5.strokeWeight(3);
            p5.textSize(20);
            let text = 'Game Over'   ;
            p5.text(text, 10, 55);
            history.push("/highscore");
        }
    }

    function setup (p5) {
        playfield = new Playfield(width, height, p5);
        states.gp5 = p5;
        let totalWidth = playfield.cellSize * width + playfield.borderSize * 2;
        let totalHeight = playfield.cellSize * height + playfield.borderSize * 2;
        states.cnv = p5.createCanvas(totalWidth, totalHeight);
        
        var x = (p5.windowWidth - p5.width) / 2;
        var y = (p5.windowHeight - p5.height) / 2+ 30;
        states.cnv.position(x, y);
        spawnNewPiece(p5);
    }

    function centerCanvas (p5) {
        var x = (p5.windowWidth - p5.width) / 2;
        var y = (p5.windowHeight - p5.height) / 2 + 30;
        states.cnv.position(x, y);
    }

    // ReactJS render method
    
        return ( 
            <div>
            <div className="game-container">
                <div className="game">
                    < Sketch setup = { setup } draw = { draw } keyPressed = { keyPressed } windowResized = {centerCanvas }/> 
                </div> 
            </div>
        </div>
        );
    

}

export default Game4;