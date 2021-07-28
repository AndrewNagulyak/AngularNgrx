import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'searchHighlight'
})
export class SearchHighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string, searchTerm: string): any {
    const startIndex = value.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (startIndex >= 0) {
      let result = value.slice(0, startIndex);
      result += `<span class="search-highlight">${value.slice(startIndex, startIndex + searchTerm.length)}</span>`;
      result += value.slice(startIndex + searchTerm.length);
      return this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(result));
    } else {
      return value;
    }
  }

}
