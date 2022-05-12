import {UserModel} from './user.model';

export interface Conversation {
  id?: number;
  users?: UserModel[];
  lastUpdated?: Date;
}

export interface Message {
  id?: number;
  message?: string;
  user?: UserModel;
  conversation?: Conversation;
  createdAt?: Date;
}
