// Sockets Connection
var socket = io.connect('http://192.168.23.212:4000')
let compile = document.querySelector('#compile');
let lastVal = '';
let username = window.localStorage.getItem('username');

    let cursors = [];
    let cursorsObj = {};

    // Electro Api..
    var editor = CodeMirror(document.querySelector('#live-code'), {
        theme: "darcula",
        mode: 'javascript',
        value: '\n\t// Start Live-code here! 🎉',
        lineWrapping: true,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true
    })
    editor.setSize(700, 500);

    editor.on('change', (inst, change) => {
        const { origin, to } = change;
        console.log(origin, change);
        if(origin != 'setValue'){
            socket.emit('codeChange', [inst.getValue(), to, username])
        }
    })

    socket.off().on('codeChange', ([val, cursorPos, userTag]) => {
        editor.setValue(val);
    
        // if cursor of that person already exists...
        if(cursors.find(el => el == userTag)){
            editor.setBookmark(cursorPos, { widget: cursors[`${userTag}`] })
        }

        else {
            
            //generateCursor();
            //then move it
        }

    })
    function generateCursor() {
        const cursorCoords = editor.cursorCoords({line: 0, ch: 0});
        const cursorElement = document.createElement('span');
        cursorElement.style.borderLeftStyle = 'solid';
        cursorElement.style.borderLeftWidth = '2px';
        cursorElement.style.borderLeftColor = '#ff0000';
        cursorElement.style.height = `${(cursorCoords.bottom - cursorCoords.top)}px`;
        cursorElement.style.padding = 0;
        cursorElement.style.zIndex = 0;

        return cursorElement;
    }