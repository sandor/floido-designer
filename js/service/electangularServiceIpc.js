

electangular.service("ipc", ['electron_core', function (ele) {
  var ipcRenderer = ele.ipcRenderer;
  return {
    send: function (msg) {
      ipcRenderer.send('electron-msg', msg);
    },
    sendToHost: function (msg) {
      ipcRenderer.sendToHost('electron-msg', msg);
    }
  }
}])


