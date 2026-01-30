"use client"

import { ColumnDef } from "@tanstack/react-table"

export type NewsArticle = {
    title: string,
    category: string,
    excerpt: string,
    featured: string,
    id: string,
    createdAt: string,
    updatedAt: string,
    isPublished: { title: string, value: boolean }
}

export const newsColumns: ColumnDef<NewsArticle>[] = [

    {
        accessorKey: "title",
        header: "Заголовок",
    }, {
        accessorFn: (row) => row.isPublished.title,
        header: "Опубликовано",
    },
    {
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
    },

]