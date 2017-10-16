const {
    Menu
} = require('electron')
const electron = require('electron')
const app = electron.app
const {
    ipcMain
} = require('electron')


const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Project'
            },
            {
                label: 'Open Project...',
                click: function () {/// must be implemented fpr project now orking for file.json
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('openProject', 'loading project');
                }
            },
            {
                label: 'Save Project',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('saveProject', 'saving project');
                }
            },
            {
                label: 'Save Project As...',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('saveAsProject', 'saving project as');
                }
            }, {
                label: 'Rename  Project...'
                // click: function () { ///// to be implemented for rename project
                //     var focusedWindow = BrowserWindow.getFocusedWindow();
                //     focusedWindow.webContents.send('saveAs', 'saving as');
                // }
            },

            {
                label: 'Open Recent Project ',
                submenu: [
                    {
                        label: 'Open Recent Project'
                        // click: function () {   ////////////////to be imlemented
                        //     var focusedWindow = BrowserWindow.getFocusedWindow();
                        //     focusedWindow.webContents.send('saveAs', 'saving as');
                        // }
                    },
                ]
            },
            {
                type: 'separator'
            },
            {
                label: 'New Page',
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: 'Open Page...',
                accelerator: 'CmdOrCtrl+O',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('open', 'loading JSON');
                }
            },


            {
                label: 'Save Page',
                accelerator: 'CmdOrCtrl+S',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('save', 'saving');
                }
            },
            {
                label: 'Save Page As...',
                accelerator: 'Shift+CmdOrCtrl+S'//,
                // click: function () {
                //     var focusedWindow = BrowserWindow.getFocusedWindow();
                //     focusedWindow.webContents.send('saveAs', 'saving as');
                // }
            }, {
                label: 'Rename Page...',
                accelerator: 'CmdOrCtrl+R'
                // click: function () { ///// to be implemented for rename project
                //     var focusedWindow = BrowserWindow.getFocusedWindow();
                //     focusedWindow.webContents.send('saveAs', 'saving as');
                // }
            },
            {
                label: 'Open Recent Page',
                submenu: [
                    {
                        label: 'Open Recent Project'
                        // click: function () {   ////////////////to be imlemented
                        //     var focusedWindow = BrowserWindow.getFocusedWindow();
                        //     focusedWindow.webContents.send('saveAs', 'saving as');
                        // }
                    },
                ]
            },
            {
                type: 'separator'
            },
            {
                label: 'Save Template...'
            },
            {
                type: 'separator'
            },
            {
                label: 'Close Window',
                role: 'close',
                accelerator: 'CmdOrCtrl+W'
            }
        ]
    },

    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('undo', 'undo');
                }
            },
            {
                label: 'Redo',
                accelerator: 'CmdOrCtrl+Y',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('redo', 'redo');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Delete',
                accelerator: 'Backspace',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('remove', 'removing');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('cut', 'cutting');
                }
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('copy', 'copying');
                }
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('paste', 'pasting');
                }
            },

            {
                role: 'selectall'
            },
            {
                type: 'separator'
            },
            {
                label: 'Duplicate',
                accelerator: 'CmdOrCtrl+D',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('duplicate');
                }
            }
        ]
    },

    {
        label: 'Insert',
        submenu: [
            {
                label: 'Add Textfield'
            },
            {
                label: 'Add Image...'
            },
            {
                label: 'Add Video...'
            },
            {
                type: 'separator'
            },
            {
                label: 'Add Rectangle'
            },
            {
                label: 'Add Rounded Rectangle'
            },
            {
                label: 'Add Circle'
            },
            {
                label: 'Add Triangle'
            },
            {
                label: 'Add Line'
            }
        ]
    },


    {
        label: 'Typography',
        submenu: [
            {
                label: 'Bold'
            },
            {
                label: 'Italic'
            },
            {
                label: 'Underline'
            },
            {
                type: 'separator'
            },
            {
                label: 'Align Left'
            },
            {
                label: 'Align Center'
            },
            {
                label: 'Align Right'
            },
            {
                label: 'Justifyed'
            }
        ]
    },

    {
        label: 'Arrange',
        submenu: [
            {
                label: 'Bring Forward',
                accelerator: 'Alt+Shift+CmdOrCtrl+F',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('bringForward', 'bringing forward');
                }
            },
            {
                label: 'Bring to Front',
                accelerator: 'Shift+CmdOrCtrl+F'
            },
            {
                label: 'Bring Backward',
                accelerator: 'Alt+Shift+CmdOrCtrl+B'
            },
            {
                label: 'Bring to Back',
                accelerator: 'Shift+CmdOrCtrl+B'
            },
            {
                type: 'separator'
            },
            {
                label: 'Align',
                submenu: [
                    {
                        label: 'Left'
                    },
                    {
                        label: 'Center'
                    },
                    {
                        label: 'Right'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Top'
                    },
                    {
                        label: 'Middle'
                    },
                    {
                        label: 'Bottom'
                    }
                ]
            },
            {
                label: 'Distribute',
                submenu: [
                    {
                        label: 'Horizontal'
                    },
                    {
                        label: 'Vertical'
                    }
                ]
            },
            {
                type: 'separator'
            },
            {
                label: 'Group Selected',
                accelerator: 'CmdOrCtrl+G',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('group', 'grouping');
                }
            },
            {
                label: 'Ungroup Selected',
                accelerator: 'CmdOrCtrl+U',
                click: function () {
                    var focusedWindow = BrowserWindow.getFocusedWindow();
                    focusedWindow.webContents.send('ungroup', 'ungrouping');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Lock Selected'
            },
            {
                label: 'Make Invisible'
            }
        ]
    },


    {
        label: 'Zoom Canvas',
        submenu: [
            {
                label: 'Zoom In',
                accelerator: 'CmdOrCtrl++'
            },
            {
                label: 'Zoom Out',
                accelerator: 'CmdOrCtrl+-'
            },
            {
                type: 'separator'
            },
            {
                label: '25%'
            },
            {
                label: '50%'
            },
            {
                label: '75%'
            },
            {
                label: '100%'
            },
            {
                label: '125%'
            },
            {
                label: '150%'
            },
            {
                label: '175%'
            },
            {
                label: '200%'
            },
            {
                type: 'separator'
            },
            {
                label: 'Actual Size',
                accelerator: 'CmdOrCtrl+0'
            },
            {
                label: 'Fit Window',
                accelerator: 'Alt+CmdOrCtrl+0'
            }
        ]
    },


    {
        label: 'View',
        submenu: [

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
                label: 'Project Window',
                click() {
                    let win = new BrowserWindow({
                        title: 'Project Window',
                        width: 800,
                        height: 600,
                        backgroundColor: '#6b0098',
                        alwaysOnTop: false,
                        minimizable: false,
                        maximizable: false,
                        fullscreenable: false,
                        resizable: true,
                        titleBarStyle: 'hidden',
                        icon: '../icons/mac/icon.icns'
                    })
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, '../windows/project.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }
            },
            {
                label: 'Manage Project Fonts',
                click() {
                    let win = new BrowserWindow({
                        title: 'Fonts Window',
                        width: 600,
                        height: 400,
                        backgroundColor: '#6b0098',
                        alwaysOnTop: true,
                        minimizable: false,
                        maximizable: false,
                        fullscreenable: false,
                        resizable: false,
                        titleBarStyle: 'hidden',
                        icon: '../icons/mac/icon.icns'
                    })
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, '../windows/settings.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }
            },
            {
                label: 'Simulator',
                click() {
                    let win = new BrowserWindow({
                        title: 'Simulator',
                        width: 1024,
                        height: 798
                    })
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, '../windows/simulator.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }
            },
            {
                label: 'manage External Assets',
                click() {
                    let win = new BrowserWindow({
                        title: 'Simulator',
                        width: 1024,
                        height: 768,
                        backgroundColor: '#6b0098',
                        alwaysOnTop: true,
                        minimizable: false,
                        maximizable: false,
                        fullscreenable: false,
                        resizable: false,
                        titleBarStyle: 'hidden',
                        icon: '../icons/mac/icon.icns'
                    })
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, '../windows/simulator.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Zoom',
                role: 'zoom'
            },
            {
                role: 'togglefullscreen'
            },
            {
                role: 'minimize'
            },
            {
                role: 'close'
            },
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Show Shortcuts',
                click() {
                    let win = new BrowserWindow({
                        title: 'Shortcuts',
                        width: 600,
                        height: 400,
                        backgroundColor: '#6b0098',
                        alwaysOnTop: true,
                        minimizable: false,
                        maximizable: false,
                        fullscreenable: false,
                        resizable: false,
                        titleBarStyle: 'hidden',
                        icon: '../icons/mac/icon.icns'
                    })
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, '../windows/settings.html'),
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
                        width: 600,
                        height: 400,
                        backgroundColor: '#6b0098',
                        alwaysOnTop: true,
                        minimizable: false,
                        maximizable: false,
                        fullscreenable: false,
                        resizable: false,
                        titleBarStyle: 'hidden',
                        icon: '../icons/mac/icon.icns'
                    })
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, '../windows/index.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }

            },
            {
                type: 'separator'
            },
            {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,'
            },
            {
                type: 'separator'
            },

            {
                label: 'Check for updates...'
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
    template[7].submenu = [
        {
            label: 'Show Layers',
            accelerator: 'Shift+CmdOrCtrl+1'
        },
        {
            label: 'Show pages',
            accelerator: 'Shift+CmdOrCtrl+2'
        },
        {
            label: 'Show Templates',
            accelerator: 'Shift+CmdOrCtrl+3'
        },
        {
            type: 'separator'
        },
        {
            label: 'Show Inspector',
            accelerator: 'Shift+CmdOrCtrl+4'
        },
        {
            label: 'Show Asset Library',
            accelerator: 'Shift+CmdOrCtrl+5'
        },
        {
            label: 'Show Export Settings',
            accelerator: 'Shift+CmdOrCtrl+6'
        }, {
            type: 'separator'
        },
        {
            label: 'Project Settings',
            accelerator: 'CmdOrCtrl+1'
        },
        {
            label: 'Page Settings',
            accelerator: 'CmdOrCtrl+2'
        },
        {
            label: 'Element Styling',
            accelerator: 'CmdOrCtrl+4'
        },
        {
            label: 'Typography',
            accelerator: 'CmdOrCtrl+5'
        },
        {
            label: 'Actions Settings',
            accelerator: 'CmdOrCtrl+6'
        },
        {
            type: 'separator'
        },
        {
            label: 'Show Page Editor',
            accelerator: 'Alt+CmdOrCtrl+P'
        },
        {
            label: 'Show Actions Editor',
            accelerator: 'Alt+CmdOrCtrl+A'
        },
        {
            label: 'Show Page Flow',
            accelerator: 'Alt+CmdOrCtrl+F'
        },
        {
            type: 'separator'
        },
        {
            label: 'Show Ruler',
            accelerator: 'Alt+CmdOrCtrl+R'
        },
        {
            label: 'Show Grid',
            accelerator: 'Alt+CmdOrCtrl+G'
        },
        {
            label: 'Enable Snap-To Guides',
            accelerator: 'Alt+CmdOrCtrl+S'
        },
        {
            type: 'separator'
        },
        {
            label: 'Hide Toolbar',
            accelerator: 'Alt+CmdOrCtrl+T'
        }
    ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
