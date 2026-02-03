import { dbConnect } from "@/shared/api/db/client"
import { Vacancy } from "@/shared/api/db/models/Vacancy"
import { NextRequest } from "next/server"
import { checkAuth } from "@/shared/helpers/checkAuth"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        await dbConnect()
        const vacancy = await Vacancy.findById(id)

        if (!vacancy) {
            return Response.json(
                { error: "Vacancy not found" },
                { status: 404 }
            )
        }

        return Response.json({
            vacancy: vacancy.toJSON(),
        })
    } catch (error) {
        console.error("Error fetching vacancy:", error)
        return Response.json(
            { error: "Failed to fetch vacancy" },
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
        const { title, department, type, salary, requirements, duties, benefits, urgent } = body

        const existingVacancy = await Vacancy.findById(id)
        if (!existingVacancy) {
            return Response.json(
                { error: "Vacancy not found" },
                { status: 404 }
            )
        }

        const updatedVacancy = await Vacancy.findByIdAndUpdate(
            id,
            {
                title,
                department,
                type,
                salary,
                requirements,
                duties,
                benefits,
                urgent,
                updatedAt: new Date().toISOString(),
            },
            { new: true }
        )

        if (!updatedVacancy) {
            return Response.json(
                { error: "Failed to update vacancy" },
                { status: 500 }
            )
        }

        return Response.json({
            success: true,
            vacancy: updatedVacancy.toJSON(),
        })
    } catch (error) {
        console.error("Error updating vacancy:", error)
        return Response.json(
            { error: "Failed to update vacancy" },
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
        const vacancy = await Vacancy.findByIdAndDelete(id)

        if (!vacancy) {
            return Response.json(
                { error: "Vacancy not found" },
                { status: 404 }
            )
        }

        return Response.json({
            success: true,
            vacancy: vacancy.toJSON(),
        })
    } catch (error) {
        console.error("Error deleting vacancy:", error)
        return Response.json(
            { error: "Failed to delete vacancy" },
            { status: 500 }
        )
    }
}
