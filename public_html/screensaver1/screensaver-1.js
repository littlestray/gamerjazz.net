// jshint -W033
// jshint esversion:6

//-------------------------------------------------------------------------STYLE

document.body.style.backgroundColor = "#000"
document.body.style.color = "#fff"
document.body.style.fontFamily = `monospace`
document.body.style.lineHeight = 0.566

//---------------------------------------------------------------------------HUD

const infoDiv = document.createElement("div")
const timeDisplay = document.createElement("p")

infoDiv.appendChild(timeDisplay)

infoDiv.style.position = "fixed"
infoDiv.style.width = "50px"
infoDiv.style.right = "50px"
timeDisplay.innerHTML = "butts"
document.body.append(infoDiv)

//------------------------------------------------------------------------OUTPUT

const worldDiv = document.createElement("div")
document.body.append(worldDiv)

//--------------------------------------------------------------------------GRID

const width = 50
const height = width

const nullCell = "_"
const liveCell = "|"

let world = [];

for (let i = 0; i < width * height; i++) {
  world.push(nullCell);
}

console.log(world);

//--------------------------------------------------------------------------LOOP

let prevTime = 0;
let deltaTime;

function loop(time) {
  deltaTime = time - prevTime;

  timeDisplay.innerHTML = deltaTime;
  prevTime = time;

  update(time, deltaTime);

  worldDiv.innerHTML = worldToHTML();
  window.requestAnimationFrame(loop);
}

let spawnTimer = 0
const spawnInterval = 0

function update(time, deltaTime) {
  spawnTimer = spawnTimer + deltaTime
  if (spawnTimer > spawnInterval) {
    spawnTimer = 0
    let x = randInt(width) 
    let y = randInt(height) 
    let i = xy2I(x,y)

    if (world[i] == nullCell) {
      world[i] = liveCell
    } else if (world[i] == liveCell) {

        (x - 1 >= 0)     ? world[xy2I(x-1, y)] = liveCell : world[xy2I(width-1, y)] = liveCell;
        (x + 1 < width)  ? world[xy2I(x+1, y)] = liveCell : world[xy2I(0, y)] = liveCell;
        (y - 1 >= 0)     ? world[xy2I(x, y-1)] = liveCell : world[xy2I(x, height-1)] = liveCell;
        (y + 1 < height) ? world[xy2I(x, y+1)] = liveCell : world[xy2I(x, 0)] = liveCell;
        world[i] = nullCell

    }
  }
}

//--------------------------------------------------------------------UTILS

function randInt(number) {
  return Math.floor(Math.random() * number);
}

function worldToHTML() {
  let html = "";

  for (let i = 0; i < world.length; i++) {
    html += world[i];
    if (i % width == width - 1) {
      html += "<br>";
    }
  }

  return html;
}

function xy2I(x,y){
    return x + (y * height)
}

//---------------------------------------------------------------------INIT_LOOP

window.requestAnimationFrame(loop);
