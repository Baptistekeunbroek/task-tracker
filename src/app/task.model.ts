export interface Task {
    id: number;
    title: string;
    completed: boolean;
    state: 'To Do' | 'In Progress' | 'Done'; // Add this line
}
