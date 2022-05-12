import {NgModule} from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatRoutingModule} from './chat-routing.module';

@NgModule({
  declarations: [
    ChatComponent
  ],
  providers: [],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ChatRoutingModule
  ],
  entryComponents: [],
  exports: []
})
export class ChatModule {
}
