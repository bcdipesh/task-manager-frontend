import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  task: Task;
  listId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;
    });
  }

  createNewTask(title: string) {
    this.taskService
      .createTask(title, this.listId)
      .subscribe((response: any) => {
        this.task = response.data;
        this.router.navigate(['lists', this.listId]);
      });
  }
}
