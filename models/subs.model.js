import mongoose from "mongoose";


const SubsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 255
    },
    category: {
        type: String,
        enum: ["entertainment", "sports", "news", "tech", "others"],
        required: true
    },
    currency: {
        type: String,
        enum: ["NPR", "INR", "EUR", "USD", "GBP"],
        default: "EUR"
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"]
    },
    periods: {
        type: String,
        enum: ["daily", "weekly", "monthy", "yearly"],
        default: "monthly"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value < new Date(),
            message: "Start date must be before today"
        }
    },
    renewDate: {
        type: Date,
        validate: {
            validator: function (value) {
                (value) => value > this.startDate
            },
            message: "Renew date must be after the start date"
        }
    },
    paymentType: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

SubsSchema.pre("save", function (next) {
    if (!this.renewDate) {
        const renewPeriods = {
            daily: 1, weekly: 7, monthly: 30, yearly: 365
        }
        this.renewDate = new Date(this.startDate)
        this.renewDate.setDate(this.renewDate.getDate() + renewPeriods[this.periods])
    }

    if (this.renewDate < new Date()) {
        this.status = "expired"
    }

    next()
})

const Subs = mongoose.model('Subs', SubsSchema)

export default Subs
