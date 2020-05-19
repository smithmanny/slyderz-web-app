import { schema, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { shield } from 'nexus-plugin-shield'

import * as types from './types'
import { rules } from '../pages/api/permissions/index'

// Enable nexus plugins
use(prisma())
use(shield({ rules }))

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
  },
})

// types