import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindReplaceService {
  countMatches(text: string, searchText: string): number {
    if (!searchText) return 0;
    const regex = new RegExp(this.escapeRegExp(searchText), 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  }

  replaceNext(text: string, searchText: string, replaceText: string): string | null {
    if (!searchText) return null;
    const regex = new RegExp(this.escapeRegExp(searchText), 'i');
    return text.replace(regex, replaceText);
  }

  replaceAll(text: string, searchText: string, replaceText: string): string {
    if (!searchText) return text;
    const regex = new RegExp(this.escapeRegExp(searchText), 'gi');
    return text.replace(regex, replaceText);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}