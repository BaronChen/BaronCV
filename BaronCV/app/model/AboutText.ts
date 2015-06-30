module BaronCV {
	'use strict';
	export class AboutText {
		text : string;

		constructor(aboutTextWrap: Services.IAboutTextWrap) {
			this.text = aboutTextWrap.aboutText;
		}
	}
} 