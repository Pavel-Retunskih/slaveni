import { dbConnect } from "@/shared/api/db/client"
import { Vacancy } from "@/shared/api/db/models/Vacancy"
import { checkAuth } from "@/shared/helpers/checkAuth"
import { createErrorResponse, createSuccessResponse } from "@/shared/helpers/apiResponse"
import type { VacancyFormPayload } from "@/shared/types/vacancy"
import mongoose from "mongoose"

export async function POST(request: Request) {
    await checkAuth()

    try {
        await dbConnect()
        const body: VacancyFormPayload = await request.json()

        const { title, department, type, salary, requirements, duties, benefits, urgent } = body

        const vacancy = await Vacancy.create({
            title,
            department,
            type,
            salary,
            requirements,
            duties,
            benefits,
            urgent,
        })

        return Response.json(createSuccessResponse({ vacancy: vacancy.toJSON() }), { status: 201 })
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
                code: "vacancy_create_failed",
                message: "Не удалось создать вакансию: " + (error instanceof Error ? error.message : String(error)),
            }),
            { status: 500 },
        )
    }
}
