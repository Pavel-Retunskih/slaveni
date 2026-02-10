"use client"

import { HonoreeForm } from "@/features/honoree/ui/HonoreeForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { IHonoree } from "@/shared/api/db/models/Honorees"
import { HonoreeFormPayload, HonoreeFormValues } from "@/shared/types/honoree"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/tabs"
import { useMemo, useState } from "react"
import { HonoreeCard } from "@/entities/honoree/HonoreeCard"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "@/shared/components/ui/button"
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog"

type Props = {
    title: string
    initialData?: IHonoree
    onSubmitAction: (data: HonoreeFormPayload) => Promise<void>
    onDeleteAction?: () => Promise<void>
}

const defaultValues: HonoreeFormValues = {
    name: "",
    position: "",
    department: "",
    achievement: "",
    years: "",
    photo: "",
}

const honoreeSchema = z.object({
    name: z.string().min(2, "ФИО должно содержать не менее 2 символов"),
    position: z.string().min(2, "Должность должна содержать не менее 2 символов"),
    department: z.string().min(2, "Отдел должен содержать не менее 2 символов"),
    achievement: z.string().min(10, "Описание достижений должно содержать не менее 10 символов"),
    years: z.string().min(1, "Стаж работы обязателен"),
    photo: z.string().optional(),
})

export function HonoreeFormShell({ title, initialData, onSubmitAction, onDeleteAction }: Props) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const methods = useForm<HonoreeFormValues>({
        defaultValues: { ...defaultValues, ...initialData },
        resolver: zodResolver(honoreeSchema),
        mode: "onSubmit",
    })
    const draft = useWatch({
        control: methods.control,
        compute: (values) => {
            return values
        }
    })

    const honoreePreview = useMemo<IHonoree>(() => {
        return {
            id: initialData?.id ?? "draft",
            name: draft.name,
            position: draft.position,
            department: draft.department,
            achievement: draft.achievement,
            years: draft.years,
            photo: draft.photo,
            createdAt: initialData?.createdAt ?? new Date(),
            updatedAt: initialData?.updatedAt ?? new Date(),
        }
    }, [draft, initialData])
    const isPreviewDisabled = !initialData && !methods.formState.isDirty
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/honorees"
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
                            <HonoreeCard
                                honoree={honoreePreview}
                            />
                        </TabsContent>
                        <TabsContent value="form">
                            <HonoreeForm
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
                    title="Удалить запись"
                    description="Вы уверены, что хотите удалить эту запись? Это действие нельзя отменить."
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
