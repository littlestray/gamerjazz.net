let path = window.location + window.path
let clock, editor

let eventCheckInterval;

console.log(path)


function init() {

    eventCheckInterval = setInterval(() => {
        let dueEvents = editor.timer.check()
        if (dueEvents.length > 0) {

            for (let i in dueEvents) {
                console.log(`push this msg: ${dueEvents[i].msg}`)
                let temp = new Notification(dueEvents[i].msg)
            }

        }
    }, 2000)

    clock = document.getElementById("clock")
    editor = new Editor(
        new Timer(),
        document.getElementById("editor"),
        window.localStorage,
        path)

    if (window.localStorage.getItem(path)) {
        editor.text = window.localStorage.getItem(path)
    }

    return window.requestAnimationFrame(gameLoop)
}

function update() {


}

function draw() {
    clock.innerHTML = new Date().toString()
}


function gameLoop() {
    update()
    draw()
    window.requestAnimationFrame(gameLoop)
}
