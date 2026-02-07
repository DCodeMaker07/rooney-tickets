import { IsNumber, IsPositive, IsString } from "class-validator";

export class OrderItemDto {

    @IsString()
    orderId: string;

    @IsString()
    seastId: string;

    @IsNumber()
    @IsPositive()
    price: number;

}