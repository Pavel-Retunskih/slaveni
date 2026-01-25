import { notFound } from "next/navigation"
import { HttpError, httpClient } from "@/shared/api/http/httpClient"
import { type NewsDocument } from "@/shared/api/db/models/News"

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    if (!id) {
        notFound()
    }

    try {
        const { news } = await httpClient<{ news: NewsDocument }>("/api/news/getOne", {
            searchParams: { id },
        })

        return (
            <>
                <div>{news.title}</div>
                <div>{news.id}</div>
            </>
        )
    } catch (error) {
        if (error instanceof HttpError && error.status === 404) {
            notFound()
        }

        throw error
    }
}