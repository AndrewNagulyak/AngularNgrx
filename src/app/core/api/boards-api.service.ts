import {Injectable} from '@angular/core';
import {PaginationParams, PaginationWrapper} from '../../shared/models/pagination-wrapper';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ApiConst} from '../../shared/enums/environment.enum';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {BoardModel} from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsApiService {

  constructor(private http: HttpClient) {
  }

  getAll(page: PaginationParams): Observable<PaginationWrapper<BoardModel>> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    const params = new HttpParams().append('limit', page.limit.toString()).append('page', page.page.toString());
    return this.http.get<PaginationWrapper<BoardModel>>(ApiConst.baseUrl + ApiRoutes.boards, {headers: headers, params});
  }
  getLast(): Observable<BoardModel[]> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.get<BoardModel[]>(ApiConst.baseUrl + ApiRoutes.lastBoards, {headers: headers});
  }
  updateCard(id, board): Observable<BoardModel> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.patch<BoardModel>(ApiConst.baseUrl + ApiRoutes.boards + '/' + id, {
      ...board
    }, {headers: headers});
  }


  createBoard(board): Observable<BoardModel> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.post<BoardModel>(ApiConst.baseUrl + ApiRoutes.boards, {
      ...board
    }, {headers: headers});
  }

  getById(id): Observable<BoardModel> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.get<BoardModel>(ApiConst.baseUrl + ApiRoutes.boards + '/' + id, {headers: headers});
  }
}
