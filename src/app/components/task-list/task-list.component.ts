import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    imports: [CommonModule, AddTaskComponent]
})
export class TaskListComponent {
    tasks: string[] = ['Task 1', 'Task 2', 'Task 3'];

    onTaskAdded(task: string): void {
        this.tasks.push(task);  // Add the new task to the list
    }

    removeTask(index: number): void {
        this.tasks.splice(index, 1);  // Remove the task from the list
    }
}
