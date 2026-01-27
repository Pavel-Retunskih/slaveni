import type { NewsFormValues } from "@/shared/types/news";

const requiredFields: (keyof NewsFormValues)[] = [
    "title",
    "category",
    "excerpt",
    "content",
]

export class Validator {
    static validateNewsCreate(data: NewsFormValues) {
        for (const field of requiredFields) {
            const value = data[field]

            if (value === undefined || value === null) {
                return false
            }

            if (typeof value === "string" && value.length === 0) {
                return false
            }

        }

        if (data.images && !Array.isArray(data.images)) {
            return false
        }

        return true
    }
    static validateImageUpload(files: File[]) {
        for (const file of files) {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                return false
            }

            if (file.size > 1024 * 1024 * 5) {
                return false
            }
        }

        return true
    }
}