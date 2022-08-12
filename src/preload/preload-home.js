window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
})
  
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electronAPI", {
  getImage: (item) => ipcRenderer.on('fowardItem', item),
  openWin2: (bool) => ipcRenderer.send('openWin2', bool),
  closeAll: (bool) => ipcRenderer.send('closeAll', bool)
})