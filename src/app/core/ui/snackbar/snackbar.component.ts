import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.3s')
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  public closeButton: boolean;
  public message = '';
  public type = 'info';
  public isOpen = false;
  public domElem: HTMLElement;
  private closeFn: any;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpen = true;
    }, 4);
  }

  closeSnackBar(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeFn(this.domElem, 1);
    }, 300)
  }

  setCloseTrigger(fn): void {
    this.closeFn = fn;
  }

}
