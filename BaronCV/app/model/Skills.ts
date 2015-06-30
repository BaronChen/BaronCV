module BaronCV {
	export class SkillSet {
		data: number[][];
		initData: number[][];
		labels: string[];  

		constructor() {
			this.data = [[]];
			this.initData = [[]];
			this.labels = [];
		}
	}

	export class GraphData {
		private skillResource: Services.ISkillResource;

		programmingSkill: SkillSet;
		frontEndSkill: SkillSet;
		databaseSkill: SkillSet;
		otherSkill: SkillSet;

		skillWrap: Services.ISkillWrap;

		graphOptions: any;
		colors: any;

		public mapData() {
			this.programmingSkill.data = this.skillWrap.programmingSkill.data;
			this.frontEndSkill.data = this.skillWrap.frontEndSkill.data;
			this.databaseSkill.data = this.skillWrap.databaseSkill.data;
			this.otherSkill.data = this.skillWrap.otherSkill.data;
		}

		public getData() {
			var self = this;
			this.skillResource.get({}, (skillWrap) => {
				self.skillWrap = skillWrap;
				self.init();
			});
		}

		public init() {
			this.programmingSkill.labels = this.skillWrap.programmingSkill.labels;
			this.frontEndSkill.labels = this.skillWrap.frontEndSkill.labels;
			this.databaseSkill.labels = this.skillWrap.databaseSkill.labels;
			this.otherSkill.labels = this.skillWrap.otherSkill.labels;

			this.programmingSkill.data = this.skillWrap.programmingSkill.initData;
			this.frontEndSkill.data = this.skillWrap.frontEndSkill.initData;
			this.databaseSkill.data = this.skillWrap.databaseSkill.initData;
			this.otherSkill.data = this.skillWrap.otherSkill.initData;
		}


		constructor(skillResource: Services.ISkillResource) {
			this.graphOptions = {
				pointLabelFontColor: "#fff",
				pointLabelFontSize: 14
			}

			this.colors = ['#1abc9c'];

			this.programmingSkill = new SkillSet();
			this.frontEndSkill = new SkillSet();
			this.databaseSkill = new SkillSet();
			this.otherSkill = new SkillSet();


			this.skillResource = skillResource;
		}
	}
} 