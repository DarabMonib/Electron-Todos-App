window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
})
  
const { contextBridge, ipcMain, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electronAPI", {
  sendItem: (item) => ipcRenderer.send('sendItem', item),
  hideWin2: (bool) => ipcRenderer.send('hideWin2', bool)
})