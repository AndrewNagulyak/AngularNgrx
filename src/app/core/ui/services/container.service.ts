import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private containerElement = null;

  constructor() {
    this.containerElement = document.getElementById('nh-overlay-container');
  }

  private createContainer(): void {
    const containerClass = 'ng-overlay-container';
    const container = document.createElement('div');
    container.classList.add(containerClass);
    container.id = 'nh-overlay-container';
    container.style.position = 'absolute';
    container.style.zIndex = '1000';
    container.style.pointerEvents = 'none';
    container.style.top = '0';
    container.style.left = '0';
    container.style.height = '100%';
    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'start';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    document.body.appendChild(container);
    this.containerElement = container;
  }

  public getContainer(): any {
    if (!this.containerElement) {
      this.createContainer();
    }
    return this.containerElement;
  }
}
