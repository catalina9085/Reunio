import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  newTask = '';
  nextId = 1;

  tasks: Task[] = [];

  addTask(): void {
    const title = this.newTask.trim();

    if (!title) {
      return;
    }

    this.tasks.push({
      id: this.nextId++,
      title: title,
      completed: false,
      editing: false
    });

    this.newTask = '';
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  editTask(task: Task): void {
    task.editing = true;
  }

  saveTask(task: Task): void {
    if (!task.title.trim()) {
      this.deleteTask(task.id);
      return;
    }

    task.title = task.title.trim();
    task.editing = false;
  }

  get remainingTasks(): number {
    return this.tasks.filter(task => !task.completed).length;
  }
}



