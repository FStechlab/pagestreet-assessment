import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class EmployeeOutDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsOptional()
    firstName: string | undefined;

    @IsString()
    @IsOptional()
    lastName: string | undefined;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    role: string | undefined;

    @IsString()
    @IsOptional()
    department: string | undefined;

    @IsDate()
    createdAt: Date;
}