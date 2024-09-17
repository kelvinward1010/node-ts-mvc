export interface ISearchOrder {
    id?: string;
    status?: string;
    completed?: boolean;
    idUser?: string;
    nameOrder?: string;
}

export interface IOrder {
    name: string;
    paymentmethod: string;
    idUser: string;
    deliveryaddress: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products?: [
        {
            key: any;
            _id: string;
            name?: string;
            image?: string;
            description?: string;
            quantity?: number;
            price?: number;
            type?: string;
            appreciation?: [
                {
                    star: number;
                    idUser: string;
                },
            ];
            createdAt: string;
            updatedAt: string;
        },
    ];
    yourinvoice: {
        price: number;
        shipping_price: number;
        totalprice: number;
    };
    status: string;
    completed: boolean;
    deliveredAt: string;
}

export interface IOrderUpdate {
    status?: string;
    completed?: boolean;
}
