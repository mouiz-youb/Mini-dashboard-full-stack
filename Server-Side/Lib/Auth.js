import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./Db.js";


export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "sqlite", // Ensure this matches your actual database provider
    }),
    emailAndPassword: { 
        enabled: true, 
    }
});