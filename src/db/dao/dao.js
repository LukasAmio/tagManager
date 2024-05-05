const moment = require('moment')

class  Dao {
    constructor(table, columns, db){
        this.table = table,
        this.columns = columns
        this.db = db
    }

    _serializeTimestamp(momentTimestamp) {
        return momentTimestamp ? momentTimestamp.toDate() : null
      }
    
    _parseTimestamp(stringTimestamp) {
        return moment(stringTimestamp)
      }

    _serializeJson(object) {
        return object ? JSON.stringify(object) : null
    }
    
    _parseJson(stringJson) {
        return JSON.parse(stringJson)
    }
    
    _parseBool(bool) {
        if (bool === null) return null
    
        return bool === 1
    }
}

module.exports =  Dao