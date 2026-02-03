"use client"

import { VacancyForm } from "@/features/vacancy/ui/VacancyForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { VacancyJSON } from "@/shared/api/db/models/Vacancy"
import { VacancyFormPayload, VacancyFormValues } from "@/shared/types/vacancy"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/tabs"
import { useMemo, useState } from "react"
import { VacancyCard } from "@/entities/vacancy/VacancyCard"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "@/shared/components/ui/button"
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog"

type Props = {
    title: string
    initialData?: VacancyJSON
    onSubmitAction: (data: VacancyFormPayload) => Promise<void>
    onDeleteAction?: () => Promise<void>
}
const defaultValues: VacancyFormValues = {
    title: "",
    department: "",
    type: "",
    salary: "",
    requirements: [],
    duties: [],
    benefits: [],
    urgent: false,
}
const vacancySchema = z.object({
    title: z.string().min(3, "Название должно содержать не менее 3 символов"),
    department: z.string().min(2, "Отдел должен содержать не менее 2 символов"),
    type: z.string().min(1, "Тип занятости обязателен"),
    salary: z.string().optional(),
    requirements: z.array(z.string()),
    duties: z.array(z.string()),
    benefits: z.array(z.string()),
    urgent: z.boolean(),
})

export function VacancyFormShell({ title, initialData, onSubmitAction, onDeleteAction }: Props) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const methods = useForm<VacancyFormValues>({
        defaultValues: { ...defaultValues, ...initialData },
        resolver: zodResolver(vacancySchema),
        mode: "onSubmit",
    })
    const draft = useWatch({
        control: methods.control,
        compute: (values) => {
            return values
        }
    })

    const vacancyPreview = useMemo<VacancyJSON>(() => {
        return {
            id: initialData?.id ?? "draft",
            title: draft.title,
            department: draft.department,
            type: draft.type,
            salary: draft.salary ?? "",
            requirements: draft.requirements,
            duties: draft.duties,
            benefits: draft.benefits,
            urgent: draft.urgent,
            createdAt: initialData?.createdAt ?? new Date(),
            updatedAt: initialData?.updatedAt ?? new Date(),
        }
    }, [draft, initialData])
    const isPreviewDisabled = !initialData && !methods.formState.isDirty
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/vacancies"
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
                            <VacancyCard
                                vacancy={vacancyPreview}
                                action={<></>}
                            />
                        </TabsContent>
                        <TabsContent value="form">
                            <VacancyForm
                                initialData={initialData}
                                onSubmitAction={onSubmitAction}
                                onDeleteAction={onDeleteAction ? <Button variant="destructive" type="button" onClick={() => setIsDeleteModalOpen(true)}>Удалить</Button> : undefined}
                            />
                        </TabsContent>
                    </Tabs>
                </FormProvider>
                <ConfirmDialog
                    open={isDeleteModalOpen}
                    onOpenChange={setIsDeleteModalOpen}
                    title="Удалить вакансию"
                    description="Вы уверены, что хотите удалить эту вакансию? Это действие нельзя отменить."
                    confirmText="Удалить"
                    cancelText="Отмена"
                    onConfirm={async () => {
                        if (onDeleteAction) {
                            await onDeleteAction()
                        }
                    }}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            </div>
        </div>
    )
}
