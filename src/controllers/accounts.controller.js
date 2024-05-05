const debug = require('logzio-node-debug').debug(`tag-manager:${require('path').basename(__filename)}`)
const AccountDao = require('../db/dao/accounts.dao')
const Joi = require('joi')

class AccountsController {

    async list({params}, res) {
        debug('list', params)

        const accounts = await AccountDao.list();
        
        const response = accounts.map(createResponse)
        debug('list: response:', JSON.stringify(response))
        res.json(response);
    }

    async get({account, params}, res) {
        debug('get', params)

        const response = createResponse(account)
        res.json(response);
        }

    async create({body, params}, res) {
        debug(`create: params=${JSON.stringify(params)}`)
        await validateCreate(body)
        const name = body.name
        const settings = JSON.stringify(body.settings)
        const code = body.name.replace(/\s+/g, '_').toLowerCase().replace(/[^\w]/g, '');

        const account = await AccountDao.create(name, code, settings)
        res.json(account)
    }

    async delete({account}, res) {
        debug(`delete: accountId=${account.id}`)

        await AccountDao.delete(account.id)
        res.status(200).send()
    }
}

async function validateCreate(body) {
    await Joi.object({
      name: Joi.string().min(1),
      settings: Joi.any()
    }).validateAsync(body)
  }
  

function createResponse(account) {
    return {
        id: account.id,
        name: account.name,
        code: account.code,
        settings: account.settings,
        created_at: account.createdAt,
      }
}

module.exports = new AccountsController()