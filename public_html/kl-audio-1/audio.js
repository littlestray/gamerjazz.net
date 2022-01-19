let outputDiv = document.getElementById("output")
console.log(outputDiv)

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

function play() {

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");

    let randomIndex = randomInt(listOfDeletions.length)

    let utterance = new SpeechSynthesisUtterance(listOfDeletions[randomIndex]["deletions"].join(" "))
    speechSynthesis.speak(utterance)

    outputDiv.innerHTML = `<a href=${listOfDeletions[randomIndex]["link"]}>${listOfDeletions[randomIndex]["deletions"].join(" ")}</a>`



}

function randomInt(num) {
    return Math.floor(Math.random() * num)
}

setInterval(refresh, 5000);