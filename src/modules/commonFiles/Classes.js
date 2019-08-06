export class ObjectOfBuilding {
	constructor() {
		this.name = '',
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
					flatsMarkup: '',
					flatsPrice: '',
				},
				offices: {
					officesSquare: '',
					officesMarkup: '',
					officesPrice: '',
				},
				trade: {
					tradeSquare: '',
					tradeMarkup: '',
					tradePrice: '',
				},
				storages: {
					storagesSquare: '',
					storagesMarkup: '',
					storagesPrice: '',
				},
				parking: {
					parkingSquare: '',
					parkingMarkup: '',
					parkingPrice: '',
				}
			},
			this.variantsOfFinancing = {},
			this.key = 'objectOfBuilding' + Math.random(),
			this.additional= ''
	}
}


export class VariantOfFinancing {
	constructor(totalValue, ownCash, bankCredit, escrowResource, investorA, investorB, deficite, key, name) {
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
			this.prices = {
				flats: '',
				offices: '',
				trade: '',
				storages: '',
				parking: ''
			},
			this.escrow = {
				currentBalance: '',
				defaultBalance: '',
				changesArr: [],
				currentSpended: 0,
				percents: 0
			},
			this.revenue = {
				currentBalance: '',
				defaultBalance: '',
				changesArr: [],
				currentSpended: 0,
				autoSells: '',
				startMonth:'',
				startYear:''
			},
			this.costOfAttractiveFinance = 0,
			this.name = name,
			this.currentDepositedSumChangesArr = [],
			this.deficite = deficite,
			this.key = key,
			this.chart = false,
			this.revenueChart = false,
			this.consolidateChart = false,
			this.loanRepaymentChart = false,
			this.correctedM2OwnCost = false,
			this.periods = [],
			this.repaymentPeriods = []
	}
}
