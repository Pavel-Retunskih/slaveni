"use client"

import { NewsForm } from "@/features/news/NewsForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { NewsJSON } from "@/shared/api/db/models/News"
import { NewsFormPayload, NewsFormValues } from "@/shared/types/news"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/tabs"
import { useMemo } from "react"
import { NewsFullDescriptionCard } from "@/entities/news/NewsFullDescriptionCard"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

type Props = {
    title: string
    initialData?: NewsJSON
    onSubmitAction: (data: NewsFormPayload) => Promise<void>
}
const defaultValues: NewsFormValues = {
    title: "",
    excerpt: "",
    category: "",
    featured: false,
    content: "",
    images: [],
    isPublished: false,
}
const newsSchema = z.object({
    title: z.string().min(1, "Название должно содержать не менее 10 символов"),
    excerpt: z.string().min(3, "Краткое описание должно содержать не менее 30 символов"),
    category: z.string().min(3, "Категория должна содержать не менее 3 символов"),
    featured: z.boolean(),
    content: z.string().min(10, "Содержимое должно содержать не менее 100 символов"),
    isPublished: z.boolean(),
})

export function NewsFormShell({ title, initialData, onSubmitAction }: Props) {


    const methods = useForm<NewsFormValues>({
        defaultValues: { ...defaultValues, ...initialData },
        resolver: zodResolver(newsSchema),
        mode: "onSubmit",
    })
    const draft = useWatch({
        control: methods.control,
        compute: (values) => {
            return values
        }
    })

    const newsPreview = useMemo<NewsJSON>(() => {
        return {
            id: initialData?.id ?? "draft",
            title: draft.title,
            excerpt: draft.excerpt,
            category: draft.category,
            featured: draft.featured,
            content: draft.content,
            images: draft.images,
            isPublished: draft.isPublished,
            createdAt: initialData?.createdAt ?? new Date(),
            updatedAt: initialData?.updatedAt ?? new Date(),
        }
    }, [draft, initialData])
    const isPreviewDisabled = !initialData && !methods.formState.isDirty
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/news"
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>

            <div className="flex-1 overflow-auto">
                <FormProvider {...methods}>
                    <Tabs defaultValue="form">
                        <TabsList className="gap-8 mb-6">
                            <TabsTrigger disabled={isPreviewDisabled} value="preview">Предпросмотр</TabsTrigger>
                            <TabsTrigger value="form">Форма</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview" className="max-w-4xl w-full mx-auto">
                            <NewsFullDescriptionCard news={newsPreview} />
                        </TabsContent>
                        <TabsContent value="form">
                            <NewsForm
                                initialData={initialData}
                                onSubmitAction={onSubmitAction}
                            />
                        </TabsContent>
                    </Tabs>
                </FormProvider>

            </div>
        </div>
    )
}
