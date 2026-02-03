"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ManagementArticle = {
    name: string,
    position: string,
    department: string,
    role: string,
    id: string,
    createdAt: string,
    updatedAt: string,
}

export const managementColumns: ColumnDef<ManagementArticle>[] = [
    {
        accessorKey: "name",
        header: "Имя",
    },
    {
        accessorKey: "position",
        header: "Должность",
    },
    {
        accessorKey: "department",
        header: "Отдел",
    },
    {
        accessorKey: "role",
        header: "Роль",
    },
    {
        accessorKey: "createdAt",
        header: "Дата создания",
    },
    {
        accessorKey: "updatedAt",
        header: "Дата обновления",
    },
]
