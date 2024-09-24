import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../task.model';
import { NavbarComponent } from '../../navbar-component/navbar-component.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
    imports: [CommonModule, AddTaskComponent, TaskItemComponent, NavbarComponent, FormsModule]
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    private idCounter: number = 1; // Initialize a counter for unique IDs
    today: Date = new Date(); // Store today's date

    constructor(private authService: AuthService) {} // Inject AuthService

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks(): void {
        if (typeof window !== 'undefined') {
            const storedTasks = localStorage.getItem('tasks');
            this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
            // Filter tasks by current user
            const currentUserId = this.authService.getCurrentUserId();
            if (currentUserId) {
                this.tasks = this.tasks.filter(task => task.userId === Number(currentUserId));
            }
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
        newTask.userId = this.authService.getCurrentUserId() || 0; // Assign current user's ID
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

    saveTask(task: Task): void {
      task.isEditing = false;  // Exit edit mode
      this.saveTasks();  // Call to save the tasks, e.g., localStorage or backend
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
