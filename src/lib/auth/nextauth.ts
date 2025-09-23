/**
 * NextAuth.js Configuration
 * Enterprise-grade authentication with NextAuth.js v5
 */

import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "../prisma"
import { AUTH_CONFIG, AUTH_ERROR_MESSAGES } from "./config"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      status: string
      twoFactorEnabled: boolean
    }
  }

  interface User {
    role: string
    status: string
    twoFactorEnabled: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    status: string
    twoFactorEnabled: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
        }

        if (user.status !== "active") {
          throw new Error(AUTH_ERROR_MESSAGES.ACCOUNT_SUSPENDED)
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          twoFactorEnabled: user.twoFactorEnabled,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: AUTH_CONFIG.session.maxDuration,
  },
  jwt: {
    maxAge: AUTH_CONFIG.session.maxDuration,
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.status = user.status
        token.twoFactorEnabled = user.twoFactorEnabled
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.status = token.status
        session.user.twoFactorEnabled = token.twoFactorEnabled
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Additional security checks can be added here
      return true
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email}`)
    },
    async signOut({ session, token }) {
      console.log(`User signed out: ${session?.user?.email || token?.email}`)
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}