import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

}
