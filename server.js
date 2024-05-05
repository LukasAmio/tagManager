(async function () {
    require('./src/utils/logging')
    async function main() {
      const port = 8080
      const app = require('./src/app')
      const http = require('http')
  
      const httpServer = http.createServer(app)
        
      httpServer.listen(port)
    }
  
    await main()
  })()
  