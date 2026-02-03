import { dbConnect } from "@/shared/api/db/client"
import { Honorees } from "@/shared/api/db/models/Honorees"
import { NextRequest } from "next/server"
import { checkAuth } from "@/shared/helpers/checkAuth"

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await checkAuth()

    const { id } = await params

    try {
        await dbConnect()

        const body = await request.json()
        const { name, position, department, achievement, years, photo } = body

        const existingHonoree = await Honorees.findById(id)
        if (!existingHonoree) {
            return Response.json(
                { error: "Honoree not found" },
                { status: 404 }
            )
        }

        const updatedHonoree = await Honorees.findByIdAndUpdate(
            id,
            {
                name,
                position,
                department,
                achievement,
                years,
                photo,
                updatedAt: new Date().toISOString(),
            },
            { new: true }
        )

        if (!updatedHonoree) {
            return Response.json(
                { error: "Failed to update honoree" },
                { status: 500 }
            )
        }

        return Response.json({
            success: true,
            honoree: updatedHonoree.toJSON(),
        })
    } catch (error) {
        console.error("Error updating honoree:", error)
        return Response.json(
            { error: "Failed to update honoree" },
            { status: 500 }
        )
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        await dbConnect()
        const honoree = await Honorees.findById(id)

        if (!honoree) {
            return Response.json(
                { error: "Honoree not found" },
                { status: 404 }
            )
        }

        return Response.json({
            honoree: honoree.toJSON(),
        })
    } catch (error) {
        console.error("Error fetching honoree:", error)
        return Response.json(
            { error: "Failed to fetch honoree" },
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
        const honoree = await Honorees.findByIdAndDelete(id)

        if (!honoree) {
            return Response.json(
                { error: "Honoree not found" },
                { status: 404 }
            )
        }

        return Response.json({
            success: true,
            honoree: honoree.toJSON(),
        })
    } catch (error) {
        console.error("Error deleting honoree:", error)
        return Response.json(
            { error: "Failed to delete honoree" },
            { status: 500 }
        )
    }
}
