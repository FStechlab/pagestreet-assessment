import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    @IsOptional()
    department?: string;
}
