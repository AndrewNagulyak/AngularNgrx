import {Subject} from 'rxjs';
import {OverlayRef} from '@angular/cdk/overlay';

export class ResultOverlayRef<R = any> {

  afterClosed$ = new Subject<OverlayCloseEvent<R>>();

  constructor(public overlay: OverlayRef) {
    overlay.backdropClick().subscribe(() => this._close('backdropClick', null));
  }

  private _close(type: 'backdropClick' | 'close' | 'itemChosen', data: R) {
    this.overlay.dispose();
    this.afterClosed$.next({
      type,
      data
    });
    this.afterClosed$.complete();
  }

  public close(type: 'close' | 'itemChosen', data: R) {
    this._close(type, data);
  }
}

export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close' | 'itemChosen';
  data: R;
}

