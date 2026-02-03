"use client"

import { DataTable } from "./data-table"
import { honoreeColumns, HonoreeArticle } from "./columns"

interface HonoreeAdminTableProps {
    data: HonoreeArticle[]
}

export const HonoreeAdminTable = ({ data }: HonoreeAdminTableProps) => {
    return (
        <DataTable
            columns={honoreeColumns}
            data={data}
            getRowHref={(row: HonoreeArticle) => `/admin/honorees/${row.id}/edit`}
        />
    )
}
