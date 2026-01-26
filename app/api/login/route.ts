import { dbConnect } from "@/shared/api/db/client"
import { Admin } from "@/shared/api/db/models/Admin"

export async function POST(req: Request) {
    await dbConnect()

    const formData = await req.formData()
    const login = formData.get('login')
    const password = formData.get('password')

    const admin = await Admin.findOne({ login, password })

    if (!admin) {
        return Response.json({ error: "Неверный логин или пароль" }, { status: 401 })
    }


}