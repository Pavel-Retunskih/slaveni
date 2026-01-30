"use client"

import { ColumnDef } from "@tanstack/react-table"

export type NewsArticle = {
    title: string,
    category: string,
    excerpt: string,
    featured: string,
    id: string,
    createdAt: string,
    updatedAt: string
}

export const newsColumns: ColumnDef<NewsArticle>[] = [
    {
        accessorKey: "title",
        header: "Заголовок",
    }, {
        accessorKey: "category",
        header: "Категория",
    }, {
        accessorKey: "featured",
        header: "Приоритет",
    },
    {
        accessorKey: "createdAt",
        header: "Дата создания",

    },
    {
        accessorKey: "updatedAt",
        header: "Дата обновления",
    }
]