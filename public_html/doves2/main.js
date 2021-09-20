//By: little_stray
//https://github.com/littlestray/doves-in-space
//https://twitter.com/little_stray
//Dec. 15 2020

let path = window.location + window.path
console.log(path)

// objects
let eventCheckInterval, creator;

// booleans
let makeDoves = true;
let spinDoves = false

//counters
let spinDovesCounter = 0;

//dove creation attempt interval in ms
let doveSpeed = 1000

//PERFORMANCE BENCHMARK
let counter = 0
let start = Date.now()
let then = start
let avgWindowSize = 100
let avgWindow = []

for (let i = 0; i < avgWindowSize; i++) {
    avgWindow.push(1)
}
console.log(`windowsize: ${avgWindow.length}`)

//SCRIPT EXECUTION
function init(fps) {

    creator = new Creator(document.getElementById("sky"));

    eventCheckInterval = setInterval(() => {

        counter++

        // Calc Average
        let now = Date.now()
        avgWindow[counter % avgWindowSize] = doveSpeed / (now - then)
        let avg = avgWindow.reduce((a, b) => a + b) / avgWindow.length
        
        // Phase 1
        if (makeDoves) {
            Math.random() > 0.33 ? creator.addDove() : null
        }

        // Phase 2

        if(spinDoves){
            spinDovesCounter == 0 ? console.log('spinDoves') : null
            if(spinDovesCounter < document.images.length){
                let i = spinDovesCounter
                let tilt = document.images[i].style.top.slice(0,document.images[i].style.top.length - 1)
                tilt = parseFloat(tilt)

                let tiltMag = document.images[i].style.left.slice(0,document.images[i].style.top.length - 1)
                tiltMag = parseFloat(tilt) / 100
                tiltMag = tiltMag * tiltMag * tiltMag * tiltMag

                console.log(tiltMag)

                document.images[i].style.transform = 
                `rotate(${
                    tilt * (tiltMag)
                }deg)`
                spinDovesCounter++
            } else {
                console.log(`Completion at: ${(now - start) / 1000 / 60}`)
                clearInterval(eventCheckInterval)
            }

        }
        
        if (( avg > 2 || creator.getDoveCount > 999 || now - start > 1320000) && !spinDoves) {
            // clearInterval(eventCheckInterval)
            makeDoves = false
            spinDoves = true


            for (let i = document.images.length; i > 0; i--) {
                //document.images[i - 1].remove()
            }

            console.log(`Threshold at ${(now - start) / 1000 / 60}`)
            console.log(`average: ${avg}`)
            //console.log(`last avgWindow: ${avgWindow}`)
            console.log(`windowsize: ${avgWindow.length}`)
            console.log(`total doves in space: ${creator.getDoveCount}`)
        }

        then = now

    }, doveSpeed)



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

