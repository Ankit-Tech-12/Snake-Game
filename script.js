const board=document.getElementById("gameBoard");
const score=document.getElementById("score");
const highScore=document.getElementById("highScore");
const button=document.getElementById("startButton");
const startModal=document.querySelector(".modal");
const p=document.getElementById("notice");
const restartModal=document.querySelector(".restartGame");
const restartButton=document.getElementById("restartBtn");
const gameOverMessage=document.getElementById("gameOverMessage");
const timer=document.getElementById("timer");
let highScoreValue=localStorage.getItem("highScore") || 0;
let timerValue=`00:00`;
const blocksize=60;//60px x 60px blocks
const col=Math.floor(board.clientWidth/blocksize);
const row=Math.floor(board.clientHeight/blocksize);
board.style.gridTemplateColumns=`repeat(${col},${blocksize}px)`;
board.style.gridTemplateRows=`repeat(${row},${blocksize}px)`;
let blocks=[];
const snake=[
    {x:2,y:2},
    // {x:4,y:3},
    // {x:3,y:3}
];
const food={
    x:Math.floor(Math.random()*row),
    y:Math.floor(Math.random()*col)
}
let direction="right";
let intervalId=null;
let timeIntervalId=null;
//creating the board
for(let r=0;r<row;r++){
    for(let c=0;c<col;c++){
        let block=document.createElement("div");
        block.classList.add("innerBlock");
        board.appendChild(block);
        // block.innerText=`${r},${c}`;
        blocks[`${r}-${c}`]=block;
    }
}
//rendering the snake
function renderSnake(){
    for(let i=0;i<snake.length;i++){
        let block=blocks[`${snake[i].x}-${snake[i].y}`];
        if(block){ block.classList.add("fill");}
    }}
    renderSnake();
//random  food placement
function randomFoodPlacement(){
    food.x=Math.floor(Math.random()*row);
    food.y=Math.floor(Math.random()*col);
}
//moving the snake
function moveSnake(){
     intervalId=setInterval(()=>{
        let head=null;
        let snakeSize=snake.length-1;
        let tailBlock=[`${snake[snakeSize].x}-${snake[snakeSize].y}`];
        if( blocks[tailBlock]){
        blocks[tailBlock].classList.remove("fill");
        }
        if(direction=="left"){
            head={x:snake[0].x,y:snake[0].y-1};
        }
        if(direction=="right"){
            head={x:snake[0].x,y:snake[0].y+1};
        }
        if(direction=="top"){
            head={x:snake[0].x-1,y:snake[0].y};
        }
        if(direction=="down"){
            head={x:snake[0].x+1,y:snake[0].y};
        }
        if(!blocks[`${food.x}-${food.y}`].classList.contains("fill")){
        blocks[`${food.x}-${food.y}`].classList.add("food"); 
        }
        else{
            randomFoodPlacement();
        }
        //eating food condition
        if(head.x==food.x && head.y==food.y){
            blocks[`${food.x}-${food.y}`].classList.remove("food");
            if(blocks){
            snake.unshift(head);
        }
            randomFoodPlacement();
            score.innerText=`Score: ${snake.length-1}`;
        }
        snake.unshift(head);
        snake.pop();
        //updating high score
        if(highScoreValue<snake.length-1){
            highScoreValue=snake.length-1;
            localStorage.setItem("highScore",highScoreValue.toString());
            highScore.innerText=`High Score: ${highScoreValue}`;
        }
        renderSnake();
        //game over conditions
         if(head.x<0 || head.x>=row || head.y<0 || head.y>=col ){
        gameOverMessage.innerText=`Game Over! Your Final  Score is ${snake.length-1}`;
        restartModal.style.display="flex";
        clearInterval(intervalId);
    }
    },200); //speed
}
    //starting the game
    button.addEventListener("click",()=>{
        startModal.style.display="none";
        highScore.innerText=`High Score: ${highScoreValue}`; 
        //timer functionality
        timeIntervalId=setInterval(()=>{
        let [min,sec]=timerValue.split(":").map(Number);
        if(sec>59){
            min++
            sec=0;
        }
        else{
            sec++;
        }
        timerValue=`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
        timer.innerText=`Time: ${timerValue}`;
    },1000);
        moveSnake();  
    });
    //restarting the game
    restartButton.addEventListener("click",()=>{
        restartModal.style.display="none";  
        // console.log( blocks[`${food.x}-${food.y}`]);
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        randomFoodPlacement();
        //clearing the snake from the board
        snake.forEach((segment)=>{
            if( blocks[`${segment.x}-${segment.y}`]){
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
        }
        });
        //resetting values
        score.innerText=`Score: ${0}`;
        timer.innerText=`Time: ${timerValue=`00:00`}`;
        snake.splice(0,snake.length);
        snake.push({x:2,y:2});
        direction="right";
        renderSnake();
        moveSnake();
    });
    //controlling the snake
    addEventListener("keydown",(e)=>{
        if(e.key=="ArrowLeft"){
            direction="left";
        }
        if(e.key=="ArrowRight"){
            direction="right";
        }
        if(e.key=="ArrowUp"){
            direction="top";
        }
        if(e.key=="ArrowDown"){
            direction="down";
        }    
    })