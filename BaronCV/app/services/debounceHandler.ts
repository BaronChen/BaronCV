module BaronCV.Services {
	
	export class DebounceHandler {
		
		private $timeout : ng.ITimeoutService;

		private fn: Function;

		private interval:number;

		private previousTask: ng.IPromise<any>;

		private actionFirstOne : boolean;

		constructor($timeout: ng.ITimeoutService, interval: number, actionFirstOne : boolean) {
			this.$timeout = $timeout;
			this.interval = interval;
			this.actionFirstOne = actionFirstOne;
		}

		process(fn: Function): ng.IPromise<any> {
			this.fn = fn;

			if (this.previousTask) {
				this.$timeout.cancel(this.previousTask);
			} else if(this.actionFirstOne) {
				this.fn.apply(this);
				
			}

			this.previousTask = this.$timeout(() => {
				this.fn.apply(this);
				this.previousTask = null;
			}, this.interval);

			return this.previousTask;
		}

	}

}

