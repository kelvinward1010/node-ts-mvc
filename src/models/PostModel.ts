import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        topic: {
            type: [String],
            required: true,
        },
        title: { type: String, required: true },
        authorID: { type: String, required: true },
        content: { type: "string", required: true },
        description: { type: "string", required: true },
        image_thumbnail: { type: "string" },
    },
    { timestamps: true },
);

export const postModel = mongoose.model("Post", postSchema);
