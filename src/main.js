const { app, BrowserWindow, ipcMain, Tray, nativeImage, Menu } = require('electron')
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

  let trayTemplate = [
    { role: 'about' },
    { type: 'separator' },
    { role: 'services' },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'hideOthers' },
    { role: 'unhide' },
    { type: 'separator' },
    { role: 'quit' }
  ]

  win.loadFile('src/views/login.html')

  ipcMain.on('continueToChat', (ev, [userName, mode]) => {
    // console.log(mode)
    if(mode == 'message-chat') {
      console.log('if', mode, userName)
      win.loadFile('src/views/home.html')
    } else {
      console.log('else', mode, userName)
      win.loadFile('src/views/video.html')
    }
      win.on('ready-to-show', () => {
      win.webContents.send('userName', userName)
    })

  })

  // Tray Items.
  let tray = new Tray(path.join(__dirname, 'icons/512x512.png'));
  tray.setToolTip('Chat App Tooltip')
  tray.setContextMenu(Menu.buildFromTemplate(trayTemplate))

  win.on('close', () => {
    app.quit();
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
      // win.close();
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