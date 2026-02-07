import { IsIn, IsNumber, IsPositive, IsString } from "class-validator";

type PaymentProvider = 'STRIPE' | 'PAYPAL';

export class CreatePaymentSessionDto {

    @IsString()
    orderId: string;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsIn(['STRIPE', 'PAYPAL'])
    provider: PaymentProvider;

    @IsString()
    externalId?: string;

    @IsString()
    currency?: string;

}