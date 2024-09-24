export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    state: "To Do" | "In Progress" | "Done";
    createdAt: Date;
    userId: number; // or username: string; if you want to store the username directly
    isEditing?: boolean;
}
