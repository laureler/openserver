var xlsx = require('node-xlsx')

export function extraExcelToJson(filePath) {
  var result = []
  // 解析得到文档中的所有 sheet
  var datas = xlsx.parse(filePath)
  var sheet1 = datas[0]
  var datas = sheet1.data

  for (let i = 0; i < datas.length; i++) {
    const sheet = datas[i]
    const temp = {
      RID: sheet[0],
      EXCHANGEID: sheet[1],
      TITLE: sheet[2]
    }
    if (i === 0 && sheet[0] === 'RID') {

    } else {
      result.push(temp)
    }
  }
  return result
}

