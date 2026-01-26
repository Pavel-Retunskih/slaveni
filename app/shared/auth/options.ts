import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { NextAuthOptions } from "next-auth/"
import CredentialsProvider from "next-auth/providers/credentials"

import { dbConnect } from "@/shared/api/db/client"
import { Admin } from "@/shared/api/db/models/Admin"

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/admin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Admin",
            credentials: {
                login: { label: "Login", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.login || !credentials?.password) {
                    return null
                }

                await dbConnect()

                const admin = await Admin.findOne({ login: credentials.login })
                if (!admin) {
                    return null
                }

                if (admin.password !== credentials.password) {
                    return null
                }

                const adminUser: User = {
                    id: admin._id.toString(),
                    login: admin.login,
                }

                return adminUser
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && "login" in user) {
                token.login = (user as { login: string }).login
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                const user = session.user as Session["user"]
                user.id = token.sub ?? ""
                user.login = (token.login as string | undefined) ?? undefined
            }
            return session
        },
    },
}
