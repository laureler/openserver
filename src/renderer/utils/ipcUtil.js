const { ipcRenderer } = require('electron')
/**
 * 同步发送消息
 */
export function sendMessage() {
  const reply = ipcRenderer.sendSync('synchronous-message', 'ping')
  return reply
}

export function readFile(path){
  const str = ipcRenderer.sendSync('read-file', path)
  return str
}

export function extraExcel(path){
  const str = ipcRenderer.sendSync('extra-excel', path)
  return str
}
