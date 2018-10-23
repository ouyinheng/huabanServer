const http = require('http');
const Iconv = require('iconv-lite')

class oxios {
  static get(url, decode='utf-8') {
    return new Promise((resolve, reject) => {
      http.get(url, async res => {
          var chunks=[];
          var size=0;
          res.on('data',function(chunk){
              chunks.push(chunk);
              size += chunk.length;
          });
          res.on('end',function(){
              var buf=Buffer.concat(chunks, size);
              let str=Iconv.decode(buf,decode);
              resolve(str)
          });
      }).on('error', function (err) {
          reject(err)
      });
    })
  }
}

exports.default = oxios