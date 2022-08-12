let button = document.querySelector('button');
let todo = document.querySelector('#todo');
let author = document.querySelector('#author');

button.addEventListener('click', () => {

    if(todo.value !== '' && author.value !== '')
        window.electronAPI.sendItem({
            todo: todo.value,
            author: author.value
        })

})

let closeBtn = document.querySelector('div');

closeBtn.addEventListener('click', () => {
    window.electronAPI.hideWin2(true);
})