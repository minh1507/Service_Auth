import { OmitType } from "@nestjs/swagger";
import { Buy } from "../schemas/buy.entity";
import { IsOptional } from "class-validator";

export class CreateBuyDto extends OmitType(Buy, ["id"]) {
    @IsOptional()
    productId: string;
 }