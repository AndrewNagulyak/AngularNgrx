import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsComponent} from './components/cards/cards.component';
import {CardsRoutingModule} from './cards-routing.module';
import {CardItemComponent} from './components/card-item/card-item.component';
import {EffectsModule} from '@ngrx/effects';
import {CardsEffects} from './cards.effects';
import {StoreModule} from '@ngrx/store';
import {cardsReducer} from './cards.reducer';
import {CardsResolver} from './services/cards.resolver';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CardsComponent, CardItemComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    StoreModule.forFeature('cards', cardsReducer),
    EffectsModule.forFeature([CardsEffects]),
    ReactiveFormsModule],
  providers: [CardsResolver]
})
export class CardsModule {
}
