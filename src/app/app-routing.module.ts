import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppGuard} from './core/guards/app.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'home',
  //   canActivate: [AppGuard]
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AppGuard]
  },
  {
    path: 'cards',
    loadChildren: () => import('./pages/cards/cards.module').then(m => m.CardsModule),
    canActivate: [AppGuard]
  },
  {
    path: 'boards',
    loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule),
    canActivate: [AppGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule),
    canActivate: [AppGuard]
  },
  {
    path: 'authorization',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
