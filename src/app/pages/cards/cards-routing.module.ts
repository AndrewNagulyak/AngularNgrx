import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CardsComponent} from './components/cards/cards.component';
import {CardItemComponent} from './components/card-item/card-item.component';
import {CardsResolver} from './services/cards.resolver';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CardsComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: CardItemComponent,
    resolve: {
      card: CardsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CardsRoutingModule {

}
