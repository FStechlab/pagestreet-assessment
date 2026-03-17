export class CreateSubTaskDto {
    title: string;
    completed?: boolean;
    taskId: string;
    assigneeId?: string;
}