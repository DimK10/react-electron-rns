const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const expressServer = require('../server/server');
const path = require('path');
// const isDev = require('electron-is-dev');
const isDev = false; //Testing purposes

let mainWindow;

function createWindow() {
  console.log('isDev:', isDev);
  expressServer(isDev);
  mainWindow = new BrowserWindow({width: 900, height: 680});
  // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : 'http://localhost:4000');
  
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    // mainWindow.openDevTools();
  
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});