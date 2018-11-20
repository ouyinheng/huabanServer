const http = require('http');
const https = require('https');
const Iconv = require('iconv-lite')

class oxios {
  static get(url, decode='utf-8') {
    let method = url.split('://')[0];
    if(method == 'http') {
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
    } else {
        return new Promise((resolve, reject) => {
            https.get(url, async res => {
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
}

exports.default = oxios