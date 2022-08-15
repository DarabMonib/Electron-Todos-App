let section = document.querySelector('section');
console.log(section);

window.electronAPI.getImage((e, item) => {
    
    new Notification(`Message From ${item.author}`, { body: item.todo, icon: './icons/512x512.png' })

    let todo = document.createElement('h2')
        todo.className = 'text-xl text-white font-bold'
        todo.innerHTML = item.todo

    let author = document.createElement('h4')
        author.className = 'text-sm text-white font-italic'
        author.innerHTML = '~by ' + item.author + ' on ' + formatDate(new Date());
    
    let itemBlock = document.createElement('nav')
        itemBlock.appendChild(todo);
        itemBlock.appendChild(author);

        itemBlock.className = "text-lg text-white p-4 mb-2 bg-blue-500 shadow-xl rounded-xl";
        itemBlock.style.width = 'fit-content'
        itemBlock.style.marginLeft = 'auto'
        itemBlock.style.marginRight = 'auto'

    section.appendChild(itemBlock)

    if(section.children.length !== 0) {

        section.style.border = "2px rgb(236, 236, 236) dotted";
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

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }