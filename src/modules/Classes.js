export default class ObjectOfBuilding {
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
