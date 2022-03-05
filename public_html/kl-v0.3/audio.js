// AUDIO 

let hasClickedOnCanvas = false

let introDiv = document.getElementById("intro")
introDiv.onclick = () => {
    document.body.click()
}

// NOTE ARRAYS

progression = [
    ["E2", "G2", "B3"],
    ["F2", "A2", "C3"],
    ["F2", "G2", "C3"],
    ["A2", "C2", "E3"],
    ["G2", "B2", "D3"],
    ["G2", "C2", "D3"],
    ["C2", "G2", "F3"],
    ["C2", "G2", "E3"],
]

counter = 0

setInterval(() => {
    counter = (counter + 1) % progression.length
    console.log(counter)
}, 10000);

// START AUDIO WITH USER GESTURE

let reverb, synth


document.body.onclick = async () => {

    introDiv.remove()

    // TALKING SYNTH
    //create a synth and connect it to the main output (your speakers)

    reverb = new Tone.Reverb().toDestination()
    // synth = new Tone.Synth().connect(reverb);

    reverb.wet = 1
    reverb.decay = 10
    reverb.preDelay = 0.01

    // synth.volume.value = -24;
    // synth.oscillator.type = "sawtooth"

    // synth.envelope.attack = 1.5
    // synth.envelope.attackCurve = "linear"
    // synth.envelope.decay = 0.1
    // synth.envelope.sustain = 1
    // synth.envelope.release = 1.5
    // synth.envelope.releaseCurve = "linear"
    await Tone.start()
    hasClickedOnCanvas = true
    console.log(hasClickedOnCanvas)
    document.body.onclick = null
}


pubSub.subscribe("deletion", data => {

    // TALKING SYNTH
    if (!speechSynthesis.speaking && hasClickedOnCanvas) {
        // play(data)
    }

    //EVENT SYNTH SynthPing
    if (hasClickedOnCanvas) {
        // let panner = new Tone.Panner(Math.random()).connect(reverb)
        // let synth = new Tone.Synth().connect(panner)
        // let rNote = randomInt(progression[counter].length)
        // let timeGuassian = Math.random()
        // synth.triggerAttack(progression[counter][rNote][0] + `${randomInt(2) + 4}`)
        // synth.triggerRelease("+" + (Tone.Time("32n").toSeconds()))
        // console.log(synth)

    }

})

pubSub.subscribe("word", (x) => {
    // console.log(x)
    if (hasClickedOnCanvas) {
        let panner = new Tone.Panner(Math.random()).connect(reverb)
        let synth = new Tone.Synth().connect(panner)
        let rNote = randomInt(progression[counter].length)
        synth.triggerAttackRelease(progression[counter][rNote][0] + `${randomInt(2) + 4}`, "8n")
        setTimeout(() => {
            synth.dispose()
            panner.dispose()
        }, 3000)
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
