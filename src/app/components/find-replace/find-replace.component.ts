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
	imports: [FormsModule, CommonModule, TextHighlightPipe],
})
export class FindReplaceComponent {
	content = '';
	updatedContent = '';
	findText = '';
	replaceText = '';
	matchCount = 0;
	highlightedContent: SafeHtml = '';

	constructor(
		private findReplaceService: FindReplaceService,
		private sanitizer: DomSanitizer,
		private highlightPipe: TextHighlightPipe
	) {}

	onContentUpdate() {
		this.updatedContent = this.content;
		this.onContentChange();
	}

	onContentChange() {
		this.updateHighlightedContent();
		if (this.findText) {
			this.findNext();
		}
	}

	onSearchChange() {
		if (!this.findText) {
			this.matchCount = 0;
			this.highlightedContent = '';
			this.updatedContent = this.content;
			return;
		}
		this.updateHighlightedContent();
		this.findNext();
	}

	updateHighlightedContent() {
		if (this.updatedContent && this.findText) {
			const highlighted = this.highlightPipe.transform(
				this.updatedContent,
				this.findText
			);
			this.highlightedContent =
				this.sanitizer.bypassSecurityTrustHtml(highlighted);
		} else {
			this.highlightedContent = this.updatedContent;
		}
	}

	findNext() {
		this.matchCount = this.findReplaceService.countMatches(
			this.updatedContent,
			this.findText
		);
	}

	replace() {
		const result = this.findReplaceService.replaceNext(
			this.updatedContent,
			this.findText,
			this.replaceText
		);
		if (result) {
			this.updatedContent = result;
			this.onContentChange();
		}
	}

	replaceAll() {
		this.updatedContent = this.findReplaceService.replaceAll(
			this.updatedContent,
			this.findText,
			this.replaceText
		);
		this.onContentChange();
	}
}
