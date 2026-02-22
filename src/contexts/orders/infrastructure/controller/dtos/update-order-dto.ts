import { IsString, IsUUID } from "class-validator";

export class UpdateOrderDto {
    
    @IsString()
    @IsUUID()
    orderId: string;

}