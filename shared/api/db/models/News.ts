import mongoose, { HydratedDocument, InferSchemaType, Model, Types } from "mongoose";

const newsSchema = new mongoose.Schema(
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
    transform: (_doc, ret: NewsSchemaType & { _id?: Types.ObjectId; id?: string }) => {
        if (ret._id) {
            ret.id = ret._id.toString()
        }

        Reflect.deleteProperty(ret, "_id")
    },
})

type NewsSchemaType = InferSchemaType<typeof newsSchema>

export const News: Model<NewsDocument> = mongoose.models.News || mongoose.model<NewsDocument>("News", newsSchema);

export type NewsDocument = HydratedDocument<NewsSchemaType>

export type NewsJSON = NewsSchemaType & { id: string }