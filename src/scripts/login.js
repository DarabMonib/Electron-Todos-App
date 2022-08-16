let userName = document.querySelector('#name');
let continues = document.querySelector('#continue');

continues.addEventListener('click', () => 
    userName.value !== '' ? 
    window.electronAPI.continueToChat(userName.value)
    :''
)

console.log(window.electronAPI)