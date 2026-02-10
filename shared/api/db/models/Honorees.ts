import mongoose from "mongoose"

export interface IHonoree {
    id: string
    name: string
    position: string
    department: string
    achievement: string
    years: string
    photo?: string
    createdAt: Date
    updatedAt: Date
}

const honoreesSchema = new mongoose.Schema<IHonoree>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    achievement: { type: String, required: true },
    years: { type: String, required: true },
    photo: String
}, { timestamps: true })

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

export const Honorees = mongoose.models.Honorees as mongoose.Model<IHonoree> || mongoose.model<IHonoree>("Honorees", honoreesSchema)