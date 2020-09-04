import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webRequestService: WebRequestService) {}

  createList(title: string) {
    return this.webRequestService.post('api/v1/lists', { title });
  }

  getLists() {
    return this.webRequestService.get('api/v1/lists');
  }

  createTask(title: string, listId: string) {
    return this.webRequestService.post(`api/v1/lists/${listId}/tasks`, {
      title,
    });
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`api/v1/lists/${listId}/tasks`);
  }

  complete(task: Task) {
    return this.webRequestService.patch(
      `api/v1/lists/${task.list}/tasks/${task._id}`,
      {
        completed: !task.completed,
      }
    );
  }
}
