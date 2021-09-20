//By: little_stray
//https://github.com/littlestray/doves-in-space
//https://twitter.com/little_stray
//Dec. 15 2020

class Creator {

    

    constructor(sky){
        this.sky = sky
        this.doveCount = 0
    }

    addDove(){
        this.doveCount++
        let img      = new Image()
        img.id  = "dove" + this.doveCount
        img.title = img.id
        img.src = "./assets/dove.gif"
        img.style.top  = ((Math.random() * 120) - 10)  + "%"
        img.style.left = ((Math.random() * 140) - 20)  + "%"
        img.style.transform = `rotate(${Math.random() * 360}deg)`
        this.sky.append(img)

    }

    get getDoveCount(){
        return this.doveCount
    }
}
