"use client"

import { ColumnDef } from "@tanstack/react-table"

export type HonoreeArticle = {
    name: string,
    position: string,
    department: string,
    years: string,
    id: string,
    createdAt: string,
    updatedAt: string,
}

export const honoreeColumns: ColumnDef<HonoreeArticle>[] = [
    {
        accessorKey: "name",
        header: "ФИО",
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
        accessorKey: "years",
        header: "Стаж работы",
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
