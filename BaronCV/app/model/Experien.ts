module BaronCV {
	'use strict';
	export class Experience {
		title: string;
		company: string;
		time: string;
		badge: string;
		description: string[];
		badgeStyle:string;

	}

	export class MyExperiences {
		experiences: Experience[];

		constructor(experienceWrap: Services.IExperienceWrap) {
			this.experiences = experienceWrap.experiences;
		}
	}
}