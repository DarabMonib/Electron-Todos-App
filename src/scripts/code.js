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

    function findDiff(str1, str2){ 
        let diff= "";
        let indx = 0;
        str2.split('').forEach(function(val, i){
          if (val != str1.charAt(i)){
            diff += val ;
            indx = i;
          }
        });
        return [diff, indx];
    }