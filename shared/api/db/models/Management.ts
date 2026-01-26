import mongoose, { InferSchemaType } from "mongoose"

const managementSchema = new mongoose.Schema({
    id: { type: String },
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
export const Management: mongoose.Model<ManagementDocument> = mongoose.models.Management || mongoose.model<ManagementDocument>("Management", managementSchema);

export type ManagementDocument = InferSchemaType<typeof managementSchema>