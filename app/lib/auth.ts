import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
// import { emailOTP } from "better-auth/plugins";
import { emailOTP } from "better-auth/plugins/email-otp";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  // trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL as string],
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Send the OTP for sign in
        } else if (type === "email-verification") {
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
    nextCookies(),
  ], // make sure this is the last plugin in the array
  //...
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
