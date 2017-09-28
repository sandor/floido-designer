const {
    Menu
} = require('electron')
const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const template = [
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('undo');
                }
      },
            {
                role: 'redo',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('redo');
                }
      },
            {
                type: 'separator'
      },
            {
                role: 'cut'
      },
            {
                role: 'copy',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('copy');
                }
      },
            {
                role: 'paste',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('paste');
                }
      },
            {
                role: 'pasteandmatchstyle'
      },


            {
                role: 'delete',                label: 'Delete',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('delete');
                }
      },
            {
                role: 'selectall'
      }
    ]
  },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                }
      },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
      },
            {
                type: 'separator'
      },
            {
                role: 'resetzoom'
      },
            {
                role: 'zoomin'
      },
            {
                role: 'zoomout'
      },
            {
                type: 'separator'
      },
            {
                role: 'togglefullscreen'
      }
    ]
  },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
      },
            {
                role: 'close'
      }
    ]
  },
    {
        role: 'help',
        submenu: [
            {
                label: 'My Learn More',
                click() {
                    let win = new BrowserWindow({
                        frame: false,
                        width: 800,
                        height: 600,
                        minWidth: 800,
                        minHeight: 600,
                        backgroundColor: '#312450',
                        parent: mainWindow
                    })
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, 'WelcomeWindow/index.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }
      }
    ]
  }
]

if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
            label: name,
            submenu: [
                {
                    //                    role: 'about',
                    label: 'About Floido Designer',
                    click() {
                        let win = new BrowserWindow({
                            title: 'About Floido Designer',
                            width: 800,
                            height: 600,
                            backgroundColor: '#312450',
                            alwaysOnTop: true,
                            modal: true
                        })
                        win.loadURL(url.format({
                            pathname: path.join(__dirname, '../aboutWindow/index.html'),
                            protocol: 'file:',
                            slashes: true
                        }))
                    }

      },
                {
                    type: 'separator'
      },
                {
                    role: 'services',
                    submenu: []
      },
                {
                    type: 'separator'
      },
                {
                    role: 'hide'
      },
                {
                    role: 'hideothers'
      },
                {
                    role: 'unhide'
      },
                {
                    type: 'separator'
      },
                {
                    role: 'quit'
      }
    ]
        })
        // Edit menu.
    template[1].submenu.push({
            type: 'separator'
        }, {
            label: 'Speech',
            submenu: [
                {
                    role: 'startspeaking'
        },
                {
                    role: 'stopspeaking'
        }
      ]
        })
        // Window menu.
    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
    },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
    },
        {
            label: 'Zoom',
            role: 'zoom'
    },
        {
            type: 'separator'
    },
        {
            label: 'Open origninal index.html',
            click() {
                const modalPath = path.join('floido.jpg')
                let win = new BrowserWindow({
                    width: 400,
                    height: 320
                })
                win.on('close', function () {
                    win = null
                })
                win.loadURL(modalPath)
                win.show()
            }
    },
        {
            label: 'Welcome',
            click() {
                let win = new BrowserWindow({
                    width: 800,
                    height: 600,
                    backgroundColor: '#312450'
                })
                win.loadURL(url.format({
                    pathname: path.join(__dirname, '../WelcomeWindow/index.html'),
                    protocol: 'file:',
                    slashes: true
                }))
            }
    },
        {
            type: 'separator'
    },
        {
            label: 'Bring All to Front',
            role: 'front'
    }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
