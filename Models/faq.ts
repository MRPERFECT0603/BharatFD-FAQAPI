import { randomUUID } from "crypto";
import mongoose from "mongoose";

const faqsSchema = new mongoose.Schema(
    {
        faqID: { type: String, default: () => randomUUID(), unique: true },
        question: { type: String },
        answer: { type: String },
        lang: { type: String },
    },
    {
        timestamps: true,
    }
);

export default  mongoose.model("Faqs", faqsSchema);