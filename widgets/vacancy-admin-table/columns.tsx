"use client"

import { ColumnDef } from "@tanstack/react-table"

export type VacancyArticle = {
    title: string,
    department: string,
    type: string,
    urgent: string,
    id: string,
    createdAt: string,
    updatedAt: string,
}

export const vacancyColumns: ColumnDef<VacancyArticle>[] = [
    {
        accessorKey: "title",
        header: "Название",
    },
    {
        accessorKey: "department",
        header: "Отдел",
    },
    {
        accessorKey: "type",
        header: "Тип занятости",
    },
    {
        accessorKey: "urgent",
        header: "Срочная",
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
