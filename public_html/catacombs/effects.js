const gameStorage = window.localStorage

function fadeInParagraphs(del=1, dur=1) {

    let paragraphs = document.getElementsByTagName('p')

    for(let i = 0; i < paragraphs.length; i++){
        console.log(paragraphs[i])
        paragraphs[i].style.opacity = 0;
        paragraphs[i].style.animation = "fadeIn"
        paragraphs[i].style.animationDelay = `${(i) * del}s`
        paragraphs[i].style.animationDuration = `${dur}s`
        paragraphs[i].style.animationFillMode = `forwards`
    }

}

function saveGame(pageTitle){




}