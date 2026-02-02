import { dbConnect } from "@/shared/api/db/client"
import { Admin } from "@/shared/api/db/models/Admin"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    await dbConnect()

    const formData = await req.formData()
    const login = formData.get('login')
    const password = formData.get('password')

    const admin = await Admin.findOne({ login })

    if (!admin) {
        return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 })
    }

    const isPasswordValid = await (admin as any).comparePassword(password as string)
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 })
    }

    return NextResponse.json({ success: true })
}
