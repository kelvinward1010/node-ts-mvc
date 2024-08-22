"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    topic: {
        type: [String],
        required: true,
    },
    title: { type: "string", required: true },
    author: {
        id: { type: "string", required: true },
        name: { type: "string", required: true },
        image: { type: "string" },
    },
    content: { type: "string", required: true },
    description: { type: "string", required: true },
    image_thumbnail: { type: "string" },
}, { timestamps: true });
exports.postModel = mongoose_1.default.model("Post", postSchema);
