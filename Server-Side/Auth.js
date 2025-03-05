// import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

try {
     const auth = betterAuth({
        database: prismaAdapter(prisma, {
            provider: "postgresql", // Ensure this matches your actual database provider
        }),
        emailAndPassword: { 
            enabled: true, 
        },
        emailVerification: {
            sendVerificationEmail: async ({ user, url, token }, request) => {
                try {
                    await sendEmail({
                        to: user.email,
                        subject: "Verify your email address",
                        text: `Click the link to verify your email: ${url}`,
                    });
                } catch (error) {
                    console.error("Error sending verification email:", error);
                }
            },
        },
    });
} catch (error) {
    console.error("Error initializing betterAuth:", error);
}