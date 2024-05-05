const Dao = require('./dao')
const knex = require('./knex')

const COLUMNS = {
    id: 'id', //auto increments
    name: 'name', // nullable string
    code: 'code', // not nullable string
  }

class PlatformsDao extends Dao {
    constructor(table = 'platforms', columns = COLUMNS, db = knex){
        super(table, columns, db)
    }

    async list(){
        const platforms = await this.db(this.table)
            .select()
        return platforms.map(platform => this._adapt(platform))
    }

    async get(id){
        const platform = await this.db(this.table)
            .first()
            .where({
            [COLUMNS.id]: id
          })
        return this._adapt(platform)
    }

    async create(name, code){
        const platform = {
            [COLUMNS.name]: name,
            [COLUMNS.code]: code
          }
        const platformDb = await this.db(this.table)
            .insert(
                platform
        ).returning('*')
        return this._adapt(platformDb[0])
    }    
      
    _adapt(dbPlatform){
        if (!dbPlatform) return null

        const platform = {
            id: dbPlatform[COLUMNS.id],
            code: dbPlatform[COLUMNS.code],
            name: dbPlatform[COLUMNS.name]
        }
        return platform
      }
}


module.exports = new PlatformsDao()