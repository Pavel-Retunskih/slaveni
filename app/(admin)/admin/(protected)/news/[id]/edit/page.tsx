import { loadNewsById } from "@/helpers/loadNews"

export default async function NewsIdEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const news = await loadNewsById(id)
    return <div>
        <h2>{news.title}</h2>
        <form action="">
            <input type="text" name="title" value={news.title} />
            <input type="text" name="category" value={news.category} />
            <input type="text" name="excerpt" value={news.excerpt} />
            <input type="text" name="featured" value={news.featured.toString()} />
            <button type="submit">Save</button>
        </form>
    </div>
}