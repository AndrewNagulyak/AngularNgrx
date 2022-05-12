import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Conversation, Message} from '../../../shared/models/chat-user.model';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../../shared/models/user.model';
import {environment} from '../../../../environments/environment';
import {ChatSocketService} from '../../../core/services/chat-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: ChatSocketService, private http: HttpClient) {}

  getFriends(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.baseApiUrl}/user/friends/my`);
  }

  sendMessage(message: string, conversation: Conversation): void {
    const newMessage: Message = {
      message,
      conversation,
    };
    this.socket.emit('sendMessage', newMessage);
  }

  getNewMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  createConversation(friend: UserModel): void {
    this.socket.emit('createConversation', friend);
  }

  joinConversation(friendId: number): void {
    this.socket.emit('joinConversation', friendId);
  }

  leaveConversation(): void {
    this.socket.emit('leaveConversation');
  }

  getConversationMessages(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messages');
  }

  getConversations(): Observable<Conversation[]> {
    return this.socket.fromEvent<Conversation[]>('conversations');
  }
}
