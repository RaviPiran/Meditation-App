const playPauseBtn = document.querySelector(".play-pause-btn");
const videoEl = document.querySelector("video.video");
const elapsedTimeEl = document.querySelector(".elapsed-time");
const outline = document.querySelector(".seeker-outline circle");
const outlineLength = outline.getTotalLength();
const audio = new Audio();

const defaultAudioSrc = "./music/seafull.mp3";
const defaultVideoSrc = "./video/sea.mp4";

let duration = 300; //seconds
let currentTime = 0; //seconds

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

function togglePlay(){
    if(audio.src){
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
    }else{
        audio.src = defaultAudioSrc;
        audio.play();
    }
    toggleVideo()
    toggleControlBtn();
}


function toggleControlBtn(){
    if(playPauseBtn.classList.contains("play") || !audio.paused){
        playPauseBtn.classList.replace("play", "pause");
    }else{
        playPauseBtn.classList.replace("pause", "play");
    }
}

function toggleVideo(){
    if(videoEl.src){
        if(videoEl.paused){
            videoEl.play();
        }
    }else{
        videoEl.src = defaultVideoSrc;
        videoEl.play()
    }
}

audio.addEventListener("timeupdate", ()=>{
    currentTime = audio.currentTime;
    let elapsedTime = duration - currentTime;
    let seconds = Math.floor(elapsedTime % 60).toString().padStart(2, '0');
    let minutes = Math.floor(elapsedTime / 60);
    elapsedTimeEl.textContent = `${minutes}:${seconds}`
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    if(currentTime >= duration){
        audio.pause();
        audio.currentTime = 0;
        videoEl.pause();
        toggleControlBtn();
    }
});

audio.addEventListener("ended", ()=>{
    console.log("why")
})

const musicEls = document.querySelectorAll('.music-select-btn')
musicEls.forEach(musicEl => {
    musicEl.addEventListener("click", (event)=>{
        const el = event.target.closest('button');
        audio.src = el.dataset.music;
        videoEl.src = el.dataset.video;
        toggleVideo();
        togglePlay();
        toggleControlBtn();
    })
});

const timeEls = document.querySelectorAll(".time-select-btn");
timeEls.forEach(timeEl => {
    timeEl.addEventListener("click", (event)=>{
        const el = event.target.closest("button");
        duration = el.dataset.time;
    })
})

playPauseBtn.addEventListener('click', togglePlay)