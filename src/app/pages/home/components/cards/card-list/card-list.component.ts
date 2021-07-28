import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() cards$: Observable<CardModel[]>;

  constructor() { }

  ngOnInit() {
  }

}
