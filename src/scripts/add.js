let button = document.querySelector('button');
let todo = document.querySelector('#todo');
let author = document.querySelector('#author');

button.addEventListener('click', () => {

    if(todo.value !== '' && author.value !== ''){
        window.electronAPI.sendItem({
            todo: todo.value,
            author: author.value
        })
    }
})

let closeBtn = document.querySelector('#closeBtn');
let minBtn = document.querySelector('#minBtn');
let maxBtn = document.querySelector('#maxBtn');

closeBtn.addEventListener('click', () => {
    window.electronAPI.changeAdd('close');
})

minBtn.addEventListener('click', () => {
    window.electronAPI.changeAdd('min');
})

maxBtn.addEventListener('click', () => {
    window.electronAPI.changeAdd('max');
})