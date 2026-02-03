import { dbConnect } from "@/shared/api/db/client"
import { Honorees } from "@/shared/api/db/models/Honorees"
import { checkAuth } from "@/shared/helpers/checkAuth"
import { createErrorResponse, createSuccessResponse } from "@/shared/helpers/apiResponse"
import type { HonoreeFormPayload } from "@/shared/types/honoree"
import { deleteUploadsByKeys } from "@/shared/lib/server/storage"
import mongoose from "mongoose"

export async function POST(request: Request) {
    await checkAuth()
    let tempUploadKeys: string[] = []

    try {
        await dbConnect()
        const body: HonoreeFormPayload = await request.json()

        const { name, position, department, achievement, years, photo, uploadKeys = [] } = body
        tempUploadKeys = uploadKeys

        const honoree = await Honorees.create({
            name,
            position,
            department,
            achievement,
            years,
            photo,
        })

        return Response.json(createSuccessResponse({ honoree: honoree.toJSON() }), { status: 201 })
    } catch (error) {
        await deleteUploadsByKeys(tempUploadKeys)

        if (error instanceof mongoose.Error.ValidationError) {
            const fields = Object.entries(error.errors).reduce<Record<string, { message: string }>>(
                (acc, [field, validatorError]) => {
                    const message =
                        typeof validatorError.message === "string"
                            ? validatorError.message
                            : "Ошибка валидации"

                    acc[field] = { message }
                    return acc
                },
                {},
            )

            return Response.json(
                createErrorResponse({
                    code: "validation_error",
                    message: "Ошибка валидации",
                    fields,
                }),
                { status: 400 },
            )
        }

        return Response.json(
            createErrorResponse({
                code: "honoree_create_failed",
                message: "Не удалось создать запись: " + (error instanceof Error ? error.message : String(error)),
            }),
            { status: 500 },
        )
    }
}
