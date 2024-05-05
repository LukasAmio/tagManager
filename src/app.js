const debug = require('logzio-node-debug').debug(`tag-manager:${require('path').basename(__filename)}`)
const express = require('express')
const router = require('./controllers/router')
const errorHandlerMiddleware = require('./middleware/general-error-handler.middleware')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express();

app.use(corsMiddleware)
app.use(express.json({
  limit: '50mb'
}))

app.use((req, res, next) => {
  debug(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)
  next()
});

app.use(express.urlencoded({extended: false}))
app.use('/api', router)
app.use(function (req, res) {
  debug('Not Found - ', req.url)
  res.status(404)
  res.json('Not Found')
})
app.use(errorHandlerMiddleware)

module.exports = app