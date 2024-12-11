import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FindReplaceComponent } from './app/components/find-replace/find-replace.component';
import { TextHighlightPipe } from './app/pipes/text-highlight.pipe';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [FindReplaceComponent],
	providers: [TextHighlightPipe],
	template: ` <app-find-replace></app-find-replace> `,
})
export class App {
	name = 'Find and Replace Tool';
}

bootstrapApplication(App);
