export class CreateTodoDto {
    readonly userId: number;
    readonly title: string;
    readonly description: string;
    readonly date: string;
    readonly assignedTo: string;
    readonly priority: string;
    readonly duration: string;
}