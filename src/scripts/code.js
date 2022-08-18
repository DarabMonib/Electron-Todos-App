// Sockets Connection
var socket = io.connect('http://192.168.23.212:4000')

let screen = document.querySelector('#live-code');
let compile = document.querySelector('#compile');
let lastVal = '';

// screen.addEventListener('input', (e) => {
//     socket.emit('codeChange', e.target.value)
// })

var myCodeMirror = CodeMirror(screen, {
    theme: "darcula",
    mode: 'javascript',
    value: '\n\t// Start Live-code here! 🎉',
    lineWrapping: true,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
})

var myCodeOutput = CodeMirror(screen, {
    mode: 'powershell',
    lineWrapping: true,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true
})
myCodeOutput.setSize(null, 160)

compile.className = 'bg-green-400 fixed text-xs text-white p-2 m-2 shadow-lg cursor-pointer fixed bottom-4 right-4 bg-white z-10'
compile.style.width = 'fit-content'

compile.addEventListener('click', () => myCodeOutput.setValue(String(eval(myCodeMirror.getValue()))))


    // document presses..
        // if code is same like last skip..
        // else socket..

    document.addEventListener('keyup', () => {
        if(lastVal != ''){
            let newVal = String(myCodeMirror.getValue())
            if(lastVal != newVal){
                console.log(lastVal + ' != ' + newVal);
                lastVal = newVal;
                socket.emit('codeChange', newVal);
            }
            else {
                console.log('no changes made..')
            }
        }
        else{
            lastVal = String(myCodeMirror.getValue())
        }
    })

    socket.on('codeChange', (val) => {
        myCodeMirror.setValue(val);
        myCodeMirror.setCursor(myCodeMirror.lineCount(), 0);

    })