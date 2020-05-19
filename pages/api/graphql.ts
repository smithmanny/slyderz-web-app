import app, { server } from 'nexus'
import cookieParser from 'cookie-parser'

import validateTokenMiddleware from '../../graphql/middlewares/validateTokensMiddleware'
import '../../graphql/schema'

// Middlewares
app.server.express.use(cookieParser(process.env.COOKIE_SECRET))
app.server.express.use(validateTokenMiddleware)

app.assemble()

export default server.handlers.graphql