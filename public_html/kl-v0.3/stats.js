let heatIndexTenSeconds = 1;
let heatIndexOneMinute  = 1;



let lastTenSeconds = []
let lastMinute     = []
pubSub.subscribe("deletion", (x)=>{
    lastTenSeconds.push(new Date())
    lastMinute.push(new Date())
})

let statsInterval = setInterval(()=>{

    lastTenSeconds = lastTenSeconds.filter((x) => {
        return x > new Date(Date.now() - 10000)
    })
    lastMinute = lastMinute.filter((x) => {
        return x > new Date(Date.now() - 60000)
    })
    heatIndexTenSeconds = lastTenSeconds.length / 10
    heatIndexOneMinute  = lastMinute.length / 60

    //console.log(`ten sec: ${heatIndexTenSeconds} ___ one min: ${heatIndexOneMinute}`)


}, 1000)