let board=document.getElementById("gameBoard");
const blocksize=60;
const col=Math.floor(board.clientWidth/blocksize);
const row=Math.floor(board.clientHeight/blocksize);
console.log(col,"  ",row);
board.style.gridTemplateColumns=`repeat(${col},${blocksize}px)`;
board.style.gridTemplateRows=`repeat(${row},${blocksize}px)`;
let blocks=[];
const snake=[
    {x:3,y:3},
    {x:4,y:3},
    {x:5,y:3}
];
let direction="right";
for(let r=0;r<row;r++){
    for(let c=0;c<col;c++){
        let block=document.createElement("div");
        block.classList.add("innerBlock");
        board.appendChild(block);
        block.innerText=`${r},${c}`;
        blocks[`${r}-${c}`]=block;
    }
}
function renderSnake(){
    for(let i=0;i<snake.length;i++){
        let block=blocks[`${snake[i].y}-${snake[i].x}`];
        block.classList.add("fill");
    }}
    setInterval(()=>{
        let head=null;
        if(direction=="left"){
            head={x:snake[0].x-1,y:snake[0].y};
        }
        if(direction=="right"){
            head={x:snake[0].x+1,y:snake[0].y};
        }
        if(direction=="top"){
            head={x:snake[0].x,y:snake[0].y-1};
        }
        if(direction=="down"){
            head={x:snake[0].x,y:snake[0].y+1};
        }
        snake.unshift(head);
        renderSnake();
    },500);