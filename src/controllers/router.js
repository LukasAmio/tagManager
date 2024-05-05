const express = require('express')
const router = express.Router()
const authorizeRequest = require('../middleware/authorize-request.middleware')
const asyncErrorMiddleware = require('../middleware/async-error-handler.middleware')
const accountsController = require('./accounts.controller')
const platformsController = require('./platforms.controller')
const rulesController = require('./rules.controller')
const verifyAccount = require('../middleware/verify-account.middleware')
const verifyRule = require('../middleware/verify-rule.middleware')

router.use(authorizeRequest)

router.use('/accounts/:accountId', verifyAccount)
router.use('/rules/:ruleId', verifyRule)

// Accounts
router.post('/accounts', asyncErrorMiddleware(accountsController.create))
router.get('/accounts', asyncErrorMiddleware(accountsController.list))
router.get('/accounts/:accountId', asyncErrorMiddleware(accountsController.get))
router.delete('/accounts/:accountId', asyncErrorMiddleware(accountsController.delete))

// Platforms
router.post('/platforms', asyncErrorMiddleware(platformsController.create))
router.get('/platforms', asyncErrorMiddleware(platformsController.list))
router.get('/platforms/:platformId', asyncErrorMiddleware(platformsController.get))

// Rules
router.post('/rules', asyncErrorMiddleware(rulesController.create))
router.get('/rules', asyncErrorMiddleware(rulesController.list))
router.get('/rules/:ruleId', asyncErrorMiddleware(rulesController.get))
router.delete('/rules/:ruleId', asyncErrorMiddleware(rulesController.delete))

module.exports = router
