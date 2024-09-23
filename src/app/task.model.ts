export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    state: "To Do" | "In Progress" | "Done";
    createdAt: Date;
}
