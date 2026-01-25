import mongoose, { InferSchemaType } from "mongoose";

const newsSchema = new mongoose.Schema({
    title: String,
    category: String,
    excerpt: String,
    featured: Boolean,
    id: String,
    createdAt: String,
    updatedAt: String

}, { timestamps: true })

newsSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        const typedRet = ret as typeof ret & { _id?: mongoose.Types.ObjectId }

        if (typedRet._id) {
            typedRet.id = typedRet._id.toString()
        }

        Reflect.deleteProperty(typedRet, "_id")
    }
})

export const News = mongoose.models.News || mongoose.model<NewsDocument>("News", newsSchema);

export type NewsDocument = InferSchemaType<typeof newsSchema>