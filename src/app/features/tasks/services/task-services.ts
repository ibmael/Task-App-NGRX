import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Task } from '../task.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  //
  private baseUrl = 'https://tasks-api-q166.onrender.com/tasks';
  //
  private _httpClient = inject(HttpClient);
  //
  getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this.baseUrl);
  }

 createTask(
  task: Pick<Task, 'title' | 'user'>,
): Observable<Task> {
  return this._httpClient.post<Task>(this.baseUrl, task);
}

  // take updated completed
  toggleTaskCompletion(id: string, completed: boolean): Observable<Task> {
    return this._httpClient.patch<Task>(`${this.baseUrl}/${id}`, { completed });
  }

deleteTask(id: string): Observable<{ message: string }> {
  return this._httpClient.delete<{ message: string }>(
    `${this.baseUrl}/${id}`,
  );
}
}
