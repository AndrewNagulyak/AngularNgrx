import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {CardModel} from '../../../shared/models/card.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {RequestAllCardsAction} from '../cards.actions';
import {selectAllCardsPage} from '../cards.selectors';
import {tap} from 'rxjs/operators';
import {PaginationParams} from '../../../shared/models/pagination-wrapper';
import {MatPaginator} from '@angular/material/paginator';

export class CardsDataSource implements DataSource<CardModel> {
  private cardsSubject = new BehaviorSubject<CardModel[]>([]);
  totalCount = 0;

  constructor(private store: Store<AppState>, private paginator: MatPaginator) {

  }

  loadCards(page: PaginationParams) {
    this.store.pipe(select(selectAllCardsPage(page)), tap(cards => {
      if (cards.results.length > 0) {
        this.cardsSubject.next(cards.results);
        this.totalCount = cards.totalCount;
      } else {
        this.store.dispatch(new RequestAllCardsAction({page}));
      }
    })).subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<CardModel[] | ReadonlyArray<CardModel>> {
    return this.cardsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.cardsSubject.complete();
  }
}
