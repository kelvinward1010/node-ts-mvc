export interface IsearchPost {
    title?: string;
    topic?: string[];
}

export interface IPost {
    topic: string[];
    title: string;
    author: {
        id: string;
        name: string;
        image?: string;
    },
    content: string;
    description: string;
    image_thumbnail: string;
}

export interface IPostUpdate {
    topic?: string[];
    title?: string;
    author?: {
        id: string;
        name: string;
        image?: string;
    },
    content?: string;
    description?: string;
    image_thumbnail?: string;
}