const debug = require('logzio-node-debug').debug('tag-manager:' + require('path').basename(__filename))
const accountDao = require('../db/dao/accounts.dao')

async function verifyAccount(req, res, next) {
  debug('verifyAccount')
  const accountId = req.params.accountId

  req.account = await accountDao.get(accountId)
  if (!req.account) {
    debug(`verifyAccount: account with id ${accountId} not found.`)
    res.status(404).send(`Account with id ${accountId} not found.`)
    return
  }

  next()
}

module.exports = verifyAccount
