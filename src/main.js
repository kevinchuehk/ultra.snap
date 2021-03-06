'use strict'
const path = require('path')
const { BrowserWindow, Menu, app, screen } = require('electron')
Menu.setApplicationMenu(false)
const isProduction = !process.env.TEST

const defaultProps = {
    webPreferences: {
        devTools: false,
        sandbox: false
    },
    icon: path.join(__dirname, '../gui/icon.png')
}

class Window extends BrowserWindow {
    constructor({ url, ...windiwSettings }) {
        super({ ...defaultProps, ...windiwSettings })
        this.loadURL(url)

        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

const width = process.env.ULTRA_W || 1280
const height = process.env.ULTRA_H || 720
const url = process.env.ULTRA_URL || ''

app.on('ready', () => {
    const { x, y } = screen.getPrimaryDisplay().workArea
    const mainWindow = new Window({
        url: url || 'https://ultra.ypcloud.com',
        width, height, x, y
    })
    app.focus()
})

app.on('window-all-closed', () => {
    app.quit()
})