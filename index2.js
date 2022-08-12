let button = document.querySelector('button');
let input = document.querySelector('input');

button.addEventListener('click', () => {

    if(input.value !== '')
        window.electronAPI.sendItem(input.value)

})

let closeBtn = document.querySelector('div');

closeBtn.addEventListener('click', () => {
    window.electronAPI.hideWin2(true);
})