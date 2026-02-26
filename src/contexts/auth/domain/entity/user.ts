export interface PrimitiveUser {
    id: string;
    email: string;
    password?: string;
    roles: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class User {

    #attributes: PrimitiveUser;

    constructor(attributes: PrimitiveUser) {
        this.#attributes = attributes;
    }

    toValue(): PrimitiveUser {
        return {...this.#attributes}
    }
    
}