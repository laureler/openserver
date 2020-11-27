var xlsx = require('node-xlsx')

export function extraExcelToJson(filePath,type) {
  var result = []
  // 解析得到文档中的所有 sheet
  var datas = xlsx.parse(filePath)
  var sheet1 = datas[0]
  var datas = sheet1.data


  for (let i = 0; i < datas.length; i++) {
    const sheet = datas[i]
    if(type == 1){
      var temp = {
        status:0,
        RID: sheet[0],
        EXCHANGEID: sheet[1],
        TITLE: sheet[2],
        RID2: "",
        EXCHANGEID2: "",
        TITLE2: "",
      }
    }else{
      var temp = {
        RID2: sheet[0],
        EXCHANGEID2: sheet[1],
        TITLE2: sheet[2],
      }
    }
    if (i === 0 && sheet[0] === 'RID') {

    } else {
      result.push(temp)
    }
  }
  return result
}

