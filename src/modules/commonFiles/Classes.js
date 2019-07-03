export class ObjectOfBuilding {
	constructor() {
		this.name = name,
			this.estimate = {
				ownCost: '',
				m2OwnCost: '',
				revenueExcludingFinRes: '',
				revenueIncludingFinRes: ''
			},
			this.estate = {
				totalSquare: '',
				flats: {
					flatsSquare: '',
					flatsPlannedMarkup: '',
					flatsPrice: '',
				},
				offices: {
					officesSquare: '',
					PlannedMarkup: '',
					Price: '',
				},
				tradeArea: {
					tradeSquare: '',
					PlannedMarkup: '',
					Price: '',
				},
				storages: {
					storagesSquare: '',
					PlannedMarkup: '',
					Price: '',
				},
				parking: {
					parkingSquare: '',
					PlannedMarkup: '',
					Price: '',
				}
			},
			this.variantsOfFinancing = [],
			this.key = 'objectOfBuilding' + Math.random()
	}
}


export class VariantOfFinancing {
	constructor(totalValue, ownCash, bankCredit, escrowResource, investorA, investorB, deficite, key) {
		this.totalValue = {
				currentBalance: totalValue,
				defaultBalance: totalValue,
				changesArr: []
			},
			this.ownCash = {
				currentBalance: ownCash,
				defaultBalance: ownCash,
				changesArr: [],
				currentSpended: 0
			},
			this.bankCredit = {
				currentBalance: bankCredit,
				defaultBalance: bankCredit,
				changesArr: [],
				currentSpended: 0,
				interestRate: ''
			},
			this.escrowResource = {
				currentBalance: escrowResource,
				defaultBalance: escrowResource,
				changesArr: [],
				currentSpended: 0,
				interestRate: ''
			},
			this.investorA = {
				currentBalance: investorA,
				defaultBalance: investorA,
				changesArr: [],
				currentSpended: 0,
				interestRate: ''
			},
			this.investorB = {
				currentBalance: investorB,
				defaultBalance: investorB,
				changesArr: [],
				currentSpended: 0,
				interestRate: ''
			},
			this.costs = {
				estimate: '',
				vat: '',
				marketingCosts: '',
				inflation: ''
			},
			this.revenue = {
				currentBalance: totalValue * 1.30,
				defaultBalance: totalValue * 1.30,
				changesArr: [],
				currentSpended: 0
			},
			this.currentDepositedSumChangesArr = [],
			this.deficite = deficite,
			this.key = key,
			this.chart = false,
			this.periods = [],
			this.repaymentPeriods = []
	}
}
