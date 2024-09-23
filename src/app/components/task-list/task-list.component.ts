import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from '../../task.model';

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    imports: [CommonModule, AddTaskComponent]
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks(): void {
        if (typeof window !== 'undefined') {  // Check if running in the browser
            const storedTasks = localStorage.getItem('tasks');
            this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
        }
    }

    saveTasks(): void {
        if (typeof window !== 'undefined') {  // Check if running in the browser
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    onTaskAdded(taskTitle: string): void {
        const newTask: Task = {
            id: this.tasks.length + 1,
            title: taskTitle,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
    }

    toggleTaskCompletion(taskId: number): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    removeTask(index: number): void {
        this.tasks.splice(index, 1);
        this.saveTasks();
    }
}
