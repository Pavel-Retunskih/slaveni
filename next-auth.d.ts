import type { DefaultSession, DefaultUser } from "next-auth"
import type { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: DefaultSession["user"] & {
            id: string
            login?: string
        }
    }

    interface User {
        id: string
        login: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        login?: string
    }
}
