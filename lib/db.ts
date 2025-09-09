
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
neonConfig.poolQueryViaFetch = true

// Type definitions
declare global {
  var prisma: PrismaClient | undefined
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = db;

export default db;

// import 'dotenv/config';
// import { PrismaClient } from '@prisma/client';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { neonConfig } from '@neondatabase/serverless';

// import ws from 'ws';

// neonConfig.webSocketConstructor = ws;
// neonConfig.poolQueryViaFetch = true;

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaNeon({ connectionString });

// // Type assertion to bypass TypeScript error
// const db = global.prisma || new PrismaClient({ 
//   adapter 
// });

// if (process.env.NODE_ENV === 'development') global.prisma = db;

// export default db;
