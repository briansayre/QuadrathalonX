import React from "react";
import './Game3.css';

class Game3 extends React.Component {
    state = {
     tickTime: 100,
     rows: 25,
     cols: 25,
     grid: [],
     food: [],
     snake: {
       head: {},
       tail: [],
     },
     currentDirection: 'right',
     die: false,
     score: 0,
     scoreFactor: 10,
   };

   constructor(props) {
     super(props);
     this.handleKeyPress = this.handleKeyPress.bind(this);
   }

   getRandomGrid() {
     return {
       row: Math.floor((Math.random() * this.state.rows)),
       col: Math.floor((Math.random() * this.state.cols))
     }
   }

   getCenterOfGrid() {
     return {
       row: Math.floor((this.state.rows - 1) / 2),
       col: Math.floor((this.state.cols - 1) / 2),
     }
   }

   resetGrid(state = {}, sendBack = false) {

     if (!Object.keys(state).length) {
       state = this.state;
     }

     const grid = [];
    const food = state.food;
     const {
       rows,
       cols,
       snake
     } = state;

     for (let row = 0; row < rows; row++) {
       for (let col = 0; col < cols; col++) {
           let isFood = false;
             food.forEach(f => {
               if (f.row === row && f.col === col) {
                 isFood = true;
               }
             })

         const isHead = (snake.head.row === row && snake.head.col === col);
         let isTail = false;
         snake.tail.forEach(t => {
           if (t.row === row && t.col === col) {
             isTail = true;
           }
         })

         grid.push({
           row,
           col,
           isFood,
           isHead,
           isTail,
         })
       }
     }

     if (sendBack) {
       return grid;
     } else {
       this.setState({
         grid
       })
     }
   }

   gameTick() {
     this.setState((state) => {
       let {
         currentDirection,
         snake,
         food
       } = state;
       let {
         tail
       } = snake;
       const {
         row,
         col
       } = state.snake.head;
       let head = {
         row,
         col
       };

       if (state.die) {
         clearInterval(window.fnInterval);
       }

       tail.unshift({
         row: head.row,
         col: head.col,
         v: head.v
       })

       var wasFood = false

       if(food.length === 0) {
           for (var i = 0; i < 10; i++) {
                food.push(this.getRandomGrid())
           }
       }

        food = food.filter(function(f) {
            if (f.row === head.row && f.col === head.col) {
               wasFood = true;
            }
            return !(f.row === head.row && f.col === head.col);
        });

       if (wasFood) {
            food.push(this.getRandomGrid())
       } else {
         tail.pop();
       }

       // Snake moves head
       switch (currentDirection) {
         case 'left':
           head.col--;
           head.v = {
               x: -1,
               y: 0
           }
           break;

         case 'up':
           head.row--;
           head.v = {
               x: 0,
               y: 1
           }
           break;

         case 'down':
           head.row++;
           head.v = {
               x: 0,
               y: -1
           }
           break;

         case 'right':
         default:
           head.col++;
           head.v = {
               x: 1,
               y: 0
           }
           break;
       }

       const newState = {
         ...state,
         food,
         snake: {
           head,
           tail
         }
       }

       // In new state, check if die conditions are met
       let die = false;
       tail.forEach(t => {
         if (t.row === newState.snake.head.row && t.col === newState.snake.head.col) {
          die = true;
         }
       })


       // if (newState.snake.head.row < 0) {
       //      newState.snake.head.row = this.state.rows - 1
       // }
       // if (newState.snake.head.row > this.state.rows - 1) {
       //      newState.snake.head.row = 0
       // }
       // if (newState.snake.head.col < 0) {
       //      newState.snake.head.col = this.state.rows - 1
       // }
       // if (newState.snake.head.col > this.state.rows - 1) {
       //      newState.snake.head.col = 0
       // }

   // Code for killing on wall imact

       if (newState.snake.head.row < 0 ||
         newState.snake.head.row >= this.state.rows ||
         newState.snake.head.col < 0 ||
         newState.snake.head.col >= this.state.rows
       ) {
         die = true;
       }


       const grid = this.resetGrid(newState, true);
       const score = newState.snake.tail.length * newState.scoreFactor;

       return {
         ...newState,
         die,
         grid,
         score,
       }
     });

   }

   handleKeyPress(e) {
     e.preventDefault();
     let {
       currentDirection
     } = this.state;

     switch (e.keyCode) {
       case 37:
         if(currentDirection !== 'right'){
              currentDirection = 'left';
         }
         break;

       case 38:
           if(currentDirection !== 'down'){
                currentDirection = 'up';
           }
         break;

       case 39:
       default:
         if(currentDirection !== 'left'){
              currentDirection = 'right';
         }
         break;

       case 40:
         if(currentDirection !== 'up'){
              currentDirection = 'down';
         }
         break;
     }

     const newState = {
       ...this.state,
       currentDirection,
     }
     const grid = this.resetGrid(newState, true);


     this.setState(state => {
       return {
         ...newState,
         grid
       }
     })
   }

   componentDidMount() {

     document.body.addEventListener('keydown', this.handleKeyPress);

     this.setState((state) => {
       const newState = {
         ...state,
         food: state.food,
         snake: {
               head: {
                   row: this.getCenterOfGrid().row,
                   col: this.getCenterOfGrid().col-10,
                   v: {
                       x: 1,
                       y: 0
                   }
                },
           tail: state.snake.tail
         }
       };
       const grid = this.resetGrid(newState, true);
       return {
         ...newState,
         grid,
       }
     });

     this.resetGrid();

     // Set tick
     window.fnInterval = setInterval(() => {
       this.gameTick();
     }, this.state.tickTime);
   }

   componentWillUnmount() {
     document.body.removeEventListener('keydown', this.handleKeyPress);
     clearInterval(window.fnInterval);
   }

   render() {
     let gridContent = this.state.grid.map((grid) => {
       return <div
         key={grid.row.toString() + '-' + grid.col.toString()}
         className={
           grid.isHead
           ? 'gridItem is-head' : grid.isTail
           ? 'gridItem is-tail' : grid.isFood
           ? 'gridItem is-food' : 'gridItem'
         }></div>
     });
     if (this.state.die) {
       gridContent = <div className="grid-message">
         <h1>Game Over</h1>
       </div>;
     };
     return (
       <div className="snake-container wrapper">
         <div className="grid-header">
           <h1>Your score: {this.state.score}</h1>
         </div>
         <div className="grid">{gridContent}</div>
         </div>
     );
   }  }

export default Game3;
