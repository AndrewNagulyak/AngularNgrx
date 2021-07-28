import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CardModel} from '../../shared/models/card.model';
import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskModel} from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CardModel[]> {
    return this.http.get(ApiConst.baseUrl + ApiRoutes.tasks).pipe(map((cards: any) => {
      return cards.value;
    }));
  }

  createTask(task): Observable<TaskModel> {

    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.post<TaskModel>(ApiConst.baseUrl + ApiRoutes.tasks, {
      ...task
    }, {headers: headers});
  }
}
