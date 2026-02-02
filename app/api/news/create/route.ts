import { dbConnect } from "@/shared/api/db/client"
import { News } from "@/shared/api/db/models/News"
import { checkAuth } from "@/shared/helpers/checkAuth"
import { createErrorResponse, createSuccessResponse } from "@/shared/helpers/apiResponse"
import type { NewsFormPayload } from "@/shared/types/news"
import { deleteUploadsByKeys } from "@/shared/lib/server/storage"
import mongoose from "mongoose"

export async function POST(request: Request) {
    await checkAuth()
    let tempUploadKeys: string[] = []

    try {
        await dbConnect()
        const body: NewsFormPayload = await request.json()

        const { title, excerpt, content, category, featured, images = [], uploadKeys = [] } = body
        tempUploadKeys = uploadKeys

        const news = await News.create({
            title,
            excerpt,
            content,
            category,
            featured,
            images,
        })

        return Response.json(createSuccessResponse({ news: news.toJSON() }), { status: 201 })
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
                code: "news_create_failed",
                message: "Не удалось создать новость: " + (error instanceof Error ? error.message : String(error)),
            }),
            { status: 500 },
        )
    }
}
