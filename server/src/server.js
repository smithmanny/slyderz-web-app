const { GraphQLServer } = require('graphql-yoga')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { makeSchema } = require('nexus')
const { PrismaClient } = require('@prisma/client')
const { permissions } = require('./permissions')
const types = require('./types')

const prisma = new PrismaClient()

function createServer() {
  return new GraphQLServer({
    schema: makeSchema({
      types,
      plugins: [nexusPrismaPlugin()],
      outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
      },
    }),
    middlewares: [permissions],
    context: request => {
      return {
        ...request,
        prisma,
      }
    },
  })
}

module.exports = createServer
