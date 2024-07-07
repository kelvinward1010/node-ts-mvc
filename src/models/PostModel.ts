import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    topic: {
        type: [String],
        required: true,
    },
    title: {type: "string", required: true},
    author: {
        id: {type: "string", required: true},
        name: {type: "string", required: true},
        image: {type: "string"},
    },
    content: {type: "string", required: true},
    description: {type: "string", required: true},
    image_thumbnail: {type: "string"},
}, {timestamps: true});

export const postModel = mongoose.model("Post", postSchema);