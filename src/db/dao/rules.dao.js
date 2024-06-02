const Dao = require('./dao')
const knex = require('./knex')
const moment = require('moment')

const COLUMNS = {
    id: 'id', //auto increments
    name: 'name', // nullable string
    value: 'value', // not nullable string
    level: 'level', // not nullable string
    createdBy: 'created_by', // not nullable string
    createdAt: 'created_at',  // defaults to now
    deletedAt: 'deleted_at', // nullable timestamp
  }

class RulesDao extends Dao {
    constructor(table = 'rules', columns = COLUMNS, db = knex){
        super(table, columns, db)
    }

    async list(){
        const rules = await this.db(this.table)
            .select()
            .where({
            [COLUMNS.deletedAt]: null
            })
        return rules.map(rule => this._adapt(rule))
    }

    async get(id){
        const rule = await this.db(this.table)
            .first()
            .where({
            [COLUMNS.id]: id,
            [COLUMNS.deletedAt]: null
          })
        return this._adapt(rule)
    }

    async create(name, platformIds, value, createdBy, level){
        const rule = {
            [COLUMNS.name]: name,
            [COLUMNS.value]: value,
            [COLUMNS.level]: level,
            [COLUMNS.createdBy]: createdBy
          }

        const rulesDb = await this.db(this.table)
            .insert(
                rule
        ).returning('*')

        const ruleDb = this._adapt(rulesDb[0]) 
        for(const id of platformIds) {
            const map = await this.db('rulesPlatformsMap')
            .insert({
                'rule_id': ruleDb[COLUMNS.id],
                'platform_id': parseInt(id)
            }
            )
            console.log(map)
        }
        return ruleDb
    }

    async delete(id) {
        const updateObject = {
            [COLUMNS.deletedAt]: this._serializeTimestamp(moment())
        }
    
        await this.db(this.table)
            .where({ [COLUMNS.id]: id })
            .update(updateObject)
      }
      
    _adapt(dbRule){
        if (!dbRule) return null
        const rule = {
            id: dbRule[COLUMNS.id],
            name: dbRule[COLUMNS.name],
            level: dbRule[COLUMNS.level],
            createdAt: dbRule[COLUMNS.createdAt],
            deletedAt: dbRule[COLUMNS.deletedAt],
            value: this._parseJson(dbRule[COLUMNS.value])
        }
        return rule
      }
}


module.exports = new RulesDao()