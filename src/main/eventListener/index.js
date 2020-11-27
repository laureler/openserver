import { extraExcelToJson } from '../excel/readExcel'

const { ipcMain } = require('electron')
var fs = require('fs')

ipcMain.on('synchronous-message', (event, arg) => {
  event.returnValue = 'pong'
})

ipcMain.on('read-file', (event, path) => {
  var buffer = fs.readFileSync(path,{
    encoding:"utf8"
  })
  event.returnValue = buffer
})
ipcMain.on('extra-excel', (event, path) => {
  var excelToJson = extraExcelToJson(path)
  event.returnValue = excelToJson;
})
