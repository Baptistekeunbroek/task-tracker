import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this import

@Component({
    selector: 'app-task-item',
    standalone: true,
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.scss'],
    imports: [CommonModule, FormsModule] // Add FormsModule here
})
export class TaskItemComponent {
    @Input() task!: Task;
    @Output() toggleComplete: EventEmitter<number> = new EventEmitter();
    @Output() editTask: EventEmitter<Task> = new EventEmitter();

    isEditing: boolean = false;

    onToggleCompleted(): void {
        this.toggleComplete.emit(this.task.id);
    }

    edit(): void {
        this.isEditing = true;
    }

    save(): void {
        this.isEditing = false;
        this.editTask.emit(this.task);
    }
}
