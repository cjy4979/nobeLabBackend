const crypto = require('crypto')

module.exports = str =>{
    return crypto.createHash('md5')
            .update('jian'+str+'kong')
            .digest('hex')
}