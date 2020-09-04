import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.taskService.getTasks(params.listId).subscribe((response: any) => {
          this.tasks = response.data;
        });
      }
    });

    this.taskService.getLists().subscribe((response: any) => {
      this.lists = response.data;
    });
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe((response: any) => {
      task.completed = !task.completed;
    });
  }
}
