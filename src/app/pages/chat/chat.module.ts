import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatContainerComponent} from './chat-container.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {ChatRoutingModule} from './chat-routing.module';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ChatComponent} from './chat/chat.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {SharedModule} from '../../shared/shared.module';
import {WebsocketService} from '../../core/websocket/websocket.service';
import {WebsocketModule} from '../../core/websocket/websocket.module';
import {ApiConst} from '../../shared/enums/environment.enum';


@NgModule({
  declarations: [
    ChatContainerComponent,
    ChatComponent,
  ],
  providers: [ WebsocketService ],
  imports: [

    WebsocketModule,
    CommonModule,
    InlineSVGModule,
    ChatRoutingModule,
    MatRippleModule,
    SharedModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    SweetAlert2Module,
    ReactiveFormsModule,
  ],
  entryComponents: [
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule {
}
