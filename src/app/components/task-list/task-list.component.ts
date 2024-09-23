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

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks(): void {
      if (typeof window !== 'undefined') {
          const storedTasks = localStorage.getItem('tasks');
          this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  
          // Iterate over tasks and set the state
          this.tasks.forEach(task => {
              if (!task.state) {
                  task.state = task.completed ? 'Done' : 'To Do'; // Set state based on completion
              } else if (task.completed && task.state !== 'Done') {
                  task.state = 'Done'; // Ensure completed tasks have state 'Done'
              }
          });
  
          // Save updated tasks back to local storage
          this.saveTasks();
      }
  }
  
  
  

    saveTasks(): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    onTaskAdded(taskTitle: string): void {
        const newTask: Task = {
            id: this.tasks.length + 1,
            title: taskTitle,
            completed: false,
            state: 'To Do'
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

    removeTask(taskId: number): void {
      this.tasks = this.tasks.filter(task => task.id !== taskId); // Remove the task by ID
      this.saveTasks(); // Save the updated tasks to local storage
  }
  

    onTaskEdited(updatedTask: Task): void {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
            this.tasks[index].title = updatedTask.title;
            this.saveTasks();
        }
    }

    updateTaskState(taskId: number, event: Event): void {
        const target = event.target as HTMLSelectElement;
        const newState = target.value as "To Do" | "In Progress" | "Done";
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task) {
            task.state = newState;
            this.saveTasks();
        }
    }

    // Getter methods
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
