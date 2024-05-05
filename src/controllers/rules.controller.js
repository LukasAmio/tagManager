const debug = require('logzio-node-debug').debug(`tag-manager:${require('path').basename(__filename)}`)
const RuleDao = require('../db/dao/rules.dao')
const PlatformDao = require('../db/dao/platforms.dao')
const GeneralError = require('../utils/error/general.error')
const Joi = require('joi')

class RulesController {

    async list({params}, res) {
        debug('list', params)

        const rules = await RuleDao.list();
        
        const response = rules.map(createResponse)
        debug('list: response:', JSON.stringify(response))
        res.json(response);
    }

    async get({rule, params}, res) {
        debug('get', params)

        const response = createResponse(rule)
        res.json(response);
        }

    async create({body, params}, res) {
        debug(`create: params=${JSON.stringify(params)}`)
        await validateCreate(body)
        const name = body.name
        const platformIds = body.platform_ids
        const value = JSON.stringify(body.value)
        const createdBy = body.created_by
        const level = body.level

        const rule = await RuleDao.create(name, platformIds, value, createdBy, level)
        console.log(rule)
        res.json(rule)
    }

    async delete({rule}, res) {
        debug(`delete: ruleId=${rule.id}`)

        await RuleDao.delete(rule.id)
        res.status(200).send()
    }
}

async function validateCreate(body) {
    await Joi.object({
      name: Joi.string().min(1),
      platform_ids: Joi.array(),
      value: Joi.any().required(),
      created_by: Joi.string().min(1),
      level: Joi.string().valid('global', 'platform', 'campaign').min(1)
    }).validateAsync(body)

    for(const id of body.platform_ids) {
        if (!Number.isInteger(id)) {
            throw new GeneralError('Platform IDs in platform_ids must be integers')
        }
        const platform = await PlatformDao.get(id)
        if (!platform) {
            throw new GeneralError(`Platform with ID: ${id} does not exist`)
        }
    }
  }
  

function createResponse(rule) {
    return {
        id: rule.id,
        name: rule.name,
        value: rule.value,
        level: rule.level,
        created_by: rule.createdBy,
        created_at: rule.createdAt,
      }
}

module.exports = new RulesController()