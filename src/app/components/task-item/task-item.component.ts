import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleComplete: EventEmitter<number> = new EventEmitter();

  onToggleCompleted(): void {
    this.toggleComplete.emit(this.task.id);
  }
}
