import { OrderItem } from "@/contexts/orders/domain/order-item";
import { ArrayMinSize, IsArray, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer'
import { OrderItemDto } from "./order-item-dto";

export class CreateOrderDto {
    
    @IsString()
    userId: string;
    
    @IsString()
    concertId: string;
    
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItem[]
}