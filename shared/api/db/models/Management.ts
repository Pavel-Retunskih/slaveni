import mongoose from "mongoose"

export interface IManagement {
    id: string
    name: string
    position: string
    department: string
    description: string
    responsibilities: string[]
    phone?: string
    email?: string
    image?: string
    isDirector: boolean
    createdAt: Date
    updatedAt: Date
}

const managementSchema = new mongoose.Schema<IManagement>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
    isDirector: { type: Boolean, default: false }
}, { timestamps: true })

managementSchema.set("toJSON", {
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

export const Management = mongoose.models.Management as mongoose.Model<IManagement> || mongoose.model<IManagement>("Management", managementSchema)