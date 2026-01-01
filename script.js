let board=document.getElementById("gameBoard");
let score=document.getElementById("score");
let highScore=document.getElementById("highScore");
let button=document.getElementById("startButton");
let startModal=document.querySelector(".modal");
let p=document.getElementById("notice");
let restartModal=document.querySelector(".restartGame");
let restartButton=document.getElementById("restartBtn");
highScore.innerText=`High Score: 0`;
const blocksize=60;
const col=Math.floor(board.clientWidth/blocksize);
const row=Math.floor(board.clientHeight/blocksize);
console.log(col,"  ",row);
board.style.gridTemplateColumns=`repeat(${col},${blocksize}px)`;
board.style.gridTemplateRows=`repeat(${row},${blocksize}px)`;
let blocks=[];
const snake=[
    {x:5,y:3},
    // {x:4,y:3},
    // {x:3,y:3}
];
const food={
    x:Math.floor(Math.random()*row),
    y:Math.floor(Math.random()*col)
}
let direction="right";
let intervalId=null;
for(let r=0;r<row;r++){
    for(let c=0;c<col;c++){
        let block=document.createElement("div");
        block.classList.add("innerBlock");
        board.appendChild(block);
        // block.innerText=`${r},${c}`;
        blocks[`${r}-${c}`]=block;
    }
}
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
function moveSnake(){
     intervalId=setInterval(()=>{
        let head=null;
        let snakeSize=snake.length-1;
        let tailBlock=[`${snake[snakeSize].x}-${snake[snakeSize].y}`];
        blocks[tailBlock].classList.remove("fill");
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
        blocks[`${food.x}-${food.y}`].classList.add("food");
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
        renderSnake();
        //game over conditions
         if(head.x<0 || head.x>=row || head.y<0 || head.y>=col){
        // alert("Game Over");
        // button.innerText="Restart Game";
        restartModal.style.display="flex";
        clearInterval(intervalId);
    }
    },300);
}
//starting the game
    button.addEventListener("click",()=>{
        startModal.style.display="none"; 
        moveSnake();  
    });
//restarting the game
    restartButton.addEventListener("click",()=>{
        restartModal.style.display="none";  
        // console.log( blocks[`${food.x}-${food.y}`]);
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        randomFoodPlacement();
        snake.forEach((segment)=>{
            if( blocks[`${segment.x}-${segment.y}`]){
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
        }
        });
        score.innerText=`Score: ${0}`;
        snake.splice(0,snake.length);
        snake.push({x:5,y:3});
        direction="right";
        renderSnake();
        moveSnake();
    });

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