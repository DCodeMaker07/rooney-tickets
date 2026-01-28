import { v4 as uuid } from 'uuid';

export interface PrimitivePayment {
    id: string;
    amount: number;
    customerId: string;
}

export class Payment {
    constructor(
        private attributes: PrimitivePayment
    ) { }

    static create(createPayment: {
        amount: number;
        customerId: string;
    }) {
        return new Payment({
            id: uuid(),
            amount: createPayment.amount,
            customerId: createPayment.customerId
        });
    }

    toValue(): PrimitivePayment {
        return {
            id: this.attributes.id,
            amount: this.attributes.amount,
            customerId: this.attributes.customerId
        }
    }
}