const http = require('http');
const Iconv = require('iconv-lite')



function getImages(page) {
    return new Promise( (resolve, reject) => {
        http.get(`http://www.meizitu.com/a/legs_${page}.html`, res => {
            var chunks=[];
            var size=0;
            res.on('data',function(chunk){
                chunks.push(chunk);
                size += chunk.length;
            });
            res.on('end',function(){
                var buf=Buffer.concat(chunks, size);
                let str=Iconv.decode(buf,'gb2312');
                resolve(str)
            });
        }).on('error', function (err) {
            console.log(err);
            reject(err)
        });
    })
}
module.exports = {
    getImages
}