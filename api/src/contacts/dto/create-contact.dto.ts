import { IsNotEmpty, IsNumber } from "class-validator";

/**
 * Data Transfer Object for Contact
 */

export class CreateContactDto {

    @IsNotEmpty()
    readonly name: string;
    
    @IsNumber()
    readonly gender: number;

    readonly email: string;
    readonly telephone: string;
  }