import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
    login: z.string().min(3, "Введите не менее 3 символов"),
    password: z.string().min(3, "Введите не менее 3 символов"),
})

export type LoginSchema = z.infer<typeof loginSchema>

type Props = {
    onSubmit: (data: LoginSchema) => Promise<void>
    isSubmitting?: boolean
    errorMessage?: string | null
}

export const LoginForm = ({ onSubmit, isSubmitting = false, errorMessage }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginSchema>({
        defaultValues: {
            login: "",
            password: "",
        },
        mode: "onChange",
        resolver: zodResolver(loginSchema),
    })

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="login">
                    Логин
                </label>
                <input
                    id="login"
                    type="text"
                    autoComplete="username"
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Введите логин"
                    {...register("login")}
                />
                {errors.login && <p className="text-sm text-rose-300">{errors.login.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="password">
                    Пароль
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Введите пароль"
                    {...register("password")}
                />
                {errors.password && <p className="text-sm text-rose-300">{errors.password.message}</p>}
            </div>
            {errorMessage && <p className="text-sm text-rose-300">{errorMessage}</p>}
            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition disabled:cursor-not-allowed disabled:bg-white/40"
            >
                {isSubmitting ? "Входим..." : "Войти"}
            </button>
        </form>
    )
}