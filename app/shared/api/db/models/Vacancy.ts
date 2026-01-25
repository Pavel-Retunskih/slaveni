import mongoose, { InferSchemaType } from "mongoose";

const vacancySchema = new mongoose.Schema({

    id: String,
    title: String,
    department: String,
    type: String,
    salary: String,
    requirements: Array<String>,
    duties: Array<String>,
    benefits: Array<String>,
    urgent: Boolean

}, { timestamps: true })

vacancySchema.set("toJSON", {
    virtuals: true,
    versionKey: true,
    transform: (_doc, ret) => {
        const typedRet = ret as typeof ret & { _id?: mongoose.Types.ObjectId }

        if (typedRet._id) {
            typedRet.id = typedRet._id.toString()
        }

        Reflect.deleteProperty(typedRet, "_id")
    }
})

export const Vacancy: mongoose.Model<VacancyDocument> = mongoose.models.Vacancy || mongoose.model<VacancyDocument>("Vacancy", vacancySchema);

export type VacancyDocument = InferSchemaType<typeof vacancySchema>