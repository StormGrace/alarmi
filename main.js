const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let resizeWidthPercFactor = 0.1375;
let resizeHeightPercFactor = 1.97015;

let windowWidth = 0, windowHeight = 0;
let windowHeightPercFactor = 0.5;

let extendedWindowHeight = 495;
let isWindowExtended = false;

var mainWindow = null; 
var mainWindowSize = null;

app.on('ready', function(){
   const screen = electron.screen;
   const display = screen.getPrimaryDisplay();
   const area = display.workArea;

    windowWidth  = Math.round(area.width * resizeWidthPercFactor);
    windowHeight = Math.round(windowWidth / resizeHeightPercFactor);

    mainWindow = new BrowserWindow(
    {
        transparent:true,
        frame: false, 
        resizable: false,
        width: windowWidth, 
        height: windowHeight, 
        icon:'./app/icons/tray.png'
    });

    mainWindow.setAlwaysOnTop(true, "floating", 1);
    mainWindow.setVisibleOnAllWorkspaces(true);

    mainWindow_Size = mainWindow.getSize();

    const mainWindow_X = area.width - mainWindow_Size[0] - 5;
    const mainWindow_Y = 40;

    mainWindow.setPosition(mainWindow_X, mainWindow_Y);

    mainWindow.loadURL(`file://${__dirname}/app/main.html`);
   
      
    console.log("AlarmI 0.9.0 App has Started!");
   })

   ipc.on('openOptions', function(event, data){
    console.log("[ACTION] Extending Window!");

    if(isWindowExtended == false){
       mainWindow.setSize(windowWidth, extendedWindowHeight);
       isWindowExtended = true;
    }

    if(data == 'alarm-btn'){
      console.log("[ACTION] Openning Alarm Options!");
    }

    else if(data == 'settings-btn'){
      console.log("[ACTION] Openning App Options!");
    }
  })
 