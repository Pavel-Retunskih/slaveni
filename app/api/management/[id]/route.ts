import { dbConnect } from "@/shared/api/db/client"
import { Management } from "@/shared/api/db/models/Management"
import { NextRequest } from "next/server"
import { checkAuth } from "@/shared/helpers/checkAuth"
import { deleteUploadsByKeys } from "@/shared/lib/server/storage"
import { isManagedUploadUrl, extractUploadKeyFromUrl, isLegacyBlobUrl, extractLegacyBlobPath } from "@/shared/lib/uploads"

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

        if (existingRecord.image && isManagedUploadUrl(existingRecord.image) && existingRecord.image !== image) {
            const key = extractUploadKeyFromUrl(existingRecord.image)
            const legacyKey = isLegacyBlobUrl(existingRecord.image) ? extractLegacyBlobPath(existingRecord.image) : null
            const keysToDelete = [key, legacyKey].filter((k): k is string => Boolean(k))
            if (keysToDelete.length > 0) {
                await deleteUploadsByKeys(keysToDelete).catch((err) => console.error("Failed to delete old image:", err))
            }
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

        if (management.image && isManagedUploadUrl(management.image)) {
            const key = extractUploadKeyFromUrl(management.image)
            const legacyKey = isLegacyBlobUrl(management.image) ? extractLegacyBlobPath(management.image) : null
            const keysToDelete = [key, legacyKey].filter((k): k is string => Boolean(k))
            if (keysToDelete.length > 0) {
                await deleteUploadsByKeys(keysToDelete).catch((err) => console.error("Failed to delete image:", err))
            }
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
