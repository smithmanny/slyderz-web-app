import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

import * as types from './types'
import { permissions } from '../pages/api/permissions/index'

// Enable nexus plugins
use(prisma())
// use(permissions)

types