import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  imports: [FormsModule]
})
export class AddTaskComponent {
  title: string = '';

  // Emit the task to the parent (TaskListComponent)
  @Output() taskAdded = new EventEmitter<string>();

  onSubmit(): void {
    if (this.title.trim()) {
      console.log('Task added:', this.title);
      this.taskAdded.emit(this.title);  // Emit the task
      this.title = ''; // Clear the input field after adding
    }
  }
}
