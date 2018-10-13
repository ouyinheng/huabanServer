
function getTime() {
    let timestamp = new Date()
    let year = timestamp.getFullYear()
    let month = timestamp.getMonth()>9?timestamp.getMonth():'0'+timestamp.getMonth()
    let day = timestamp.getDay()>9?timestamp.getDay():'0'+timestamp.getDay()
    console.log()
    return year+'-'+month+'-'+day;
}

module.exports = {
    getTime
}