let closeBtn = document.querySelector('#closeBtn');
let maxBtn = document.querySelector('#maxBtn');
let minBtn = document.querySelector('#minBtn');

    closeBtn.addEventListener('click', () => {
        window.electronAPI.changeHome('close');
    })

    maxBtn.addEventListener('click', () => {
        window.electronAPI.changeHome('max');
    })

    minBtn.addEventListener('click', () => {
        window.electronAPI.changeHome('min');
    })

let userName = document.querySelector('#name');
let continues = document.querySelector('#continue');

continues.addEventListener('click', () => 
    userName.value !== '' ? 
    window.electronAPI.continueToChat(userName.value)
    :''
)

console.log(window.electronAPI)