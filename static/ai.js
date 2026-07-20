
let gifData; 
let animation;
let startBtn; 
let stopBtn;
let message;
let info; 
let total_frames;
let duration;
let timeout;
document.addEventListener("DOMContentLoaded",()=>{
    gifData = "";
    timeout = null;
    total_frames = 0;
    duration = 50;
    animation = document.querySelector("#animation");
    startBtn = document.querySelector("#start-btn");
    stopBtn = document.querySelector("#stop-btn");
    message = document.querySelector("#message");
    info = "\u2714\uFE0F AI Model is ready. Click on <strong>start</strong>";
    load();
})

function load(){
    message.innerHTML = "\u{1F504} please wait! Model is loading....";
    const request = new XMLHttpRequest();
    request.open("GET","/animate");
    request.onload = () =>{
        const data = JSON.parse(request.responseText);
        if(request.status === 200){
            gifData = data.gifData;
            total_frames = data.Total_frames;
            if(gifData){
                startBtn.disabled = false;
                message.innerHTML = info;
                message.classList.remove("alert-warning");
                message.classList.add("alert-success");
            }
        }else{
            message.innerHTML = "\u26A0 Something went wrong while loading.....";
        }
    };
    request.send();
    return false;
    
}

function start(){

    message.style.display = "none";
    startBtn.disabled = true;
    stopBtn.disabled = false;
    animation.src = `data:image/gif;base64,${gifData}`;
    animation.style.display = "block";
    const animationTime = 2 * (total_frames * duration);
    
    timeout = setTimeout(()=>{
        animation.src = "";
        animation.style.display = "none";
        message.style.display = "block";
        message.classList.remove("alert-success", "alert-secondary");
        message.classList.add("alert-light");
        message.innerHTML = "\u2705 Completed! Click on start to play again...";
        startBtn.disabled = false;
        stopBtn.disabled = true;
    },animationTime);  
  
}

function stop(){
    if(timeout!== null){
        clearTimeout(timeout);
        timeout = null;
    }
    animation.src = "";
    animation.style.display = "none";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    message.innerHTML = "\u23F8\uFE0F Stopped! Click on <strong>start</strong>...";
    message.classList.remove("alert-warning" , "alert-danger", "alert-success");
    message.classList.add("alert-secondary");
    message.style.display = "block";
}  
