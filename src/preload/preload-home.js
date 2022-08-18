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
  // Login Essential..
  continueToChat: (displayName) => ipcRenderer.send('continueToChat', displayName),
  
  // Chat Essentials..
  init: (todos) => ipcRenderer.on('init', todos),
  getImage: (item) => ipcRenderer.on('fowardItem', item),
  openWin2: (bool) => ipcRenderer.send('openWin2', bool),
  changeHome: (toChange) => ipcRenderer.send('changeHome', toChange),
  setDisplayName: (username) => ipcRenderer.on('userName', username),
  openCode: () => ipcRenderer.send('openCode')
})