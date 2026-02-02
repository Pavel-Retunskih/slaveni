import { Button } from "./button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../dialog"

type Props = {
    open: boolean
    onOpenChange?: (open: boolean) => void
    title: string
    description: string
    confirmText: string
    cancelText: string
    onConfirm: () => void | Promise<void>
    onCancel?: () => void
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
}: Props) {
    const handleCancel = () => {
        onCancel?.()
        onOpenChange?.(false)
    }

    const handleConfirm = async () => {
        await onConfirm()
        onOpenChange?.(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancel}>{cancelText}</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleConfirm}>{confirmText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
