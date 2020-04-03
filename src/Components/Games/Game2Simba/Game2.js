import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './Game2.css';

class Game2 extends Component {
   render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
  
export default Game2;

class Square extends React.Component {
  render() {
    return (
      <div className="square">
        {this.props.value}
      </div>
    );
  }
}

class Board extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.row1 = Array(4).fill(0);
    this.row2 = Array(4).fill(0);
    this.row3 = Array(4).fill(0);
    this.row4 = Array(4).fill(0);
    this.state = {
      score: 0,
      grid: [this.row1, this.row2, this.row3, this.row4],
      gameLost: false
    };
  }
  
  insertRandom()
  {
    const grid = this.state.grid.slice();
    let i = Math.floor((Math.random() * 10000) %4);
		let j = Math.floor((Math.random() * 10000) %4);
		while(grid[i][j] !== 0)
		{
			i = Math.floor((Math.random() * 10000) %4);
			j = Math.floor((Math.random() * 10000) %4);
		}
	  grid[i][j] = 2;
    this.setState((state) => {
      return{grid: grid}
	  });

  }
  
  EmptySpaces()
  {
    for(let i = 0; i < 4; i++)
    {
      for(let j = 0; j < 4; j++)
      {
        if(this.state.grid[i][j] === 0)
        {
          return 1;
        }
      }
    }
    return 0;
  }
  
  
  shiftLeft()
  {
    const grid = this.state.grid.slice();
    let score = this.state.score;
    
    this.prolificateLeft();
    for(let j = 1; j < 4; j++)
    {
      //let moved = true;
      for(let i = 0; i < 4; i++)
      {
        if(grid[i][j-1] === grid[i][j])
        {
          score += grid[i][j-1];
          grid[i][j-1]*=2;
          grid[i][j] = 0;
        }
      }
    }
    this.prolificateLeft();
    
    this.setState((state) => {
      return{score: score}
	  });
  }
  
  shiftDown()
  {
    const grid = this.state.grid.slice();
    let score = this.state.score;
    
    this.prolificateDown();
    for(var i = 2; i >=0; i--)
    {
      for(var j = 0; j < 4; j++)
      {
        if(grid[i+1][j] === grid[i][j])
        {
          score+=grid[i+1][j];
          grid[i+1][j]*=2;
          grid[i][j] = 0;

        }
      }
    }
    this.prolificateDown();
    
    this.setState((state) => {
      return{score: score}
	  });
  }
  
  shiftRight()
  {
    const grid = this.state.grid.slice();
    let score = this.state.score;
    
    this.prolificateRight();
    for(var j = 2; j >=0; j--)
    {
      for(var i = 0; i < 4; i++)
      {
        if(grid[i][j+1] === grid[i][j])
        {
          score+=grid[i][j+1];
          grid[i][j+1]*=2;
          grid[i][j] = 0;

        }
      }
    }
	  this.prolificateRight();
    
    this.setState((state) => {
      return{score: score}
	  });
  }
  
  shiftUp()
  {
    const grid = this.state.grid.slice();
    let score = this.state.score;
	  this.prolificateUp();
    for(let i = 1; i < 4; i++)
    {
      for(let j = 0; j < 4; j++)
      {
        if(grid[i-1][j] === grid[i][j])
        {
          score+=grid[i-1][j];
          grid[i-1][j]*=2;
          grid[i][j] = 0;

        }
      }
    }
    this.prolificateUp();
    this.setState((state) => {
      return{score: score}
	  });
  }
  
  prolificateUp()
  {
    const grid = this.state.grid.slice();
    for(let i = 1; i < 4; i++)
    {
      for(let j = 0; j < 4; j++)
      {
        let index = i;
        while(index > 0 && grid[index-1][j] === 0 && grid[index][j] !== 0)
        {
          grid[index-1][j] = grid[index][j];
          grid[index][j] = 0;
          index--;
        }
      }
    }
    this.setState((state) => {
      return{grid: grid}
	  });
  }
  
  
  prolificateLeft()
  {
    const grid = this.state.grid.slice();
    for(let j = 1; j <4; j++)
    {
      for(let i = 0; i < 4; i++)
      {
        let index = j;
        while(index > 0 && grid[i][index-1] === 0 && grid[i][index] !== 0)
        {
          grid[i][index-1] = grid[i][index];
          grid[i][index] = 0;
          index--;
        }
      }
    }
    this.setState((state) => {
      return{grid: grid}
	  });
  }
  
  prolificateRight()
  {
    const grid = this.state.grid.slice();
    for(let j = 2; j >= 0; j--)
    {
      for(let i = 0; i < 4; i++)
      {
        let index = j;
        while(index <=2 && grid[i][index+1] === 0 && grid[i][index] !== 0)
        {
          grid[i][index+1] = grid[i][index];
          grid[i][index] = 0;
          index++;
        }
      }
    }
    this.setState((state) => {
      return{grid: grid}
	  });
  }
  
  prolificateDown()
  {
    const grid = this.state.grid.slice();
    for(let i = 2; i >= 0; i--)
    {
      for(let j = 0; j < 4; j++)
      {
        let index = i;
        while(index <=2 && grid[index+1][j] === 0 && grid[index][j] !== 0)
        {
          grid[index+1][j] = grid[index][j];
          grid[index][j] = 0;
          index++;
        }
      }
    }
    this.setState((state) => {
      return{grid: grid}
	  });
  }
  
  handleKeyPress(e)
  {
    if(e.key === "w")
    {
      this.shiftUp();
    }
    else if(e.key === "s")
    {
      this.shiftDown();
    }
    else if(e.key === "d")
    {
      this.shiftRight();
    }
    else if(e.key === "a")
    {
      this.shiftLeft();
    }
    if(this.EmptySpaces() === 1)
    {
      this.insertRandom();
    }
    else
    {
      this.setState({gameLost: true});
    }
  }
  
  renderResetButton()
  {
    if(this.state.gameLost === true)
    {
      return "Reset"
    }
    return "Start New Game"
  }
  
  resetGame()
  {
    const grid = this.state.grid.slice();
    for(let i = 0; i < 4; i++)
    {
      for(let j = 0; j < 4; j++)
      {
        grid[i][j] = 0
      }
    }
    this.setState((state) => {
      return{grid: grid, score: 0, gameLost: false}
	  });
  }
  
  renderSquare(i) {
    if(i === 0)
    {
        i = null;
    }
    return <Square value={i}/>;
  }

  render() {
    return (
      <div 
        onKeyDown = {(e) => this.handleKeyPress(e)}
        tabIndex="0" 
        >
        <div id="score">
          {this.state.score}
        </div>
        <button onClick = {() => this.resetGame()}>{this.renderResetButton()}</button>
        <div className="board-row">
          {this.renderSquare(this.state.grid[0][0])}
          {this.renderSquare(this.state.grid[0][1])}
          {this.renderSquare(this.state.grid[0][2])}
          {this.renderSquare(this.state.grid[0][3])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.grid[1][0])}
          {this.renderSquare(this.state.grid[1][1])}
          {this.renderSquare(this.state.grid[1][2])}
          {this.renderSquare(this.state.grid[1][3])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.grid[2][0])}
          {this.renderSquare(this.state.grid[2][1])}
          {this.renderSquare(this.state.grid[2][2])}
          {this.renderSquare(this.state.grid[2][3])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.grid[3][0])}
          {this.renderSquare(this.state.grid[3][1])}
          {this.renderSquare(this.state.grid[3][2])}
          {this.renderSquare(this.state.grid[3][3])}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
