let inputDir = {x:0, y:0};
const foodSound = new Audio('../music/mama.mp3');
const gameOverSound = new Audio("../music/mamaend.mp3");
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 9;
let lastpaintTme = 0;
let score = 0;
let snakeArr = [
    {x:11 , y:12}
]
food = {x:13, y:11}
let board = document.getElementById('board')
let scoreBox = document.getElementById('score-box')
//Game functions
function main(ctime){
    //Game loop
    window.requestAnimationFrame(main);
    if((ctime - lastpaintTme)/1000 < 1/speed) {
        return;
    }
 lastpaintTme = ctime;
  gameEngine();
}

function isColide(snake){
for(let i = 1; i<snakeArr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
}
if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
}
}

function gameEngine() {
    //part 1: Updating the snake array
   if(isColide(snakeArr)){
       gameOverSound.play();
       foodSound.pause();
    musicSound.pause();
    inputDir = {x:0 , y:0};
    alert("Game over Press any key to play")
    snakeArr = [{x:13 , y:12}];
     musicSound.play();
    score = 0;
    scoreBox.innerHTML = "Score: " + score
   }

   //if you have eaten the food and regenerate the food
   if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y })
    let a = 2;
    let b = 16;

    food = {x: Math.round(a+ (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())}
    score += 1;
    scoreBox.innerHTML = "Score: " + score
    if(score > hiscoreval){
        hiscoreval = score;
        hiScoreEl.innerHTML = "High Score:" + hiscoreval
    }
   }

   //Moving the snake
for(let i = snakeArr.length -2 ; i>= 0; i--){
// const element = array[i];
snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;
    // Part 2: Display snake and food
    // Display snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
snakeEl = document.createElement("div")
snakeEl.style.gridRowStart = e.y;
snakeEl.style.gridColumnStart = e.x;
// snakeEl.classList.add('snake')

if(index===0){
    snakeEl.classList.add('head')
}else{
    snakeEl.classList.add("snake")
}
board.appendChild(snakeEl)
    });
    foodEl = document.createElement("div")
foodEl.style.gridRowStart = food.y;
foodEl.style.gridColumnStart = food.x;
foodEl.classList.add('food')
board.appendChild(foodEl)
}


hiScoreEl = document.getElementById("hiscore-box")

//Main Logic
hiscore = localStorage.getItem("hiscore");
if(hiscore ===null){
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}else{
hiscoreval = JSON.parse(hiscore)
   hiScoreEl.innerHTML = "High Score:" + hiscore
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
inputDir = {x:1 , y:0} //start the game
moveSound.play();
musicSound.play()
switch (e.key) {
    case "ArrowUp":
        console.log("Arrow Up")
        inputDir.x = 0;
        inputDir.y = -1;
        break;
    case "ArrowDown":
        console.log("arrow down")
        inputDir.x = 0;
        inputDir.y = 1;
        break;
    case "ArrowRight":
        console.log("arrow right")
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    case "ArrowLeft":
        console.log("arrow left")
        inputDir.x = -1;
        inputDir.y = 0;
        break;

    default:
        break;
}
});