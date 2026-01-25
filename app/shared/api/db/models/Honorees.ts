import mongoose, { InferSchemaType } from "mongoose"

const honoreesSchema = new mongoose.Schema({
    id: String,
    name: String,
    position: String,
    department: String,
    achievement: String,
    years: String
})

honoreesSchema.set("toJSON", {
    virtuals: true,
    versionKey: true,
    transform: (doc, ret) => {
        const typedRet = ret as typeof ret & { _id?: mongoose.Types.ObjectId }

        if (typedRet._id) {
            typedRet.id = typedRet._id.toString()
        }

        Reflect.deleteProperty(typedRet, "_id")
    }
})

export const Honorees: mongoose.Model<InferSchemaType<typeof honoreesSchema>> = mongoose.models.Honorees || mongoose.model("Honorees", honoreesSchema)
export type HonoreesDocument = InferSchemaType<typeof honoreesSchema>