import mongoose from "mongoose"

export interface INews {
    id: string
    title: string
    category: string
    excerpt: string
    content: string
    images: string[]
    featured: boolean
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
}

const newsSchema = new mongoose.Schema<INews>(
    {
        title: {
            type: String,
            required: [true, "Заголовок обязателен"],
            minlength: [10, "Заголовок должен содержать не менее 10 символов"],
        },
        category: {
            type: String,
            required: [true, "Категория обязательна"],
            minlength: [3, "Категория должна содержать не менее 3 символов"],
        },
        excerpt: {
            type: String,
            required: [true, "Краткое описание обязательно"],
            minlength: [30, "Краткое описание должно содержать не менее 30 символов"],
        },
        content: {
            type: String,
            default: "",
            minlength: [100, "Содержимое должно содержать не менее 100 символов"],
        },
        images: [{ type: String }],
        featured: { type: Boolean, default: false },
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true },
)

newsSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        const typedRet = ret as typeof ret & { _id?: mongoose.Types.ObjectId }

        if (typedRet._id) {
            typedRet.id = typedRet._id.toString()
        }

        Reflect.deleteProperty(typedRet, "_id")
    },
})

export const News = mongoose.models.News as mongoose.Model<INews> || mongoose.model<INews>("News", newsSchema)