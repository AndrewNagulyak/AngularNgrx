import * as moment from 'moment';
import {UserModel} from './user.model';
import {ChatLocationAttachmentModel} from './chat-location-attachment.model';
import {ChatUserModel} from './chat-user.model';

export interface ChatMessageModel {
  correlation_id?: string;
  created_at: string | Date | moment.Moment;
  created_by: string; // Creator ID
  deleted_at?: string | Date | moment.Moment;
  id: number;
  location?: ChatLocationAttachmentModel;
  room_id: number;
  shared_contact_id?: string;
  shared_contact?: UserModel;
  text?: string;
  type: 'text' | 'file_attachment' | 'call_info' | 'location_attachment' | 'contact_attachment';
  updated_at: string | Date | moment.Moment;
  created_user?: ChatUserModel;
  placeholderElementId: string;
  call_info?: {
    call_type: 'video' | 'audio';
    duration: number;
    id: string;
    status: 'cancelled' | 'pending' | 'in progress' | 'ignored' | 'ended';
  };
}

export interface ChatMessageDateGroup {
  date: moment.Moment;
  messagesUserGroup: (ChatMessageUserGroup | ChatMessageSystemGroup)[];
}

export interface ChatMessageUserGroup {
  user: UserModel;
  groupType: 'user';
  messages: ChatMessageModel[];
}

export interface ChatMessageSystemGroup {
  user: UserModel;
  groupType: 'system';
  messages: ChatMessageModel[];
}

export interface ChatMessageRead {
  room_id: number;
  message_id: number;
  user_id: string;
}
