// Import the PrismaClient class from the @prisma/client module
import { PrismaClient } from "@prisma/client";

// Declare a global variable 'prisma' that can be either PrismaClient or undefined
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize the Prisma client using the existing global instance or create a new one
export const db = globalThis.prisma || new PrismaClient();

// Store the Prisma client in the global scope if not in production
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
