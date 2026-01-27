"use client"

import { DataTable } from "./data-table"
import { newsColumns, NewsArticle } from "./columns"

interface NewsAdminTableProps {
    data: NewsArticle[]
}

export const NewsAdminTable = ({ data }: NewsAdminTableProps) => {
    return (
        <DataTable
            columns={newsColumns}
            data={data}
            getRowHref={(row) => `/admin/news/${row.id}/edit`}
        />
    )
}
