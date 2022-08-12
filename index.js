let section = document.querySelector('section');
console.log(section);

window.electronAPI.getImage((e, item) => {
    
    let todo = document.createElement('nav')
        todo.innerHTML = item.todo

    let author = document.createElement('nav')
        author.innerHTML = item.author
    
    let itemBlock = document.createElement('nav')
        itemBlock.appendChild(todo);
        itemBlock.appendChild(author);

        itemBlock.className = "text-lg text-white p-4 mb-2 bg-blue-500 shadow-xl rounded-xl flex";
        itemBlock.style.width = 'fit-content'
        itemBlock.style.marginLeft = 'auto'
        itemBlock.style.marginRight = 'auto'

    section.appendChild(itemBlock)

    if(section.children.length !== 0) {

        section.style.border = "4px rgb(236, 236, 236) dotted";
        section.style.width = "fit-content";
        section.style.marginLeft = "auto";
        section.style.marginRight = "auto";
        section.style.marginTop = "16px";
        section.style.padding = "20px";

    }

})

let button = document.querySelector('button');

button.addEventListener('click', () => {
    console.log('Okay!')
    window.electronAPI.openWin2(true);
})

let closeBtn = document.querySelector('div');

closeBtn.addEventListener('click', () => {
    window.electronAPI.closeAll(true);
})