import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../task.model';

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
    imports: [CommonModule, AddTaskComponent, TaskItemComponent]
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    private idCounter: number = 1; // Initialize a counter for unique IDs

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks(): void {
        if (typeof window !== 'undefined') {
            const storedTasks = localStorage.getItem('tasks');
            this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
            // Determine the highest ID to ensure unique IDs
            this.idCounter = this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
        }
    }

    saveTasks(): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    onTaskAdded(newTask: Task): void {
        newTask.id = this.idCounter++; // Assign a unique ID
        this.tasks.push(newTask);
        this.saveTasks();
    }

    toggleTaskCompletion(taskId: number): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.state = task.completed ? 'Done' : task.state; // Ensure correct state update
            this.saveTasks();
        }
    }

    removeTask(taskId: number): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    updateTaskState(taskId: number, event: Event): void {
        const target = event.target as HTMLSelectElement;
        const newState = target.value as "To Do" | "In Progress" | "Done";
        const task = this.tasks.find(t => t.id === taskId);

        if (task) {
            task.state = newState; // Update the state
            this.saveTasks(); // Persist changes
        }
    }

    get toDoTasks(): Task[] {
        return this.tasks.filter(task => task.state === 'To Do');
    }

    get inProgressTasks(): Task[] {
        return this.tasks.filter(task => task.state === 'In Progress');
    }

    get doneTasks(): Task[] {
        return this.tasks.filter(task => task.state === 'Done');
    }
}
