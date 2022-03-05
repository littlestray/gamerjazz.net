console.log('yo')
let lingeringDeletions = []

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0,0,0,255);
  }
  
let fadeTicker = 0.001
function draw() {
  // textSize(counter*20);
  background(0,0,0);
  if(new_deletionsUpdated)//(new_listOfDeletions.length>0)
    play()
  if(new_deletionsUpdated){
    for (let index = 0; index < new_listOfDeletions.length; index++) {
      const entry = new_listOfDeletions[index];

      entry.deletions.forEach(deletion => {
        let dely = {
          d: deletion,
          x: random(0,windowWidth),
          y: random(0,windowHeight), 
          pre:random(1000),
          size: random(12,64),
          life : 255,
          rate: random(5,500)*0.01
        }
      //  console.log(dely.rate)
        lingeringDeletions.push(dely)
        // console.log(counter)
        // console.log(filly)
        
      })

      new_listOfDeletions.splice(index, 1)
     
    }
    
  // console.log(listOfDeletions)
 
  }
  if(lingeringDeletions.length)
    delDraw()
}
//TODO: make a class
function delDraw(){
  for (let index = lingeringDeletions.length-1; index >= 0; index--) {
    let del = lingeringDeletions[index];
    // console.log(del)
    if(del.pre<=0){
    del.life -= del.rate
    // console.log(del.life)
    if(del.life<=0){
      lingeringDeletions.splice(index, 1)
      // console.log(lingeringDeletions.length)
    }
    push()
    textSize(del.size)
    fill(255,255,255, del.life)
    text(del.d, del.x, del.y)
    pop()

    }else{
      del.pre -=del.rate
    }
  }
}

