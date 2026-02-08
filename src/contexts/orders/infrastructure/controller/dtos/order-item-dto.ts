import { IsNumber, IsPositive, IsString } from "class-validator";

export class OrderItemDto {

    @IsString()
    seatId: string;

    @IsNumber()
    @IsPositive()
    price: number;

}