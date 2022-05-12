import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardsComponent} from './components/boards/boards.component';
import {BoardsListComponent} from './components/boards-list/boards-list.component';
import {BoardsRoutingModule} from './boards.routing-module';
import { CreateBoardPopupComponent } from './components/create-board-popup/create-board-popup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/boards.effects';
import {StoreModule} from '@ngrx/store';
import {boardsReducer} from './store/boards.reducer';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [BoardsComponent, BoardsListComponent, CreateBoardPopupComponent, BoardDetailsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BoardsRoutingModule,
    FormsModule,

    ReactiveFormsModule,
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects])
  ]
})
export class BoardsModule {
}
