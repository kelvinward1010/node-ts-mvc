import { Request, Response } from "express";
import { IPost, IPostUpdate, IsearchPost } from "../types/post";
import { createPost, getNewestPosts, getPost, searchPosts, updatePost } from "../services/postService";


const searchPostsFN = async (req: Request, res: Response) => {
    try {
        const querySearch: IsearchPost = req.query;

        const response = await searchPosts(querySearch.title, querySearch.topic);
        return res.status(200).json(response);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
}

const createPostFN = async (req: Request, res: Response) => {
    try {
        const { topic, title, author, content, description, image_thumbnail }: IPost = req.body;
        
        if( !topic || !title || !content || !description || !image_thumbnail){
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
            })
        }

        if(!author.id || !author.name){
            return res.status(400).json({
                status: 400,
                message: 'Missing author information!',
            })
        }
        
        const newPost = await createPost({ topic, title, author, content, description, image_thumbnail })
        return res.status(200).json(newPost);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
}

const getPostFN = async (req: Request, res: Response) => {
    try {
        const postId: string = req.params.id;

        if (!postId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing post ID!'
            })
        }

        const response = await getPost(postId);
        return res.status(200).json(response);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
}

const updatePostFN = async (req: Request, res: Response) => {
    try {
        const postId: string = req.params.id;
        const { topic, title, author, content, description, image_thumbnail }: IPostUpdate = req.body;

        if (!postId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing post ID!'
            })
        }
        if(!content || !description || !image_thumbnail || !title || !topic){
            return res.status(400).json({
                status: 400,
                message: 'Bad request!'
            })
        }

        const response = await updatePost(postId, { topic, title, author, content, description, image_thumbnail });
        return res.status(200).json(response);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
}

const getNewestPostsFN = async (req: Request, res: Response) => {
    try {

        const response = await getNewestPosts();
        return res.status(200).json(response);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
}

export {
    createPostFN,
    updatePostFN,
    getPostFN,
    getNewestPostsFN,
    searchPostsFN
}