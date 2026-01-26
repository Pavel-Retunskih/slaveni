import { loadNewsById } from "@/shared/helpers/loadNews"
import Link from "next/link"

export default async function NewsIdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const news = await loadNewsById(id)
    return <div>
        <h2>{news.title}</h2>
        <p>{news.excerpt}</p>
        <Link href={`/admin/news/${news.id}/edit`}>Edit</Link>
    </div>
}