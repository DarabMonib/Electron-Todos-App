const { app, BrowserWindow, ipcMain } = require('electron')
const { dirname } = require('path')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icons/512x512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload/preload-home.js')
    },
    frame: false
  })
  win.maxCount = 1;

  win.loadFile('src/views/home.html')

  win.on('close', () => {
    app.quit();
  })

  const win2 = new BrowserWindow({
    width: 600,
    height: 400,
    icon: path.join(__dirname, 'icons/512x512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload/preload-add.js')
    },
    frame: false,
    show: false
  })
  win2.maxCount = 1;

  win2.on('close', (event) => {
    event.preventDefault()
    // win2.hide()
  })

  win2.loadFile('src/views/add.html')

  ipcMain.on('openWin2', () => {
    console.log('Opening Window Number 2...')
    win2.show()
  })
  
  // Initial Todo's Render
  win.webContents.on('did-stop-loading', (e) => {
    console.log('Loading Win Complete!')
    // initialRender(win)
  });

  ipcMain.on('sendItem', (e, item) => {
    // Sending items to win 1
    win.webContents.send('fowardItem', item)
  })

  // Nav Controls... Win 1.. 
  ipcMain.on('changeHome', (e, str) => {

    if(str == 'close'){
      win2.close();
      win.close();
      app.quit();
    }
    else if(str == 'max'){
      win.maxCount++;
      if(win.maxCount%2==0)
        win.maximize();
      else
        win.unmaximize();
    }
    else if(str == 'min'){
      if(win.minimizable)
        win.minimize();
    }
  })

  // Nav Controls... Win 2.. 
  ipcMain.on('changeAdd', (e, str) => {

    if(str == 'close'){
      win2.hide();
    }
    else if(str == 'max'){
      win2.maxCount++;
      if(win2.maxCount%2==0)
        win2.maximize();
      else
        win2.unmaximize();
    }
    else if(str == 'min'){
      if(win2.minimizable)
        win2.minimize();
    }
  })

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// function initialRender(win){
//   Todo.find({}).then((todos) => {
//     console.log('got data from mongo!')
//     win.webContents.send('init', todos)
//   })
// }