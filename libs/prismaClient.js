import 'dotenv/config'
import { Prisma } from '@prisma/client/extension'
import {PrismaClient} from '../generated/prisma/index.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb(process.env.DATABASE_URL)
const prisma = new PrismaClient({adapter})

export default prisma