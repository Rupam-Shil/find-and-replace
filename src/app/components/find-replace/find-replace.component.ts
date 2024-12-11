import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextHighlightPipe } from '../../pipes/text-highlight.pipe';
import { FindReplaceService } from '../../services/find-replace.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-find-replace',
  templateUrl: './find-replace.component.html',
  styleUrls: ['./find-replace.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, TextHighlightPipe]
})
export class FindReplaceComponent {
  content = '';
  findText = '';
  replaceText = '';
  matchCount = 0;
  highlightedContent: SafeHtml = '';

  constructor(
    private findReplaceService: FindReplaceService,
    private sanitizer: DomSanitizer,
    private highlightPipe: TextHighlightPipe
  ) {}

  onContentChange() {
    this.updateHighlightedContent();
    if (this.findText) {
      this.findNext();
    }
  }

  onSearchChange() {
    this.updateHighlightedContent();
    this.findNext();
  }

  updateHighlightedContent() {
    if (this.content && this.findText) {
      const highlighted = this.highlightPipe.transform(this.content, this.findText);
      this.highlightedContent = this.sanitizer.bypassSecurityTrustHtml(highlighted);
    } else {
      this.highlightedContent = this.content;
    }
  }

  findNext() {
    this.matchCount = this.findReplaceService.countMatches(this.content, this.findText);
  }

  replace() {
    const result = this.findReplaceService.replaceNext(
      this.content,
      this.findText,
      this.replaceText
    );
    if (result) {
      this.content = result;
      this.onContentChange();
    }
  }

  replaceAll() {
    this.content = this.findReplaceService.replaceAll(
      this.content,
      this.findText,
      this.replaceText
    );
    this.onContentChange();
  }
}