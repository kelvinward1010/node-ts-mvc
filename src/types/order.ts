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
    products: [
        {
            key: any;
            _id: string;
            name?: string;
            image?: string;
            quantity?: number;
            price?: number;
            type?: string;
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
    name?: string;
    paymentmethod?: string;
    idUser?: string;
    deliveryaddress?: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products: [
        {
            key: any;
            _id: string;
            name?: string;
            image?: string;
            quantity?: number;
            price?: number;
            type?: string;
        },
    ];
    yourinvoice?: {
        price: number;
        shipping_price: number;
        totalprice: number;
    };
    status?: string;
    completed?: boolean;
    deliveredAt?: string;
}
