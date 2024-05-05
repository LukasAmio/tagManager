const debug = require('logzio-node-debug').debug('tag-manager:' + require('path').basename(__filename))
const ruleDao = require('../db/dao/rules.dao')

async function verifyRule(req, res, next) {
  debug('verifyRule')
  const ruleId = req.params.ruleId

  req.rule = await ruleDao.get(ruleId)
  if (!req.rule) {
    debug(`verifyRule: rule with id ${ruleId} not found.`)
    res.status(404).send(`Rule with id ${ruleId} not found.`)
    return
  }

  next()
}

module.exports = verifyRule
