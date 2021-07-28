import {Component, Input, OnInit} from '@angular/core';
import {SignInApiService} from '../../pages/authorization/sign-in/datasource/sign-in.api-service';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  @Input() transparent;
  constructor(private signInBase: SignInApiService,
              private router: Router,
              private appService: AppService,
  ) {
  }

  ngOnInit() {
  }

  toggleInfo() {
    this.isOpen = !this.isOpen;
  }


}
