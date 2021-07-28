import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatContainerComponent} from './chat-container.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ChatContainerComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
