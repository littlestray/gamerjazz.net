
function saveGram() {

    var today = new Date();
    localStorage.setItem(today.toLocaleString(), gramText.value)
    
}

function remember(){

    let output
    
    output = localStorage.key(Math.floor(Math.random() * localStorage.length) - 1)
    output += ` ~ ${localStorage.getItem(output)}`
    memoryBox.innerHTML = output

}


let submitButton = document.getElementById("submit")
submitButton.onclick = saveGram

let gramText = document.getElementById("gram")

let memoryBox = document.getElementById("memoryBox")

let remindButton = document.getElementById("remind")
remindButton.onclick = remember