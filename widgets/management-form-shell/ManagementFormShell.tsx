"use client"

import { ManagementForm } from "@/features/management/ui/ManagementForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { ManagementDocument } from "@/shared/api/db/models/Management"
import { ManagementFormPayload, ManagementFormValues } from "@/shared/types/management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/tabs"
import { useMemo, useState } from "react"
import { DirectorCard } from "@/entities/managment/DirectorCard"
import { SpecialistCard } from "@/entities/managment/SpecialistCard"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "@/shared/components/ui/button"
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog"

type Props = {
    title: string
    initialData?: ManagementDocument
    onSubmitAction: (data: ManagementFormPayload) => Promise<void>
    onDeleteAction?: () => Promise<void>
    isDirector: boolean
}

const defaultValues: ManagementFormValues = {
    name: "",
    position: "",
    department: "",
    description: "",
    phone: "",
    email: "",
    image: "",
    responsibilities: [],
    isDirector: false,
}

const managementSchema = z.object({
    name: z.string().min(3, "Имя должно содержать не менее 3 символов"),
    position: z.string().min(3, "Должность должна содержать не менее 3 символов"),
    department: z.string().min(2, "Отдел должен содержать не менее 2 символов"),
    description: z.string().min(10, "Описание должно содержать не менее 10 символов"),
    phone: z.string().optional(),
    email: z.string().email("Некорректный email").optional().or(z.literal("")),
    image: z.string().optional(),
    responsibilities: z.array(z.string()),
    isDirector: z.boolean(),
})

export function ManagementFormShell({ title, initialData, onSubmitAction, onDeleteAction, isDirector }: Props) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const methods = useForm<ManagementFormValues>({
        defaultValues: { ...defaultValues, ...initialData, isDirector },
        resolver: zodResolver(managementSchema),
        mode: "onSubmit",
    })
    const draft = useWatch({
        control: methods.control,
        compute: (values) => {
            return values
        }
    })

    const managementPreview = useMemo<ManagementDocument>(() => {
        return {
            id: initialData?.id ?? "draft",
            name: draft.name,
            position: draft.position,
            department: draft.department,
            description: draft.description,
            phone: draft.phone ?? "",
            email: draft.email ?? "",
            image: draft.image ?? "",
            responsibilities: draft.responsibilities,
            isDirector: draft.isDirector,
            createdAt: initialData?.createdAt ?? new Date(),
            updatedAt: initialData?.updatedAt ?? new Date(),
        }
    }, [draft, initialData])
    
    const isPreviewDisabled = !initialData && !methods.formState.isDirty
    
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/management"
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
                            {isDirector ? (
                                <DirectorCard director={managementPreview} />
                            ) : (
                                <SpecialistCard specialist={managementPreview} />
                            )}
                        </TabsContent>
                        <TabsContent value="form">
                            <ManagementForm
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
