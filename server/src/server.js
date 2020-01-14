const { GraphQLServer } = require('graphql-yoga')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { makeSchema } = require('nexus')
const { Photon } = require('@prisma/photon')
const { permissions } = require('./permissions')
const types = require('./types')

const photon = new Photon()

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
        photon,
      }
    },
  })
}

module.exports = createServer
