// Sockets Connection
var socket = io.connect('http://192.168.23.211:4000')
// var socket = io.connect('https://electron-socket-server.vercel.app/');

let section = document.querySelector('section');

window.electronAPI.init((e, todos) => {
    console.log(e, todos)
    todos.forEach(item => {
        appendItem(item._doc)
    });
})

window.electronAPI.getImage((e, item) => {
    
    //Socket Test Emit!!
    socket.emit('todo', ["POST", {
        todo: item.todo,
        author: item.author
    }]);

})

socket.on('todo', (item) => {
    console.log(item)
    new Notification(`Message From ${item[1].author}`, { body: item[1].todo, icon: './icons/512x512.png' })
    appendItem(item[1]);
})

let button = document.querySelector('button');

button.addEventListener('click', () => {
    console.log('Sending Socket Signal...')
    window.electronAPI.openWin2(true);
})

//Socket Listener!!
socket.on('test', (str) => {
    console.log('here it is', str);
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

function appendItem(item) {
    
    let todo = document.createElement('h2')
    todo.className = 'text-xl text-white font-bold'
    todo.innerHTML = item.todo

    let author = document.createElement('h4')
        author.className = 'text-sm text-white font-italic'
        author.innerHTML = '~ by ' + item.author 
        // + ' on ' + formatDate(new Date());

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

}