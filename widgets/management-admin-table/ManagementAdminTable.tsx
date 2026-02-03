"use client"

import { DataTable } from "./data-table"
import { managementColumns, ManagementArticle } from "./columns"

interface ManagementAdminTableProps {
    data: ManagementArticle[]
}

export const ManagementAdminTable = ({ data }: ManagementAdminTableProps) => {
    return (
        <DataTable
            columns={managementColumns}
            data={data}
            getRowHref={(row) => `/admin/management/${row.id}/edit`}
        />
    )
}
