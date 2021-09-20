class Editor {
    constructor(timer, dom, storage, path) {
        this.timer = timer
        this.storage = storage
        this.path = path

        this.jsonText = dom.children.namedItem("jsonEditor")
        
        // this.jsonText.value = "1200, hello\n1300, goodbye\n1400, noway"

        this.save = dom.children.namedItem("save")
        // this.back = dom.children.namedItem("back")

        this.save.onclick = this.saveData.bind(this)
        // this.back.onclick = this.backEdit.bind(this)
        this.jsonText.oninput = ()=>{
            this.jsonText.classList.add("edit")
        }
        this.jsonText.onchange = ()=>{
            this.jsonText.classList.remove("edit")
            this.jsonText.classList.add("changed")
        }
        this.jsonText.onblur = ()=>{
            if(this.jsonText.classList.contains("edit")){
                this.jsonText.classList.remove("edit");
            }
        }

    }

    saveData() {
        Notification.requestPermission()
        this.timer.clearEvents()
        let lines = this.jsonText.value.split("\n")
        for (let i in lines) {
            let line = lines[i].split(", ")
            let time = line[0]
            let msg = line[1]
            this.timer.addEvent(time, msg)
        }

        this.storage.setItem(path, this.jsonText.value)
        this.jsonText.classList.remove("changed")
        this.jsonText.classList.add("saved")


    }
    backEdit() {
        console.log(this.back)
    }

    set text(text) {
        this.jsonText.value = text
        this.saveData()
    }
}

class Timer {

    constructor() {

        this.events = []
    }

    get time() {
        return this.clock.innerHTML
    }

    addEvent(time, msg) {
        this.events.push(new Event(time, msg))
    }

    getEvents() {
        return this.events
    }

    clearEvents() {
        this.events = []
    }

    check() {
        let output = []
        let time = new Date()
        let hour = time.getHours()
        let min = time.getMinutes()
        for (let i in this.events) {
            if (parseInt(hour) === parseInt(this.events[i].time.substring(0, 2))
                && 
                parseInt(min) === parseInt(this.events[i].time.substring(2, 4))
                && 
                !this.events[i].isDone) {
                this.events[i].isDone = true;
                output.push(this.events[i])
            }
        }
        return output
    }
}

class Event {
    constructor(time, msg) {
        this.time = time
        this.msg = msg
        this.isDone = false
    }

}
