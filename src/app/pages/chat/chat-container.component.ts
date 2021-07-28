import {ChangeDetectorRef, Component, Injector, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {Subject, Subscription} from 'rxjs';
import {Overlay} from '@angular/cdk/overlay';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ChatRoomModel} from '../../shared/models/chat-room.model';
import {AbstractUserModel} from '../../shared/models/abstract-user.model';
import {UserModel} from '../../shared/models/user.model';
import {UserService} from '../../core/api/user.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatContainerComponent implements OnInit {

  @ViewChild('newConversation', {static: false}) newConversationButtonRef: MatButton;
  @ViewChild('activationCheckStatusModal', {static: true}) activationCheckStatusModal: SwalComponent;
  @ViewChild('grantedModal', {static: true}) grantedModal: SwalComponent;

  @ViewChild('settingsModal', {static: true}) settingsModal: SwalComponent;

  destroy$ = new Subject<boolean>();



  users: UserModel[] = [];


  userId: string;
  invites = null;
  public roomAction;
  roomsOrigin: ChatRoomModel[] = [];
  rooms: ChatRoomModel[] = [];
  private inviteUsers = null;
  private usersData = null;
  selectedUser: UserModel;

  private newMessage = '';
  newDialogUser = '';
  newDialogUserMessage = '';
  searchRoomTerm = '';
  searchUserListOrigin: AbstractUserModel[] = [];
  searchUserList: AbstractUserModel[] = [];

  userProfile: UserModel;

  leftSidebarMode: 'contacts' | 'newDialog' | 'newCall' = 'contacts';
  searchContactsTerm = '';
  public showModal = false;
  public requestedText: string;
  public blurScreen = false;

  userToChatWith: string;
  roomToChatWith: number;

  constructor(
    private ref: ChangeDetectorRef,
    private userService: UserService,
  ) {
  }

  ngOnInit() {


  }


  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}


