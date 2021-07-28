import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import {RouterModule, Routes} from '@angular/router';
import {CardsComponent} from '../cards/components/cards/cards.component';
import {CardItemComponent} from '../cards/components/card-item/card-item.component';
import {CardsResolver} from '../cards/services/cards.resolver';
import {BoardDetailsComponent} from './components/board-details/board-details.component';
// import {BoardDetailsResolver} from './services/board-details.resolver';



const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BoardsComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: BoardDetailsComponent,
    resolve: {
      // board: BoardDetailsResolver
    },
    data: {
      transparent: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
