import mongoose from "mongoose"

export interface IVacancy {
    id: string
    title: string
    department: string
    type: string
    salary: string
    requirements: string[]
    duties: string[]
    benefits: string[]
    urgent: boolean
    createdAt: Date
    updatedAt: Date
}

const vacancySchema = new mongoose.Schema<IVacancy>({
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
    transform: (_doc, ret) => {
        const typedRet = ret as typeof ret & { _id?: mongoose.Types.ObjectId }

        if (typedRet._id) {
            typedRet.id = typedRet._id.toString()
        }

        Reflect.deleteProperty(typedRet, "_id")
    }
})

export const Vacancy = mongoose.models.Vacancy as mongoose.Model<IVacancy> || mongoose.model<IVacancy>("Vacancy", vacancySchema)