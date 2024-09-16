export interface ISearchOrder {
    id?: string;
    status?: string;
    completed?: boolean;
    idUser?: string;
    name?: string;
    phone?: string;
    address?: string;
}

export interface IOrder {
    paymentmethod: string;
    idUser: string;
    deliveryaddress: {
        name: string;
        phone: string;
        address: string;
    };
    products?: [
        {
            _id: string;
            name: string;
            image: string;
            description: string;
            quantity: number;
            price: number;
            star: number;
            type: string;
        },
    ];
    yourinvoice: {
        price: number;
        shipping_price: number;
        totalprice: number;
    };
    status: string;
    completed: boolean;
    paidAt: string;
    deliveredAt: string;
}

export interface IOrderUpdate {
    status?: string;
    completed?: boolean;
}
