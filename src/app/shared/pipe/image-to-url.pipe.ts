import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'imageToUrl'
})
export class ImageToUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: ArrayBuffer, imageType: string): any {
    let binary = '';
    const bytes = new Uint8Array(value);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    binary = window.btoa( binary );
    return this.sanitizer.bypassSecurityTrustUrl(`data:${imageType};base64,${binary}`);
  }

}
