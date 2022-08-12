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

  win2.on('close', (event) => {
    event.preventDefault()
    // win2.hide()
  })

  win2.loadFile('src/views/add.html')

  ipcMain.on('openWin2', () => {
    console.log('activating!!!')
    win2.show()
  })

  ipcMain.on('sendItem', (e, item) => {
    win.webContents.send('fowardItem', item)
  })

  // Close All Windows Via Custom Button..

  ipcMain.on('closeAll', () => {
    console.log('closing app!..')
    win2.close();
    win.close();
    app.quit();
  })

  ipcMain.on('hideWin2', () => {
    console.log('hiding window 2!..')
    win2.hide();
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
