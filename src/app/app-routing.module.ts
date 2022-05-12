import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppGuard} from './core/guards/app.guard';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
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
    path: 'chatting',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule),
    canActivate: [AppGuard]
  },
  {
    path: 'authorization',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AppGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
