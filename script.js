const heart = document.getElementById("heart");
const card = document.getElementById("card");
const typing = document.getElementById("typing");
const enterBtn = document.getElementById("enterBtn");
const tip = document.querySelector(".tip");
const landing = document.getElementById("landing");
const about = document.getElementById("about");
const musicBtn = document.getElementById("musicBtn");
const musicPanel = document.getElementById("musicPanel");
const backTop = document.getElementById("backTop");
const glow = document.querySelector(".cursor-glow");
const stars = document.querySelector(".stars");
const profileCard = document.getElementById("profileCard");

musicPanel.innerHTML = `
  <div class="music-panel-head">
    <span>Now Playing ♡</span>
    <button id="closeMusic" aria-label="Close music player">×</button>
  </div>
  <div class="track-card">
    <div class="disc">♪</div>
    <div><strong>bgm.mp3</strong><p>Xin's little world</p></div>
  </div>
  <audio id="bgm" src="./music/bgm.mp3" loop preload="metadata"></audio>
  <button id="playPause" class="player-main-btn">▶ Play</button>
  <label class="player-label"><span>Progress</span><input id="progressBar" type="range" min="0" max="100" value="0"></label>
  <label class="player-label"><span>Volume</span><input id="volumeBar" type="range" min="0" max="1" step="0.01" value="0.55"></label>
`;

const closeMusic = document.getElementById("closeMusic");
const bgm = document.getElementById("bgm");
const playPause = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const text = `Hello ♡
你好呀

Thank you for finding this place. ♡
謝謝你找到這邊.

I'm Xin. ♡
我是欣欣.

It's nice to meet you. ♡
很高興認識你壓 ~`;

let index = 0;
let played = false;

function makeStars(){
    const icons = ["✦","♡","·","✧"];
    for(let i = 0; i < 42; i++){
        const star = document.createElement("span");
        star.className = "star";
        star.textContent = icons[Math.floor(Math.random() * icons.length)];
        star.style.left = `${Math.random() * 100}%`;
        star.style.fontSize = `${10 + Math.random() * 18}px`;
        star.style.animationDuration = `${8 + Math.random() * 12}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        stars.appendChild(star);
    }
}
makeStars();

document.addEventListener("mousemove", (event) => {
    if(!glow) return;
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
});

heart.addEventListener("click", () => {
    if(played) return;
    played = true;
    heart.classList.add("clicked");
    tip.classList.add("hide");
    setTimeout(() => {
        card.classList.remove("hidden");
        typeWriter();
    }, 380);
});

function typeWriter(){
    if(index < text.length){
        const char = text.charAt(index);
        typing.innerHTML += char;
        index++;
        const pause = [".","♡","~","\n"].includes(char) ? 170 : 42;
        setTimeout(typeWriter, pause);
    }else{
        enterBtn.classList.remove("hidden");
    }
}

enterBtn.addEventListener("click", () => {
    landing.classList.add("exit");
    document.body.classList.add("about-open");
    setTimeout(() => {
        landing.style.display = "none";
        about.classList.add("show");
    }, 760);
});

backTop.addEventListener("click", () => {
    about.classList.remove("show");
    document.body.classList.remove("about-open");
    landing.style.display = "grid";
    setTimeout(() => landing.classList.remove("exit"), 50);
});

const savedVolume = localStorage.getItem("xin-volume");
bgm.volume = savedVolume ? Number(savedVolume) : 0.55;
volumeBar.value = bgm.volume;

musicBtn.addEventListener("click", () => {
    musicPanel.classList.toggle("hidden");
});

closeMusic.addEventListener("click", () => {
    musicPanel.classList.add("hidden");
});

playPause.addEventListener("click", async () => {
    if(bgm.paused){
        await bgm.play();
        playPause.textContent = "⏸ Pause";
        musicPanel.classList.add("playing");
    }else{
        bgm.pause();
        playPause.textContent = "▶ Play";
        musicPanel.classList.remove("playing");
    }
});

bgm.addEventListener("timeupdate", () => {
    if(!bgm.duration) return;
    progressBar.value = (bgm.currentTime / bgm.duration) * 100;
});

progressBar.addEventListener("input", () => {
    if(!bgm.duration) return;
    bgm.currentTime = (progressBar.value / 100) * bgm.duration;
});

volumeBar.addEventListener("input", () => {
    bgm.volume = Number(volumeBar.value);
    localStorage.setItem("xin-volume", bgm.volume);
});

profileCard.addEventListener("mousemove", (event) => {
    const rect = profileCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    profileCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
});
