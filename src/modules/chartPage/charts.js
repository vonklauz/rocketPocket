export function createRevenueChart(chosenVar) {
	removeChart(revenueChartWrapper)
	revenueChartWrapper.innerHTML = '<canvas id="chartPageRevenueChart"></canvas>'
	let chartPageRevenueChart = document.getElementById('chartPageRevenueChart')
	let steppedChart = new Chart(chartPageRevenueChart, {
		type: 'line',
		data: {
			labels: chosenVar.repaymentPeriods,
			datasets: [{
					label: 'Текущий объём выручки (план)',
					fill: false,
					lineTension: 0,
					steppedLine: true,
					backgroundColor: 'rgba(99, 99, 199, .2)',
					borderColor: 'rgb(99, 199, 99)',
					data: chosenVar.revenue.changesArr
					}
				]
		},
		options: {
			elements: {
				point: {
					radius: 3
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
					}]
			}
		}
	})
	localStorage.setItem(chosenVar.key, JSON.stringify(chosenVar))
}


export function createChart(chosenVar) {
	removeChart(chartWrapper)
	chartWrapper.innerHTML = '<canvas id="chartPageChart"></canvas>'
	let chartPageChart = document.getElementById('chartPageChart')
	let steppedChart = new Chart(chartPageChart, {
		type: 'line',
		data: {
			labels: chosenVar.periods,
			datasets: [{
					label: 'Общий объём финансирования (план)',
					fill: false,
					lineTension: 0,
					steppedLine: true,
					backgroundColor: 'rgba(255, 99, 132, .2)',
					borderColor: 'rgb(255, 99, 132)',
					data: chosenVar.totalValue.changesArr
					},
				{
					label: 'Текущий объём затрат',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
					lineTension: 0,
					fill: false,
					steppedLine: true,
					borderColor: 'rgb(0, 0, 0)',
					data: chosenVar.currentDepositedSumChangesArr
					},
				{
					label: 'Собственные средства',
					backgroundColor: 'rgba(255, 99, 132, 0.1)',
					steppedLine: true,
					borderColor: 'rgb(255, 99, 132)',
					data: chosenVar.ownCash.changesArr
					},
				{
					label: 'Кредит банка под залог',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(54, 162, 235)',
					data: chosenVar.bankCredit.changesArr
					},
				{
					label: 'Кредит банка / эскроу ресурс',
					backgroundColor: 'rgba(255, 206, 86, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(255, 206, 86)',
					data: chosenVar.escrowResource.changesArr
					},
				{
					label: 'Инвестор категории "А"',
					backgroundColor: 'rgba(125, 192, 192, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(125, 192, 192)',
					data: chosenVar.investorA.changesArr
					},
				{
					label: 'Инвестор категории "B"',
					backgroundColor: 'rgba(153, 102, 255, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(153, 102, 255)',
					data: chosenVar.investorB.changesArr
					}
				]
		},
		options: {
			elements: {
				point: {
					radius: 3
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
					}]
			}
		}
	})
	chosenVar.chart = true
	localStorage.setItem(chosenVar.key, JSON.stringify(chosenVar))
}


export function createCostsChart(chosenVar) {
	removeChart(costsAndRevenueChartWrapper)
	costsAndRevenueChartWrapper.innerHTML = '<canvas id="chartPageCostsChart"></canvas>'
	let chartPageCostsChart = document.getElementById('chartPageCostsChart')
	let steppedChart = new Chart(chartPageCostsChart, {
		type: 'line',
		data: {
			labels: chosenVar.repaymentPeriods,
			datasets: [{
					label: 'Общий объём финансирования (план)',
					fill: false,
					lineTension: 0,
					steppedLine: true,
					backgroundColor: 'rgba(255, 99, 132, .2)',
					borderColor: 'rgb(255, 99, 132)',
					data: chosenVar.totalValue.changesArr
					},
				{
					label: 'Текущий объём затрат',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
					lineTension: 0,
					fill: false,
					steppedLine: true,
					borderColor: 'rgb(0, 0, 0)',
					data: chosenVar.currentDepositedSumChangesArr
					},
				{
					label: 'Собственные средства',
					backgroundColor: 'rgba(255, 99, 132, 0.1)',
					steppedLine: true,
					borderColor: 'rgb(255, 99, 132)',
					data: chosenVar.ownCash.changesArr
					},
				{
					label: 'Кредит банка под залог',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(54, 162, 235)',
					data: chosenVar.bankCredit.changesArr
					},
				{
					label: 'Кредит банка / эскроу ресурс',
					backgroundColor: 'rgba(255, 206, 86, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(255, 206, 86)',
					data: chosenVar.escrowResource.changesArr
					},
				{
					label: 'Инвестор категории "А"',
					backgroundColor: 'rgba(125, 192, 192, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(125, 192, 192)',
					data: chosenVar.investorA.changesArr
					},
				{
					label: 'Инвестор категории "B"',
					backgroundColor: 'rgba(153, 102, 255, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(153, 102, 255)',
					data: chosenVar.investorB.changesArr
					},
				{
					label: 'Текущий объём выручки (план)',
					fill: false,
					lineTension: 0,
					steppedLine: true,
					backgroundColor: 'rgba(99, 99, 199, .2)',
					borderColor: 'rgb(99, 199, 99)',
					data: chosenVar.revenue.changesArr
					}
				]
		},
		options: {
			elements: {
				point: {
					radius: 3
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
					}]
			}
		}
	})
}


export function resetChosenVarValues(chosenVar) {
	let sourcesArr = [chosenVar.totalValue.changesArr, chosenVar.ownCash.changesArr, chosenVar.bankCredit.changesArr, chosenVar.escrowResource.changesArr, chosenVar.investorA.changesArr, chosenVar.investorB.changesArr, chosenVar.currentDepositedSumChangesArr]

	for (let i = 0; i < sourcesArr.length; i++) {
		sourcesArr[i].length = chosenVar.periods.length
		console.log(sourcesArr[i])
	}
}


export function calculateValuesForCostsChart(chosenVar) {
	let sourcesArr = [chosenVar.totalValue.changesArr, chosenVar.ownCash.changesArr, chosenVar.bankCredit.changesArr, chosenVar.escrowResource.changesArr, chosenVar.investorA.changesArr, chosenVar.investorB.changesArr, chosenVar.currentDepositedSumChangesArr];
	
	for (let i = 0; i < sourcesArr.length; i++) {
		for(let n = chosenVar.periods.length; n < chosenVar.repaymentPeriods.length; n ++) {
			sourcesArr[i][n] = sourcesArr[i][chosenVar.periods.length - 1]
		}
	}

}


export function removeChart(chartWrap) {
	chartWrap.innerHTML = ""
}
