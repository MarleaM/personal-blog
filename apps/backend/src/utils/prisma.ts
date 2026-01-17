// src/utils/prisma.ts
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// IMPORTANT: In ESM, we use the .js extension for the local import 
// even though the physical file is .ts. 
// point this to wherever ur 'output' was in schema.prisma
import { PrismaClient } from '../generated/prisma/client.js'; 

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your .env file");
}
// create the pg connection pool
const pool = new Pool({ connectionString });

//create the Prisma Driver Adapter
const adapter = new PrismaPg(pool);

//instantiate the client with the required adapter argument
export const prisma = new PrismaClient({ adapter });