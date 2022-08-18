// Sockets Connection
var socket = io.connect('http://192.168.23.212:4000')
let compile = document.querySelector('#compile');
let lastVal = '';
let username = window.localStorage.getItem('username');

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
        const { origin } = change;
        console.log(origin, change);
        if(origin != 'setVal'){
            socket.emit('codeChange', [inst.getValue(), username])
        }
    })

    socket.on('codeChange', (val) => {
        editor.setValue(val[0]);
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