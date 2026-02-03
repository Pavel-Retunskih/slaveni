import { dbConnect } from "@/shared/api/db/client"
import { Management } from "@/shared/api/db/models/Management"
import { NextRequest } from "next/server"
import { checkAuth } from "@/shared/helpers/checkAuth"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        await dbConnect()
        const management = await Management.findById(id)

        if (!management) {
            return Response.json(
                { error: "Management record not found" },
                { status: 404 }
            )
        }

        return Response.json({
            management: management.toJSON(),
        })
    } catch (error) {
        console.error("Error fetching management:", error)
        return Response.json(
            { error: "Failed to fetch management record" },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await checkAuth()

    const { id } = await params

    try {
        await dbConnect()

        const body = await request.json()
        const { name, position, department, description, phone, email, image, responsibilities, isDirector } = body

        const existingRecord = await Management.findById(id)
        if (!existingRecord) {
            return Response.json(
                { error: "Management record not found" },
                { status: 404 }
            )
        }

        if (isDirector && !existingRecord.isDirector) {
            const existingDirector = await Management.findOne({ isDirector: true, _id: { $ne: id } })
            if (existingDirector) {
                return Response.json(
                    { error: "Директор уже существует. Удалите существующего директора перед назначением нового." },
                    { status: 400 }
                )
            }
        }

        const updatedManagement = await Management.findByIdAndUpdate(
            id,
            {
                name,
                position,
                department,
                description,
                phone,
                email,
                image,
                responsibilities,
                isDirector,
                updatedAt: new Date().toISOString(),
            },
            { new: true }
        )

        if (!updatedManagement) {
            return Response.json(
                { error: "Failed to update management record" },
                { status: 500 }
            )
        }

        return Response.json({
            success: true,
            management: updatedManagement.toJSON(),
        })
    } catch (error) {
        console.error("Error updating management:", error)
        return Response.json(
            { error: "Failed to update management record" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await checkAuth()
    const { id } = await params

    try {
        await dbConnect()
        const management = await Management.findByIdAndDelete(id)

        if (!management) {
            return Response.json(
                { error: "Management record not found" },
                { status: 404 }
            )
        }

        return Response.json({
            success: true,
            management: management.toJSON(),
        })
    } catch (error) {
        console.error("Error deleting management:", error)
        return Response.json(
            { error: "Failed to delete management record" },
            { status: 500 }
        )
    }
}
