import mongoose, { InferSchemaType, Document, Model } from "mongoose"
import bcrypt from "bcrypt"

const adminScema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// Hash password before saving
adminScema.pre('save', async function () {
    if (!this.isModified('password')) return

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Method to compare passwords
adminScema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

// Interface for the admin document
interface IAdminDocument extends Document {
    login: string
    password: string
    comparePassword(candidatePassword: string): Promise<boolean>
}

// Interface for the admin model
interface IAdminModel extends Model<IAdminDocument> { }

export const Admin = (mongoose.models.Admin as IAdminModel) || mongoose.model<IAdminDocument>("Admin", adminScema)
export type AdminDocument = InferSchemaType<typeof adminScema>