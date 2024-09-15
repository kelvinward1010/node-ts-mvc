export interface IsearchPost {
    title?: string;
    topic?: string[];
    page?: number;
}

export interface IPost {
    topic: string[];
    title: string;
    authorID: String;
    content: string;
    description: string;
    image_thumbnail: string;
}

export interface IPostUpdate {
    topic?: string[];
    title?: string;
    content?: string;
    description?: string;
    image_thumbnail?: string;
}
