import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textHighlight',
  standalone: true
})
export class TextHighlightPipe implements PipeTransform {
  transform(text: string, searchText: string): string {
    if (!searchText || !text) return text;
    
    const regex = new RegExp(this.escapeRegExp(searchText), 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}