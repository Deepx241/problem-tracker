import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        platform: {
            type: String,
            required: true,
            enum: ["LeetCode", "Codeforces", "CodeChef", "AtCoder", "Other"],
        },
        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"],
        },
        status: {
            type: String,
            default: "Todo",
            enum: ["Todo", "Solved", "Revision"],
        },
        topic: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        notes: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Problem", problemSchema);