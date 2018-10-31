const http = require('http');
const Iconv = require('iconv-lite')

class oxios {
  static get(url, decode='utf-8') {
    return new Promise((resolve, reject) => {
      http.get(url, async res => {
          let content = '';
          res = res.setEncoding(decode)
          res.on('data',function(chunk){
              content+=chunk;
          });
          res.on('end',function(){
              resolve(content)
          });
      }).on('error', function (err) {
          reject(err)
      });
    })
  }
}

exports.default = oxios