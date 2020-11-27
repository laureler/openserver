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
ipcMain.on('extra-excel', (event, obj) => {
  let path = obj.path;
  let type = obj.type;
  var excelToJson = extraExcelToJson(path,type)
  event.returnValue = excelToJson;
})
