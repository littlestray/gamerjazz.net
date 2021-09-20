//By: little_stray
//https://github.com/littlestray/doves-in-space
//https://twitter.com/little_stray
//Dec. 15 2020

let path = window.location + window.path
let clock, editor

let eventCheckInterval, creator;

console.log(path)


function init(fps) {
    creator = new Creator(document.getElementById("sky"));
    eventCheckInterval = setInterval(() => {
        
        Math.random() > 0.66 ? creator.addDove() : null
    }, 666)
    
    

    // return window.requestAnimationFrame(gameLoop)
}

function update() {


}

function draw() {

}


function gameLoop() {

    update()
    draw()
    window.requestAnimationFrame(gameLoop)
}
