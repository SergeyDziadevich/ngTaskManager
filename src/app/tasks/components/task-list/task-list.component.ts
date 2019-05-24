import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { TaskModel } from '../../models/task.model';
import { TaskArrayService } from '../../services/task-array.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Promise<Array<TaskModel>>;

  constructor(
    private taskArrayService: TaskArrayService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tasks = this.taskArrayService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = { ...task, done: true };
    this.taskArrayService.updateTask(updatedTask);
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }
}
