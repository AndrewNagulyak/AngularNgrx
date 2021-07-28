import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardModel} from '../../../../shared/models/card.model';
import {FormControl, FormGroup} from '@angular/forms';
import {AppState} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {CardSavedAction} from '../../cards.actions';
import {CardsApiService} from '../../../../core/api/cards-api.service';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  isEdite = false;
  cardId;
  cardForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>, private cardsApiService: CardsApiService) {
  }

  card: CardModel;

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((data: { card: CardModel }) => {
      this.card = data.card;
      this.cardId = data.card.id;
      this.cardForm = new FormGroup({
        title: new FormControl(data.card.title)
      });

    });
  }

  editCard() {
    this.isEdite = true;
  }

  save() {
    this.cardsApiService.updateCard(this.cardId, this.cardForm.value).subscribe(() => {
      const card: Update<CardModel> = {
        id: this.cardId,
        changes: this.cardForm.value
      };
      this.card = this.cardForm.value;
      this.store.dispatch(new CardSavedAction({card}));
      this.isEdite = false;
    });
  }
}
