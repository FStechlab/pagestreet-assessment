export class EmployeeOutDto {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    role: string | null;
    department: string | null;
    createdAt: Date;
}