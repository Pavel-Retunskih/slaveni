import mongoose, { HydratedDocument, InferSchemaType, Model, Types } from "mongoose";

const vacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Название вакансии обязательно"],
        minlength: [3, "Название должно содержать не менее 3 символов"],
    },
    department: {
        type: String,
        required: [true, "Отдел обязателен"],
        minlength: [2, "Отдел должен содержать не менее 2 символов"],
    },
    type: {
        type: String,
        required: [true, "Тип занятости обязателен"],
    },
    salary: {
        type: String,
        default: "",
    },
    requirements: {
        type: [String],
        default: [],
    },
    duties: {
        type: [String],
        default: [],
    },
    benefits: {
        type: [String],
        default: [],
    },
    urgent: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

vacancySchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: VacancySchemaType & { _id?: Types.ObjectId; id?: string }) => {
        if (ret._id) {
            ret.id = ret._id.toString()
        }

        Reflect.deleteProperty(ret, "_id")
    }
})

type VacancySchemaType = InferSchemaType<typeof vacancySchema>

export const Vacancy: Model<VacancyDocument> = mongoose.models.Vacancy || mongoose.model<VacancyDocument>("Vacancy", vacancySchema);

export type VacancyDocument = HydratedDocument<VacancySchemaType>

export type VacancyJSON = VacancySchemaType & { id: string }