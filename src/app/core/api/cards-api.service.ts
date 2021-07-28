import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ApiRoutes} from '../../shared/enums/api-routes.enum';
import {ApiConst} from '../../shared/enums/environment.enum';
import {Observable} from 'rxjs';
import {CardModel} from '../../shared/models/card.model';
import {PaginationParams, PaginationWrapper} from '../../shared/models/pagination-wrapper';
import {BoardModel} from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root'
})
export class CardsApiService {

  constructor(private http: HttpClient) {
  }

  getAll(page: PaginationParams): Observable<PaginationWrapper<CardModel>> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    const params = new HttpParams().append('limit', page.limit.toString()).append('page', page.page.toString());
    return this.http.get<PaginationWrapper<CardModel>>(ApiConst.baseUrl + ApiRoutes.cards, {headers: headers, params});
  }

  updateCard(id, card): Observable<CardModel> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.patch<CardModel>(ApiConst.baseUrl + ApiRoutes.cards + '/' + id, {
      ...card
    }, {headers: headers});
  }
  createCard(card): Observable<CardModel> {

    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.post<CardModel>(ApiConst.baseUrl + ApiRoutes.cards, {
      ...card
    }, {headers: headers});
  }

  getById(id): Observable<CardModel> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.http.get<CardModel>(ApiConst.baseUrl + ApiRoutes.cards + '/' + id, {headers: headers});
  }
}
