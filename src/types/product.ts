export interface IsearchProduct {
    name?: string;
    type?: string;
    page?: number;
}

export interface IProduct {
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

export interface IProductAppreciation {
    star: number;
    idUser: string;
}
