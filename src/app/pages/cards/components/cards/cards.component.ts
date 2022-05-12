import {Component, OnInit, ViewChild} from '@angular/core';
import {CardsApiService} from '../../../../core/api/cards-api.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../reducers';
import {CardsDataSource} from '../../models/cards.datasource';
import {PaginationParams} from '../../../../shared/models/pagination-wrapper';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private cardsApiService: CardsApiService, private store: Store<AppState>) {
  }

  displayedColumns = ['title'];
  dataSource: CardsDataSource;
  nextPage = 0;
  pageSize = 3;


  ngOnInit(): void {
    this.dataSource = new CardsDataSource(this.store);

    const initialPage: PaginationParams = {
      page: 1,
      limit: 3
    };
    this.dataSource.loadCards(initialPage);
  }


}
