// Sockets Connection
// var socket = io.connect('http://192.168.23.212:4000')
var socket = io.connect('https://electron-sockets-server.herokuapp.com/');
let username = null;

window.electronAPI.setDisplayName((ev, user) => {
    username = user
})

let section = document.querySelector('section');

let message = document.querySelector('#message');
let by = document.querySelector('#by');

let send = document.querySelector('#send');

send.addEventListener('click', () => {

    //Socket Test Emit!!
    socket.emit('todo', {
        todo: message.value,
        author: username
    });
    message.value = ''

})    

socket.on('todo', (item) => {
        
    if(item.author == username)
        yourMessage(item);
    else
        othersMessage(item);

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

function othersMessage(item) {

    new Notification(`Message From ${item.author}`, { body: item.todo, icon: './icons/512x512.png' })
    const ding = new Audio;
    ding.src = '../sounds/noti.mp3'
    ding.play();

    let todo = document.createElement('h2')
    todo.style.color = 'rgb(108, 108, 108)'
    todo.className = 'text-xl text-slate-600 font-bold'
    todo.innerHTML = item.todo

    let author = document.createElement('h4')
        author.style.color = 'rgb(192, 192, 192)'
        author.style.textAlign = 'left'
        author.className = 'text-sm text-slate-600 font-italic'
        author.innerHTML =  item.author 

    let itemBlock = document.createElement('nav')
        itemBlock.appendChild(todo);
        itemBlock.appendChild(author);

        itemBlock.className = "text-lg p-4 mb-2 shadow-xl rounded-xl static";
        itemBlock.style.width = 'fit-content'
        itemBlock.style.color = 'black'
        // itemBlock.style.marginLeft = 'auto'
        itemBlock.style.marginRight = 'auto'

    section.appendChild(itemBlock)
    section.scrollTo(0, section.scrollHeight);

}

function yourMessage(item) {
    
    const msg = new Audio;
    msg.src = '../sounds/msg.mp3'
    msg.play();

    let todo = document.createElement('h2')
    todo.style.color = 'white'
    todo.className = 'text-xl text-white font-bold'
    todo.innerHTML = item.todo

    let author = document.createElement('h4')
        author.style.color = 'white'
        author.style.textAlign = 'right'
        author.className = 'text-sm text-white font-italic'
        author.innerHTML =  'you' 
        // + ' on ' + formatDate(new Date());

    let itemBlock = document.createElement('nav')
        itemBlock.appendChild(todo);
        itemBlock.appendChild(author);

        itemBlock.className = "text-lg p-4 mb-2 shadow-xl rounded-xl static";
        itemBlock.style.width = 'fit-content'
        itemBlock.style.color = 'white'
        itemBlock.style.backgroundColor = 'rgb(96,165,250)'
        itemBlock.style.marginLeft = 'auto'
        // itemBlock.style.marginRight = 'auto'

    section.appendChild(itemBlock)
    section.scrollTo(0, section.scrollHeight);

}

document.addEventListener('keydown', (e) => {
    if(e.key == "Enter"){
        socket.emit('todo', {
            todo: message.value,
            author: username
        });
    message.value = ''
    }
})