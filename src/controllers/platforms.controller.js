const debug = require('logzio-node-debug').debug(`tag-manager:${require('path').basename(__filename)}`)
const PlatformDao = require('../db/dao/platforms.dao')
const Joi = require('joi')

class PlatformsController {

    async list({params}, res) {
        debug('list', params)

        const platforms = await PlatformDao.list();
        
        const response = platforms.map(createResponse)
        debug('list: response:', JSON.stringify(response))
        res.json(response);
    }

    async get({platform, params}, res) {
        debug('get', params)

        const response = createResponse(platform)
        res.json(response);
        }

    async create({body, params}, res) {
        debug(`create: params=${JSON.stringify(params)}`)
        await validateCreate(body)
        const name = body.name
        const code = body.name.replace(/\s+/g, '_').toLowerCase().replace(/[^\w]/g, '');

        const platform = await PlatformDao.create(name, code)
        res.json(platform)
    }

    async delete({platform}, res) {
        debug(`delete: platformId=${platform.id}`)

        await PlatformDao.delete(platform.id)
        res.status(200).send()
    }
}

async function validateCreate(body) {
    await Joi.object({
      name: Joi.string().min(1),
    }).validateAsync(body)
  }
  

function createResponse(platform) {
    return {
        id: platform.id,
        name: platform.name,
        code: platform.code,
      }
}

module.exports = new PlatformsController()