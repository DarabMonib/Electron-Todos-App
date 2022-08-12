const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    // frame: false
  })

  win.loadFile('index.html')

  win.on('close', () => {
    app.quit();
  })

  const win2 = new BrowserWindow({
    width: 600,
    height: 400,
    icon: path.join(__dirname, 'icons/ico.png' ),
    webPreferences: {
      preload: path.join(__dirname, 'preload2.js')
    },
    // frame: false,
    show: false
  })

  win2.on('close', (event) => {
    event.preventDefault()
    win2.hide()

  })

  win2.loadFile('index2.html')

  ipcMain.on('openWin2', () => {
    console.log('activating!!!')
    win2.show()
  })

  ipcMain.on('li', (e, item) => {
    win.webContents.send('foward-image', item)
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
