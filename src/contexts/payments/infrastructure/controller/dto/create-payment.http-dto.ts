import { IsNumber, IsNotEmpty, IsUUID } from 'class-validator'

export class CreatePaymentHttpDto {
    @IsNumber()
    @IsNotEmpty()
    amount!: number;

    @IsUUID()
    @IsNotEmpty()
    customerId!: string;
}