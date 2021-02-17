'use strict'
const path = require('path')
const { BrowserWindow, Menu, app } = require('electron')
Menu.setApplicationMenu(false)
const isProduction = !process.env.TEST

const defaultProps = {
    frame: false,
    fullscreen: true,
    webPreferences: {
        devTools: false,
        sandbox: false
    },
    icon: path.join(__dirname, '../gui/icon.png')
}

class Window extends BrowserWindow {
    constructor({ url, ...windiwSettings }) {
        super({ ...defaultProps, ...windiwSettings })
        // this.setMenuBarVisibility(false)
        this.loadURL(url)

        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

const width = process.env.ULTRA_W || 1280
const height = process.env.ULTRA_H || 720
const url = process.env.ULTRA_URL || ''
const isFullscreen = () => (width && height) ? false : true 
const isKiosk = isFullscreen

app.on('ready', () => {
    const mainWindow = new Window({
        url: url || 'https://ultra.ypcloud.com',
        fullscreen: isFullscreen(),
        kiosk: isKiosk(),
        width, height
    })
    app.focus()
})

app.on('window-all-closed', () => {
    app.quit()
})