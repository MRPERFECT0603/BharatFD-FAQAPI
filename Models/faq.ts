import { randomUUID } from "crypto";
import mongoose from "mongoose";

const faqsSchema = new mongoose.Schema(
    {
        faqID: { type: String, default: () => randomUUID(), unique: true },
        question: { type: String },
        answer: { type: Number },
        lang: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Faqs", faqsSchema);