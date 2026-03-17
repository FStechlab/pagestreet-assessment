export class CreateTaskDto {
    title: string;
    description?: string;
    employeeId: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    startDate: Date;
    dueDate: Date;
}
