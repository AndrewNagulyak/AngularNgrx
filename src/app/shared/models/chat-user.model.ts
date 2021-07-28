import {UserModel} from './user.model';

export interface ChatUserModel extends UserModel {
  deleted: boolean;
  is_online: boolean;
  last_heartbeat_at: Date;
  state: {
    blacklisted: boolean,
    blocked: boolean,
    common: boolean,
    connection_result: boolean,
    contact: boolean,
    favorites: boolean,
    in_list: boolean,
    in_settings: boolean,
    incoming_connection: boolean,
    init: boolean,
    waiting_for: boolean,
    whitelisted: boolean,
  },
  updated_at: Date;
}
