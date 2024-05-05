const Dao = require('./dao')
const knex = require('./knex')
const moment = require('moment')

const COLUMNS = {
    id: 'id', //auto increments
    name: 'name', // nullable string
    code: 'code', // not nullable string
    createdAt: 'created_at',  // defaults to now
    deletedAt: 'deleted_at', // nullable timestamp
    settings: 'settings', // nullable string
  }

class AccountsDao extends Dao {
    constructor(table = 'accounts', columns = COLUMNS, db = knex){
        super(table, columns, db)
    }

    async list(){
        const accounts = await this.db(this.table)
            .select()
            .where({
            [COLUMNS.deletedAt]: null
            })
        return accounts.map(account => this._adapt(account))
    }

    async get(id){
        const account = await this.db(this.table)
            .first()
            .where({
            [COLUMNS.id]: id,
            [COLUMNS.deletedAt]: null
          })
        return this._adapt(account)
    }

    async create(name, code, settings){
        const account = {
            [COLUMNS.name]: name,
            [COLUMNS.code]: code,
            [COLUMNS.settings]: settings
          }
        const accountDb = await this.db(this.table)
            .insert(
                account
        ).returning('*')
        return this._adapt(accountDb[0])
    }    

    async delete(id) {
        const updateObject = {
            [COLUMNS.deletedAt]: this._serializeTimestamp(moment())
        }
    
        await this.db(this.table)
            .where({ [COLUMNS.id]: id })
            .update(updateObject)
      }
      
    _adapt(dbAccount){
        if (!dbAccount) return null

        const account = {
            id: dbAccount[COLUMNS.id],
            code: dbAccount[COLUMNS.code],
            name: dbAccount[COLUMNS.name],
            createdAt: dbAccount[COLUMNS.createdAt],
            deletedAt: dbAccount[COLUMNS.deletedAt],
            settings: JSON.parse(dbAccount[COLUMNS.settings])
        }
        return account
      }
}


module.exports = new AccountsDao()