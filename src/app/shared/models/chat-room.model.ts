import {ChatUserModel} from './chat-user.model';
import {ChatMessageModel} from './chat-message.model';
import {UserModel} from './user.model';


export interface ChatRoomModel {
  created_at: string | Date;
  created_by: string;
  deleted_at: string | Date;
  description: string;
  enable_notification: boolean;
  has_unread_messages: boolean;
  id: number;
  interlocutor: ChatUserModel;
  last_read_message_by_user_id: string;
  last_read_message_id: number;
  last_message: ChatMessageModel;
  participants: ChatUserModel[];
  photo: string;
  status: string; // "approved"
  title: string;
  type: string; // "dialog"
  updated_at: string | Date;
  invited_by: UserModel;
  lastMessageStatus?: 'sent' | 'read' | 'received';
}
