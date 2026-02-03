import { dbConnect } from "@/shared/api/db/client"
import { Management } from "@/shared/api/db/models/Management"
import { checkAuth } from "@/shared/helpers/checkAuth"
import { createErrorResponse, createSuccessResponse } from "@/shared/helpers/apiResponse"
import type { ManagementFormPayload } from "@/shared/types/management"
import mongoose from "mongoose"

export async function POST(request: Request) {
    await checkAuth()

    try {
        await dbConnect()
        const body: ManagementFormPayload = await request.json()

        const { name, position, department, description, phone, email, image, responsibilities, isDirector } = body

        if (isDirector) {
            const existingDirector = await Management.findOne({ isDirector: true })
            if (existingDirector) {
                return Response.json(
                    createErrorResponse({
                        code: "director_exists",
                        message: "Директор уже существует. Удалите существующего директора перед созданием нового.",
                    }),
                    { status: 400 }
                )
            }
        }

        const management = await Management.create({
            name,
            position,
            department,
            description,
            phone,
            email,
            image,
            responsibilities,
            isDirector,
        })

        return Response.json(createSuccessResponse({ management: management.toJSON() }), { status: 201 })
    } catch (error) {
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
                code: "management_create_failed",
                message: "Не удалось создать запись: " + (error instanceof Error ? error.message : String(error)),
            }),
            { status: 500 },
        )
    }
}
