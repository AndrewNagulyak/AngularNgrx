import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '../../../shared/models/user.model';
import {WebsocketService} from '../../../core/websocket/websocket.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, map, tap} from 'rxjs/operators';

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {


  @Input() selectedRoom: UserModel;
  public messages$: Observable<IMessage[]>;
  public counter$: Observable<number>;
  public texts$: Observable<string[]>;
  public form: FormGroup;
  liveData$ = this.service.messages$.pipe(
    map((rows: any) => rows.data),
    catchError(error => {
      throw error;
    }),
    tap({
        error: error => console.log('[Live component] Error:', error),
        complete: () => console.log('[Live component] Connection Closed')
      }
    )
  );

  public sendText(): void {
    this.service.sendMessage(this.form.controls.text.value);
  }

  ngOnInit() {
    // get messages
    this.form = this.fb.group({
      text: [null, [
        Validators.required
      ]]
    });
  }

  //
  // public removeText(index: number): void {
  //   this.wsService.send(WS.SEND.chat, index);
  // }
  constructor(private service: WebsocketService, private fb: FormBuilder) {
    this.service.connect();
  }


}

