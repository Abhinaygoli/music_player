var playerSectionElement = document.getElementById("player-section")
var playerListSectionElement = document.getElementById("player-list-section")

var gettingElementsInLocal = JSON.parse(localStorage.getItem("audio"))
$.get("https://5dd1894f15bbc2001448d28e.mockapi.io/playlist",function(response){
    var audiosList = response
    localStorage.setItem("audio",JSON.stringify(audiosList))

    for(var i = 0 ; i < audiosList.length ; i++){
        playerListSectionElement.innerHTML +=`
                <div class="audio-mini-section" id=${i} onclick="clickedOnAudioFile(${i})">
                    <img src="${audiosList[i].albumCover}"
                    class=""/>
                    <div class="content">
                        <h3>${audiosList[i].track}</h3>
                        <p>${audiosList[i].artist}</p>
                    </div>
                </div>
                `
    }
    
})

//Replacing the audio
var audios = JSON.parse(localStorage.getItem("audio"))
function clickedOnAudioFile(id){
    playerSectionElement.innerHTML = `
        <audio id="playing${id}" autoplay>
        <source src="${audios[id].file}"/>
        </audio>
        <img src="${audios[id].albumCover}"
        class="audioCoverImage" />
        <div class="progress-wrapper">
            <div id="progress-bar${id}" class="progress-bar">

            </div>
        </div>
        <div class="controls">
            <div class="play-button size" title="shuffle" id="shuffle${id}" onclick="shuffle(${id})">
                <i class="fa-solid fa-shuffle"></i>
            </div>
            <div class="play-button size" title="previoussong" id="back${id}" onclick="back(${id})">
                <i class="fa-solid fa-backward-step"></i>
            </div>
            <div class="play-button font-size" id="play${id}" onclick="play(${id})">
                <i class="far fa-pause-circle" id="playAndPause${id}"></i>
            </div>
            <div class="play-button size" title="nextsong" id="next${id}" onclick="next(${id})">
                <i class="fa-solid fa-forward-step"></i>
            </div>
            <div class="play-button size" title="repeat" id="repeat${id}" onclick="repeat(${id})">
                <i class="fa-solid fa-rotate-left"></i>
            </div>
        </div>
        <div>
            <h3 class="track">${audios[id].track}</h3>
            <p class="artist">${audios[id].artist}</p>
        </div>
        `
        progressBar(id)
}

//Play Button
function play(id){
    var audioElement = document.getElementById("playing"+id);
    var iTag = document.getElementById("playAndPause"+id)
    if(iTag.className == "far fa-play-circle"){
        iTag.className = "far fa-pause-circle"
        audioElement.play()
    }else{
        iTag.className = "far fa-play-circle"
        audioElement.pause()
    }
    progressBar(id)

}

//Song repeat
function repeat(id){
    var audioElement = document.getElementById("playing"+id);
    audioElement.currentTime = 0
}

//Progress Bar
function progressBar(id){
    var progressBarElement = document.getElementById("progress-bar"+id)
    var audioElement = document.getElementById("playing"+id);
    audioElement.addEventListener("timeupdate",function(){
        progressBarElement.style.width = (audioElement.currentTime /  audioElement.duration)*100 + "%"
    }) 
}

//NextSong

function next(id){
    if(id == (audios.length -1)){
        id = -1
    }
    playerSectionElement.innerHTML = `
        <audio id="playing${id+1}" autoplay >
        <source src="${audios[id+1].file}"/>
        </audio>
        <img src="${audios[id+1].albumCover}"
        class="audioCoverImage" />
        <div class="progress-wrapper">
            <div id="progress-bar${id+1}" class="progress-bar">

            </div>
        </div>
        <div class="controls">
            <div class="play-button size" title="shuffle" id="shuffle${id+1}" onclick="shuffle(${id+1})">
                <i class="fa-solid fa-shuffle"></i>
            </div>
            <div class="play-button size" title="previoussong" id="back${id+1}" onclick="back(${id+1})">
                <i class="fa-solid fa-backward-step"></i>
            </div>
            <div class="play-button font-size"  id="play${id+1}" onclick="play(${id+1})">
                <i class="far fa-pause-circle" id="playAndPause${id+1}"></i>
            </div>
            <div class="play-button size" title="nextsong" id="next${id+1}" onclick="next(${id+1})">
                <i class="fa-solid fa-forward-step"></i>
            </div>
            <div class="play-button size" title="repeat" id="repeat${id+1}" onclick="repeat(${id+1})">
                <i class="fa-solid fa-rotate-left"></i>
            </div>
        </div>
        <div>
            <h3 class="track">${audios[id+1].track}</h3>
            <p class="artist">${audios[id+1].artist}</p>
        </div>
        `
        progressBar(id+1)
}

function back(id){
    if(id ==0){
        id = 7
    }
    playerSectionElement.innerHTML = `
        <audio id="playing${id-1}" autoplay>
        <source src="${audios[id -1].file}"/>
        </audio>
        <img src="${audios[id-1].albumCover}"
        class="audioCoverImage" />
        <div class="progress-wrapper">
            <div id="progress-bar${id-1}" class="progress-bar">

            </div>
        </div>
        <div class="controls">
            <div class="play-button size" title="shuffle" id="shuffle${id-1}" onclick="shuffle(${id-1})">
                <i class="fa-solid fa-shuffle"></i>
            </div>
            <div class="play-button size" title="previoussong" id="back${id-1}" onclick="back(${id-1})">
                <i class="fa-solid fa-backward-step"></i>
            </div>
            <div class="play-button font-size"  id="play${id-1}" onclick="play(${id-1})">
                <i class="far fa-pause-circle" id="playAndPause${id-1}"></i>
            </div>
            <div class="play-button size" title="nextsong" id="next${id-1}" onclick="next(${id-1})">
                <i class="fa-solid fa-forward-step"></i>
            </div>
            <div class="play-button size" title="repeat" id="repeat${id-1}" onclick="repeat(${id-1})">
                <i class="fa-solid fa-rotate-left"></i>
            </div>
        </div>
        <div>
            <h3 class="track">${audios[id-1].track}</h3>
            <p class="artist">${audios[id-1].artist}</p>
        </div>
        `
        progressBar(id-1)
}


function shuffle(){
    var randomSong = Math.floor(Math.random()*audios.length)
    playerSectionElement.innerHTML = `
        <audio id="playing${randomSong}" autoplay>
        <source src="${audios[randomSong].file}"/>
        </audio>
        <img src="${audios[randomSong].albumCover}"
        class="audioCoverImage" />
        <div class="progress-wrapper">
            <div id="progress-bar${randomSong}" class="progress-bar">

            </div>
        </div>
        <div class="controls">
            <div class="play-button size" title="shuffle" id="shuffle${randomSong}" onclick="shuffle(${randomSong})">
                <i class="fa-solid fa-shuffle"></i>
            </div>
            <div class="play-button size" title="previoussong" id="back${randomSong}" onclick="back(${randomSong})">
                <i class="fa-solid fa-backward-step"></i>
            </div>
            <div class="play-button font-size"  id="play${randomSong}" onclick="play(${randomSong})">
                <i class="far fa-pause-circle" id="playAndPause${randomSong}"></i>
            </div>
            <div class="play-button size" title="nextsong" id="next${randomSong}" onclick="next(${randomSong})">
                <i class="fa-solid fa-forward-step"></i>
            </div>
            <div class="play-button size" title="repeat" id="repeat${randomSong}" onclick="repeat(${randomSong})">
                <i class="fa-solid fa-rotate-left"></i>
            </div>
        </div>
        <div>
            <h3 class="track">${audios[randomSong].track}</h3>
            <p class="artist">${audios[randomSong].artist}</p>
        </div>
        `
        progressBar(randomSong)
}