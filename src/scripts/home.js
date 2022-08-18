// Sockets Connection
var socket = io.connect('http://192.168.23.212:4000')
// var socket = io.connect('https://electron-sockets-server.herokuapp.com/');
let username = null;

let section = document.querySelector('section');
let totalTypers = document.querySelector('.totalTypers');
let message = document.querySelector('#message');
let by = document.querySelector('#by');
let send = document.querySelector('#send');
let closeBtn = document.querySelector('#closeBtn');
let maxBtn = document.querySelector('#maxBtn');
let minBtn = document.querySelector('#minBtn');

// Electro Api..
    window.electronAPI.setDisplayName((ev, user) => {
        username = user
    })

// Events...

    closeBtn.addEventListener('click', () => {
        window.electronAPI.changeHome('close');
    })

    maxBtn.addEventListener('click', () => {
        window.electronAPI.changeHome('max');
    })

    minBtn.addEventListener('click', () => {
        window.electronAPI.changeHome('min');
    })

    message.addEventListener('focus', () => {
        console.log('focus')
        socket.emit('typing', username)
    })
    message.addEventListener('blur', () => {
        console.log('blur')
        socket.emit('stopped', username)
    })

    send.addEventListener('click', () => {
        //Socket Test Emit!!
        sendMessage(message.value, username)
    })

    document.addEventListener('keydown', (e) => {
        if(e.key == "Enter" && message.value !== ''){
            let toInvite = isCodeRequest(message.value)
            if(toInvite){
                sendMessage(`${username} has invited ${toInvite}`, '_inv_send');
                socket.emit('invitation', 'send');
            }
            else
                sendMessage(message.value, username)
        }
    })

// Socket listeners..

    socket.on('todo', (item) => {
            
        if(item.author == username)
            yourMessage(item);
        else if (item.author !== '_inv_send')
            othersMessage(item);
        else
            inviteMessage(item);

    })
    socket.on('typing', (userTypes) => {

        if(userTypes != username){
            let typerBlock = document.createElement('div');
                typerBlock.innerHTML = `<strong>${userTypes}</strong> is typing..`
                typerBlock.className = userTypes

            totalTypers.appendChild(typerBlock);
        }

    })
    socket.on('stopped', (userTypes) => {

        let typerResel = document.querySelector('.' + userTypes);
        typerResel.remove();

    })
    socket.on('invitation', () => {
        window.electronAPI.openCode()
    })

// functions..


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

function inviteMessage(item) {

    new Notification(`Invitation Request!`, { body: item.todo, icon: './icons/512x512.png' })
    const ding = new Audio;
    ding.src = '../sounds/invitation.mp3'
    ding.play();

    let todo = document.createElement('h2')
    todo.style.color = 'rgb(108, 108, 108)'
    todo.className = 'text-xl text-slate-600 font-bold'
    todo.innerHTML = `<div>${item.todo}</div>`

    let controls = document.createElement('div');
        controls.innerHTML = `
        <button style="color: white" class="p-4 bg-green-400 mb-2 shadow-green-400 shadow-xl rounded-xl " onclick="AcceptInv()"> Accept </button>
        <button style="color: white" class="p-4 bg-red-400 mb-2 shadow-red-400 shadow-xl rounded-xl " > Ignore </button>`

    let itemBlock = document.createElement('nav')
        itemBlock.appendChild(todo);

        itemBlock.className = "text-lg p-4 mb-2 shadow-xl rounded-xl static";
        itemBlock.style.width = 'fit-content'
        itemBlock.style.color = 'black'
        itemBlock.style.marginLeft = 'auto'
        itemBlock.style.marginRight = 'auto'

    section.appendChild(itemBlock)
    if(username == item.todo.split(' ')[3]){
        section.appendChild(controls);
    }
    section.scrollTo(0, section.scrollHeight);

}

function sendMessage(msg, user) {
    socket.emit('todo', {
        todo: msg,
        author: user
    });
    message.value = ''
}

function isCodeRequest(messageToCheck) {
    let check = '';
    [...messageToCheck].forEach((e, i) => {
        if(i < 4){
            check += e;
        }
    })
    return check == 'code' ? messageToCheck.split('/')[1] : false

}

function AcceptInv() {
    // Complete....
    console.log('Accepting')
    // Sends response to accept invite..
    socket.emit('invitation' , 'accept')
}
