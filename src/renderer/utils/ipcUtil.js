const { ipcRenderer } = require('electron')
/**
 * 同步发送消息
 */
export function sendMessage() {
  const reply = ipcRenderer.sendSync('synchronous-message', 'ping')
  return reply
}
