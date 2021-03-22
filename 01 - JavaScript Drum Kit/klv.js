// my version of JS drum kit - using objects 
const keys = [
    { letter: 'A', key: '65', sound: 'clap', div:{}, audio:{} },
    { letter: 'S', key: '83', sound: 'hihat', div:{}, audio:{} },
    { letter: 'D', key: '68', sound: 'kick', div:{}, audio:{} },
    { letter: 'F', key: '70', sound: 'openhat', div:{}, audio:{} },
    { letter: 'G', key: '71', sound: 'boom', div:{}, audio:{} },
    { letter: 'H', key: '72', sound: 'ride', div:{}, audio:{} },
    { letter: 'J', key: '74', sound: 'snare', div:{}, audio:{} },
    { letter: 'K', key: '75', sound: 'tom', div:{}, audio:{} },
    { letter: 'L', key: '76', sound: 'claves', div:{}, audio:{} },
];

// plays whenever key is hit on keyboard
function playSound (code) {
    const key = keys.find(k => k.key == code);
    // console.log('you hit key:', key, code);
    if (!key) return;
    key.div.classList.add('beat');
    key.audio.currentTime = 0;
    key.audio.play();
}
// remove styles after playSound
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('beat');
}

const main = document.querySelector('main');
const soundSection = document.querySelector('section.sounds');

for (let k of keys)
{
    // creating a div elem for every drum-key
    let div = document.createElement('div');
    div.innerHTML = `<kbd class="${k.key}">${k.letter}</kbd><p class='${k.key} sound'>${k.sound}</p>`;
    div.classList.add('key');

    // keyboard & mouse event listeners
    div.addEventListener('transitionend', removeTransition);
    div.onclick = (e) => playSound(k.key);

    // creating an audio elem for every drum-key too
    let audio = document.createElement('audio');
    audio.setAttribute('data-key', k.key);
    audio.src = `sounds/${k.sound}.wav`;

    // adding elems to html
    main.appendChild(div);
    soundSection.appendChild(audio);

    // saving elems to key object in keys array
    k.div = div;
    k.audio = audio;
}

// call playSound on keydown - keyboard event
window.addEventListener('keydown', (e) => {
    console.log(e);
    playSound(e.keyCode);
});