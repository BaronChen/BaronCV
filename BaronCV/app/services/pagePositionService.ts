module BaronCV.Services {

	export enum Positions {
		Undefined,
		About,
		Resume,
		Work,
		Contact
	}


	export class PagePositionServices {
		private pagePosition: Positions;
		
		private isBackGroundShowed : boolean;

		selectPosition(position: Positions) {
			this.pagePosition = position;
		}
			
		getPosition(): Positions {
			return this.pagePosition;
		}

		setIsBackGroundShowed(showed : boolean) {
			this.isBackGroundShowed = showed;
		}

		isBackgroudShowed() : boolean {
			return this.isBackGroundShowed;
		}
	}
}

BaronCV.Services.PagePositionServices.$inject = [];
myApp.addService('pagePositionService', BaronCV.Services.PagePositionServices);