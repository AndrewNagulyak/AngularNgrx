import {
  ApplicationRef,
  ComponentFactoryResolver, EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import {ContainerService} from './container.service';
import {SnackbarComponent} from '../snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  renderer: Renderer2;
  domElem: any;
  componentRef: any;

  constructor(private container: ContainerService, private factoreResolver: ComponentFactoryResolver,
              rendererFactory: RendererFactory2, private injector: Injector,
              private __appRef: ApplicationRef) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.deleteSnackBar = this.deleteSnackBar.bind(this);
  }

  public openSuccessSnackBar(message: string, ms?: number, closeButton?: boolean): void {
    const domElem = this.addSnackBar(message, 'success', closeButton);
    this.deleteSnackBar(domElem, ms);
  }

  public openErrorSnackBar(message: string, ms?: number, closeButton?: boolean): void {
    const domElem = this.addSnackBar(message, 'error', closeButton);
    this.deleteSnackBar(domElem, ms);
  }

  public openInfoSnackBar(message: string, ms?: number, closeButton?: boolean): void {
    const domElem = this.addSnackBar(message, 'info', closeButton);
    this.deleteSnackBar(domElem, ms);
  }

  private addSnackBar(message: string, type?: string, closeButton?: boolean): HTMLElement {
    const factory = this.factoreResolver.resolveComponentFactory(SnackbarComponent);
    this.componentRef = factory.create(this.injector);
    this.componentRef.instance.closeButton = closeButton;
    this.componentRef.instance.message = message;
    this.componentRef.instance.type = type;
    this.componentRef.instance.setCloseTrigger(this.deleteSnackBar);
    this.__appRef.attachView(this.componentRef.hostView)
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.componentRef.instance.domElem = domElem;
    this.renderer.appendChild(this.container.getContainer(), domElem);
    return domElem;
  }

  public deleteSnackBar(domElem, ms?): void {
    if (ms) {
      setTimeout(() => {
        this.renderer.removeChild(this.container.getContainer(), domElem);
      }, ms)
    }
  }


}
