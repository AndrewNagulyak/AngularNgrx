import {Component, OnInit, ViewChild} from '@angular/core';
import {CardsApiService} from '../../../../core/api/cards-api.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../reducers';
import {MatPaginator} from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    this.dataSource = new CardsDataSource(this.store, this.paginator);

    const initialPage: PaginationParams = {
      page: 1,
      limit: 3
    };
    this.dataSource.loadCards(initialPage);
  }


}
