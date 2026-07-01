const musicPulse = document.createElement('span');
musicPulse.className = 'musicPulse';
musicPulse.textContent = '♪';
document.body.appendChild(musicPulse);

function createHeartBurst(){
  const rect = heart.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for(let i = 0; i < 12; i++){
    const piece = document.createElement('span');
    piece.className = 'heart-burst';
    piece.textContent = Math.random() > .45 ? '♡' : '✦';
    piece.style.left = `${cx}px`;
    piece.style.top = `${cy}px`;
    const angle = (Math.PI * 2 * i) / 12;
    const distance = 90 + Math.random() * 80;
    piece.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    piece.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
    piece.style.setProperty('--rot', `${Math.random() * 180 - 90}deg`);
    piece.style.fontSize = `${14 + Math.random() * 12}px`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

heart.addEventListener('click', createHeartBurst);

const photoEl = document.getElementById('photo');
if(photoEl){
  photoEl.addEventListener('click', () => {
    const box = document.createElement('div');
    box.className = 'photo-lightbox';
    const img = document.createElement('img');
    img.src = './images/AA.jpeg';
    img.alt = 'Xin profile photo';
    box.appendChild(img);
    document.body.appendChild(box);
    box.addEventListener('click', () => box.remove());
  });
}

setInterval(() => {
  const panel = document.getElementById('musicPanel');
  if(panel && panel.classList.contains('playing')){
    musicPulse.classList.add('playing');
  }else{
    musicPulse.classList.remove('playing');
  }
}, 500);
