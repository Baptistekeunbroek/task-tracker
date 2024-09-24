import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { Task } from '../../task.model'; // Adjust the path accordingly
import { AuthService } from '../../services/auth.service'; // Adjust the path accordingly

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [FormsModule, CommonModule], // Include CommonModule here
})
export class AddTaskComponent {
  title: string = '';
  description: string = '';
  showForm: boolean = false; // Controls the visibility of the form
  private idCounter: number = 1; // Simple counter for unique IDs

  @Output() taskAdded = new EventEmitter<Task>(); // Emit the full task object

  constructor(private authService: AuthService) {}

  toggleForm(): void {
    this.showForm = !this.showForm; // Toggle the form visibility
  }

  onSubmit(): void {
    if (this.title.trim()) {
      const newTask: Task = {
        id: this.idCounter++, // Increment ID for the new task
        title: this.title,
        description: this.description,
        completed: false,
        state: 'To Do',
        createdAt: new Date(), // Set the current date
        userId: this.authService.getCurrentUserId() || 0, // Use the userId, providing a default value
      };
      this.taskAdded.emit(newTask); // Emit the full task object
      this.title = ''; // Clear the input field after adding
      this.description = ''; // Clear the input field after adding
      this.showForm = false; // Hide the form after submission
    }
  }
}
