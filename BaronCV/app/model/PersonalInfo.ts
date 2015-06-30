module BaronCV {
	'use strict';
	 export class PersonalInfo {
		 firstName: string;
		 lastName : string;
		 email: string;
		 jobTitle: string;

		 constructor(personalInfoWrap: Services.IPersonalInfoWrap) {
			 this.firstName = personalInfoWrap.firstName;
			 this.lastName = personalInfoWrap.lastName;
			 this.email = personalInfoWrap.email;
			 this.jobTitle = personalInfoWrap.jobTitle;
		 }
	 }
 }