import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../task.model';

@Component({
    selector: 'app-add-task',
    standalone: true,
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    imports: [FormsModule]
})
export class AddTaskComponent {
    title: string = '';
    description: string = '';
    private idCounter: number = 1;

    @Output() taskAdded = new EventEmitter<Task>();

    onSubmit(): void {
        if (this.title.trim()) {
            const newTask: Task = {
                id: this.idCounter++,
                title: this.title,
                description: this.description,
                completed: false,
                state: 'To Do', // Default state for new tasks
                createdAt: new Date()
            };
            this.taskAdded.emit(newTask);
            this.title = '';
            this.description = '';
        }
    }
}
