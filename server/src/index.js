require('dotenv').config();
const cookieParser = require('cookie-parser')
const createServer = require('./server')

const { getUserToken } = require('./utils')

const server = createServer()
server.express.use(cookieParser(process.env.COOKIE_SECRET))

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  getUserToken(req);
  next()
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.SLYDERZ_WEB_APP_URL || 'http://localhost:3000'
  }
}, ({ port }) => {
  console.log(`🚀  Server ready at http://localhost:${port}`)
})