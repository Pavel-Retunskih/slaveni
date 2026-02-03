"use client"

import { DataTable } from "./data-table"
import { vacancyColumns, VacancyArticle } from "./columns"

interface VacancyAdminTableProps {
    data: VacancyArticle[]
}

export const VacancyAdminTable = ({ data }: VacancyAdminTableProps) => {
    return (
        <DataTable
            columns={vacancyColumns}
            data={data}
            getRowHref={(row) => `/admin/vacancies/${row.id}/edit`}
        />
    )
}
