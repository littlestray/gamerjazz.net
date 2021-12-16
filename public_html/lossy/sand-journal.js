/*
Created by Chris Baldys (@little_stray) Dec. 2021

littlestray.com
chrisbaldys.com

Copyright Chris Baldys 2021

*/

//-------------------------------------------------------------------------STYLE

document.body.style.backgroundColor = "#000"
document.body.style.color = "#fff"
document.body.style.fontFamily = "monospace"
// document.body.style.lineHeight = 0.566

//---------------------------------------------------------------------------HUD

const infoDiv = document.getElementById("info")
const timeDisplay = document.createElement("p")

infoDiv.appendChild(timeDisplay)

infoDiv.style.position = "fixed"
infoDiv.style.width = "50px"
infoDiv.style.right = "50px"
infoDiv.style.display = "none";
timeDisplay.innerHTML = "butts"


//------------------------------------------------------------------------OUTPUT

const worldDiv = document.getElementById("world")


//-------------------------------------------------------------------------INPUT

const inputField = document.getElementById("input")
inputField.style.fontFamily = "monospace"
inputField.placeholder = "Click here and type"

//--------------------------------------------------------------------------GRID



const width = 50
const height = 25

const nullCell = " "
const liveCell = "█"
const safeCell = "▄"

let world = [];

for (let i = 0; i < width * height; i++) {
  world.push(safeCell)
}

//--------------------------------------------------------------------------LOOP

let prevTime = 0
let deltaTime

function loop(time) {
  deltaTime = time - prevTime

  timeDisplay.innerHTML = deltaTime
  prevTime = time

  update(time, deltaTime)

  worldDiv.innerHTML = worldToHTML()
  window.requestAnimationFrame(loop)
}

// all times ms
let spawnTimer = 0
const spawnInterval = 200

function update(time) {
  noise()
  updateInputField()
}

function noise() {
  spawnTimer = spawnTimer + deltaTime
  if (spawnTimer > spawnInterval) {
    spawnTimer = 0
    let x = randInt(width)
    let y = randInt(height)
    let i = xy2I(x, y)
    // TODO change checks
    if (world[i] == nullCell) {
      world[i] = liveCell
    } else if (world[i] == liveCell) {

      (x - 1 >= 0) ? world[xy2I(x - 1, y)] = liveCell : world[xy2I(width - 1, y)] = liveCell;
      (x + 1 < width) ? world[xy2I(x + 1, y)] = liveCell : world[xy2I(0, y)] = liveCell;
      (y - 1 >= 0) ? world[xy2I(x, y - 1)] = liveCell : world[xy2I(x, height - 1)] = liveCell;
      (y + 1 < height) ? world[xy2I(x, y + 1)] = liveCell : world[xy2I(x, 0)] = liveCell;
      world[i] = nullCell

    }
  }
}

let textCursor = 0
let inputString = ""

function updateInputField(){

  inputString = inputField.value;

  for(let i = 0; i < inputString.length; i++){

    if(textCursor % width == width - 1 && inputString[i] != " " && inputString[i] != "-"){
      world[textCursor] = "-"
      textCursor++
    }
    
    world[textCursor] = inputString[i]
    textCursor++
    if (textCursor >= world.length){
      textCursor = 0
    }
  }

  inputString = ""
  inputField.value = ""

}

inputField.addEventListener("keydown", (e) =>{
  console.log(e.code)
  if(e.code === "Backspace"){
    if(!(textCursor - 1 < 0)){
      textCursor--
    }  else {
      textCursor = world.length - 1
    }
    world[textCursor] = " "
  } else if (e.code === "Insert"){
    if(infoDiv.style.display === "none"){
      infoDiv.style.display = "inline-block"
    } else {
      infoDiv.style.display = "none"
    }
  }
})



// inputField.onchange = (x) => {console.log(x)}

//--------------------------------------------------------------------UTILS

function randInt(number) {
  return Math.floor(Math.random() * number);
}

function worldToHTML() {
  let html = "";

  for (let i = 0; i < world.length; i++) {

    if(world[i] === " "){
      html += "&nbsp;"
    } else {
      html += world[i]
    }

    if (i % width == width - 1) {
      html += "<br>";
    }
  }

  return html;
}

function xy2I(x, y) {
  return x + (y * width)
}

//---------------------------------------------------------------------INIT_LOOP

window.requestAnimationFrame(loop);
