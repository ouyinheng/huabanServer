const fs = require('fs')
// 中文转码
function url_encode(url){
  url = encodeURIComponent(url);
  url = url.replace(/\%3A/g, ":");
  url = url.replace(/\%2F/g, "/");
  url = url.replace(/\%3F/g, "?");
  url = url.replace(/\%3D/g, "=");
  url = url.replace(/\%26/g, "&");
  return url;
}
function mkdirFile(res) {
  fs.writeFile(`./log/html/${getTime('timestamp')}.html`, res, async(err) => {
    if(!err) {
      await console.log('写入成功')
    } else {
      console.log('写入失败:--->'+err)
    }
  })
}
/**
 * 
 * @param {string} content 图片内容
 * @param {string} name 图片名字
 */
function saveImage(content, name=getTime('timestamp') ) {
  fs.writeFile(`./log/images/${name}.jpg`,content,'binary', function (err) {
      if (err) throw err;
      console.log('保存完成');
  });
}
/**
 * 
 * @param {string} content 文件内容
 * @param {string} name 文件名
 * @param {string} decode 文件编码
 * @param {string} filePath 文件保存路径
 * @param {string} type 文件类型
 */
function saveFile(filePath="./log", name=getTime('timestamp'), type="jpg", content,  decode='utf-8') {
  fs.writeFile(filePath+name+type, content, decode,  (err) => {
    if (err) throw err;
    console.log('保存完成');
  })
}
/**
 * 
 * @param {*} now 当前的位置
 * @param {*} len 总长度
 * @param {*} date 日期
 * @param {*} symbols 连接符
 * @param {*} bool 是否为月份
 * @param {*} isYear 是否为年
 */
function dateGetter(now, len, date, symbols='-', bool=false, isYear=false) {
  if(bool) date = date>8?date+1:'0'+date+1
  if(isYear) date= date
  if(!bool) date>9?date:'0'+date
  return len==now+1?date:date+symbols
}
/**
 * 
 * @param {*} format 日期格式
 */
function getTime(format='yyyy-MM-dd') {
  let arr = format.split(' ');
  let brr = [];
  let str = '';
  let timestamp = new Date()
  brr.push(...arr[0].split('-'))
  if(arr.length==2) brr.push(...arr[1].split(':'))
  brr.forEach((item, index) => {
    let len = brr.length;
    switch (item) {
      case 'yyyy':
        str += dateGetter(index, len, timestamp.getFullYear(), '-', false, true);
        break;
      case 'MM':
        str += dateGetter(index, len, timestamp.getMonth(), '-', true);
        break;
      case 'dd':
        str += dateGetter(index, len,  timestamp.getDate(), ' ');
        break;
      case 'hh':
        str += dateGetter(index, len, timestamp.getHours(), ':');
        break;
      case 'mm':
        str += dateGetter(index, len, timestamp.getMinutes(), ':');
        break;
      case 'ss':
        str += dateGetter(index, len, timestamp.getSeconds());
        break;
      case 'timestamp':
        str = timestamp.getTime();
        break;
      default:
        console.error(`日期格式错误 "${item}".`);
        break;
    }
  })
  return str;
}
/**
 * 错误日志
 * @param 错误内容
 */
/**
 * 
 * @param {*} err 错误内容
 * @param {*} ctx 请求的内容
 */
function setErrorLog(err, ctx) {
  let content = `
    ${getTime('yyyy-MM-dd hh:mm:ss')}:
    method: ${ctx.method}
    url: ${ctx.url}
    host: ${ctx.header.host}
    connection: ${ctx.header.connection}
    cookie: ${ctx.header.cookie}
    accept: ${ctx.header.accept}
    response: ${JSON.stringify(ctx.response)}
    request: ${JSON.stringify(ctx.request)}
    error: 
    ${err.stack}

    
  `
  fs.readdir('./log/error', (error, files) => {
    if(files) {
      let timestamp = getTime();
      fs.appendFile('./log/error/error.log-'+timestamp, content, (err) => {
        if(err) {
          fs.writeFile('./log/error/error.log-'+timestamp, content, (errs) => {
            if(errs) console.log('写入失败', errs)
            else console.log('写入成功')
          })
        }
      })
      
    } else {
      fs.mkdir('./log/error', (err) => {
        if (err) return console.error('目录创建失败', err);
        else console.log("目录创建成功。");
      })
    }
  })
}
module.exports = {
    getTime, setErrorLog, mkdirFile, saveImage, saveFile, url_encode
}