import mongoose, { InferSchemaType } from "mongoose"

const adminScema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true }
})

export const Admin: mongoose.Model<InferSchemaType<typeof adminScema>> = mongoose.models.Admin || mongoose.model("Admin", adminScema)
export type AdminDocument = InferSchemaType<typeof adminScema>