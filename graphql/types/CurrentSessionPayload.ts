import { schema } from 'nexus'

const CurrentSessionPayload = schema.objectType({
  name: 'CurrentSessionPayload',
  definition(t) {
    t.field('user', { type: 'User', nullable: true })
  },
})

export default CurrentSessionPayload
