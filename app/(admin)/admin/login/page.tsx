"use client"
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { LoginForm, LoginSchema } from "@/features/LoginForm"

export default function AdminLoginPage() {
    const router = useRouter()
    const { status } = useSession()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/admin")
        }
    }, [status, router])

    const handleSubmit = async (data: LoginSchema) => {
        setErrorMessage(null)
        setIsSubmitting(true)
        const result = await signIn("credentials", {
            ...data,
            redirect: false,
        })
        setIsSubmitting(false)

        if (result?.error) {
            setErrorMessage("Неверный логин или пароль")
            return
        }

        router.replace("/admin")
    }

    return (
        <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-foreground/10 bg-foreground/5 p-8 text-foreground">
            <div className="space-y-2 text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-foreground/60">Admin</p>
                <h1 className="text-2xl font-semibold">Вход в панель</h1>
                <p className="text-sm text-foreground/70">Используйте корпоративные учётные данные</p>
            </div>
            <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} errorMessage={errorMessage} />
        </div>
    )
}