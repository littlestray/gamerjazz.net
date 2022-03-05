// AUDIO 

// NOTE ARRAYS

progression = [ 
    ["C2", "G2" ,"E3", "F3"],
    ["C2", "A2" ,"F3", "F3"],
    ["D2", "A2" ,"F3", "A3"],
    ["E2", "G2" ,"B3", "D3"],
    ["F2", "G2" ,"C3", "F3"],
    ["C2", "G2" ,"E3", "F3"],
    ["B2", "G2" ,"D3", "F3"],
    ["C2", "G2" ,"E3", "C3"]
]

counter = 0

// TALKING SYNTH
//create a synth and connect it to the main output (your speakers)
const reverb = new Tone.Reverb().toDestination()
reverb.wet = 1
reverb.decay = 10
reverb.preDelay = 0.01


const synth = new Tone.Synth().connect(reverb);
const now = Tone.now()


synth.volume.value = -24;
synth.oscillator.type = "sawtooth"

synth.envelope.attack  = 1.5
synth.envelope.attackCurve = "linear"
synth.envelope.decay   = 0.1
synth.envelope.sustain = 1
synth.envelope.release = 1.5
synth.envelope.releaseCurve = "linear"

pubSub.subscribe("deletion", data =>{

    if(!speechSynthesis.speaking){
        play(data)
    }
    
})


function play(data) {

    let utterance = new SpeechSynthesisUtterance(data["deletions"].join(" "))

    speechSynthesis.speak(utterance)

    utterance.addEventListener("start", (event) => {
        let rNote = randomInt(progression[counter].length)
        synth.triggerAttack(progression[counter][rNote], now)
    })

    utterance.onboundary = (event) => {
        let rNote = randomInt(progression[counter].length)

        if (event.name === "word") {
            synth.setNote(progression[counter][rNote])
        }

    }

    utterance.addEventListener("end", (event) => {
        synth.triggerRelease()
    })

    counter = (counter + 1) % progression.length

}

function randomInt(num) {
    return Math.floor(Math.random() * num)
}
