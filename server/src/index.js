require('dotenv').config();
const cookieParser = require('cookie-parser')

const createServer = require('./server')
const validateTokensMiddleware = require('./middlewares')

const server = createServer()
server.express.use(cookieParser(process.env.COOKIE_SECRET))

// validate user tokens or skip if null
server.express.use(validateTokensMiddleware);

server.start({
  cors: {
    credentials: true,
    origin: process.env.SLYDERZ_WEB_APP_URL || 'http://localhost:3000'
  }
}, ({ port }) => {
  console.log(`🚀  Server ready at http://localhost:${port}`)
})