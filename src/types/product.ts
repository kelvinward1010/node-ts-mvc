export interface IProduct {
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
    appreciation: [
        {
            star: number;
            idUser: string;
        },
    ];
    type: string;
    authorID: string;
}

export interface IProductUpdate {
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
    appreciation?: [
        {
            star: number;
            idUser: string;
        },
    ];
    type: string;
}
