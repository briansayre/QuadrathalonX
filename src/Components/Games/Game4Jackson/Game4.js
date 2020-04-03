const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

const ROW = 20;
const  COLUMN = 10;
const  squareSize = 20;
const EMPTY = "WHITE"; // color of an empty square

// draw a square
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*squareSize,y*squareSize,squareSize,squareSize);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*squareSize,y*squareSize,squareSize,squareSize);
}

// create the game grid

let gameGrid = [];
for( x = 0; x <ROW; x++){
    gameGrid[x] = [];
    for(y = 0; y < COLUMN; y++){
        gameGrid[x][y] = EMPTY;
    }
}

// draw the grid
function drawGrid(){
    for( r = 0; r <ROW; r++){
        for(c = 0; c < COLUMN; c++){
            drawSquare(c,r,gameGrid[r][c]);
        }
    }
}

drawGrid();

// the pieces and their colors

const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"]
];

// generate random pieces

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    return new Piece( PIECES[r][0],PIECES[r][1]);
}

let p = randomPiece();

// The Object Piece

function Piece(tetromino,color){
    this.tetromino = tetromino;
    this.color = color;
    
    this.tetrominoN = 0; // we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];
    
    // we need to control the pieces
    this.x = 3;
    this.y = -2;
}

// fill function

Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we draw only occupied squares
            if( this.activeTetromino[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}

// draw a piece to the game Grid

Piece.prototype.draw = function(){
    this.fill(this.color);
}

// undraw a piece


Piece.prototype.unDraw = function(){
    this.fill(EMPTY);
}

// move Down the piece

Piece.prototype.moveDown = function(){
    if(!this.collision(0,1,this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        // we lock the piece and generate a new one
        this.lock();
        p = randomPiece();
    }
    
}

// move Right the piece
Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeTetromino)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

// move Left the piece
Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeTetromino)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// rotate the piece
Piece.prototype.rotate = function(){
    let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    let kick = 0;
    
    if(this.collision(0,0,nextPattern)){
        if(this.x > COLUMN/2){
            // it's the right wall
            kick = -1; // we need to move the piece to the left
        }else{
            // it's the left wall
            kick = 1; // we need to move the piece to the right
        }
    }
    
    if(!this.collision(kick,0,nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

let score = 0;

Piece.prototype.lock = function(){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we skip the vacant squares
            if( !this.activeTetromino[r][c]){
                continue;
            }
            // pieces to lock on top = game over
            if(this.y + r < 0){
                alert("Game Over");
                // stop request animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            gameGrid[this.y+r][this.x+c] = this.color;
        }
    }
    // remove full rows
    let scoreTimerFlag = 0; 
    for(r = 0; r < ROW; r++){
        let isRowFull = true;
        for( c = 0; c < COLUMN; c++){
            isRowFull = isRowFull && (gameGrid[r][c] != EMPTY);
        }
        if(isRowFull){
            // if the row is full
            // we move down all the rows above it
            for( y = r; y > 1; y--){
                for( c = 0; c < COLUMN; c++){
                    gameGrid[y][c] = gameGrid[y-1][c];
                }
            }
            // the top row gameGrid[0][..] has no row above it
            for( c = 0; c < COLUMN; c++){
                gameGrid[0][c] = EMPTY;
            }
            // increment the score
            score += 10;
            //TODO and Tetris bonus points
            // if you update four rows then get extra points 

            
            if(score > (scoreTimerFlag +50))
            {
                scoreTimerFlag=scoreTimerFlag  +50;
                timerElement = timerElement -50; 
            }
            if(timerElement < 250)
            {
                timerElement = 250; 
            }
        }
    }
    // update the game Grid
    drawGrid();
    
    // update the score
    scoreElement.innerHTML = score;
}

// collision fucntion

Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // if the square is empty, we skip it
            if(!piece[r][c]){
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            // conditions
            if(newX < 0 || newX >= COLUMN || newY >= ROW){
                return true;
            }
            // skip newY < 0; gameGrid[-1] will crush our game
            if(newY < 0){
                continue;
            }
            // check if there is a locked piece alrady in place
            if( gameGrid[newY][newX] != EMPTY){
                return true;
            }
        }
    }
    return false;
}

// CONTROL the piece

document.addEventListener("keydown",CONTROL);

function CONTROL(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}

// drop the piece every 1sec

let dropStart = Date.now();
let gameOver = false;
let timerElement = 1000; 

function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > timerElement){
        p.moveDown();
        dropStart = Date.now();
    }
    if( !gameOver){
        requestAnimationFrame(drop);
    }
}

drop();
