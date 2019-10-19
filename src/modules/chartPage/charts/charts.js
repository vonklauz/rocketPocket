export function createDoughnutChart(chosenVar) {
	removeChart(doughNutChartWrapper)
	doughNutChartWrapper.innerHTML = '<canvas id="doughNutChart"></canvas>'
	let doughNutChart = document.getElementById('doughNutChart');
	let myDoughnutChart = new Chart(doughNutChart, {
		type: 'doughnut',
		data: {
			labels: ['Собственные ср-ва', 'Кредит банка под залог', 'Кредит банка/эскроу ресурс', 'Инв-р кат. А', 'Инв-р кат. В', 'Дефицит ресурсов'],
			datasets: [{
				label: '# of Votes',
				data: [chosenVar.ownCash.defaultBalance, chosenVar.bankCredit.defaultBalance, chosenVar.escrowResource.defaultBalance, chosenVar.investorA.defaultBalance, chosenVar.investorB.defaultBalance, chosenVar.deficite],
				backgroundColor: [
                'rgba(255, 99, 132, 0.1)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(125, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
				'red'
            ],
				borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
				'red'
            ],
				borderWidth: 1
        }]
		},
		options: {
			responsive: true,
			legend: {
				position: 'top',
			},
			animation: {
				animateScale: true,
				animateRotate: true
			}
		}
	})
}



export function createRevenueChart(chosenObj, chosenVar) {
	removeChart(revenueChartWrapper)
	document.getElementById('lastToRevenue').value = String(chosenVar.revenue.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	document.getElementById('volumeOfAutoSells').value = chosenVar.autoSells || '0'
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
					steppedLine: false,
					backgroundColor: 'rgba(99, 199, 99, .2)',
					borderColor: 'rgb(99, 199, 99)',
					data: chosenVar.revenue.changesArr
					},
				{
					label: 'Доступный эскроу ресурс',
					fill: false,
					lineTension: 0,
					steppedLine: false,
					backgroundColor: 'rgba(99, 99, 199, .2)',
					borderColor: 'rgb(99, 99, 199)',
					data: chosenVar.escrow.changesArr
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
	localStorage.setItem(chosenObj.key, JSON.stringify(chosenObj))
}


export function createChart(chosenObj, chosenVar) {
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
					backgroundColor: 'rgb(255, 99, 132)',
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
					borderColor: 'rgba(255, 99, 132, 0.3)',
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
	localStorage.setItem(chosenObj.key, JSON.stringify(chosenObj))
}


export function createCostsChart(chosenVar) {

	let [revenueArr, escrowArr] = connectCostsAndRevenue(chosenVar)
	removeChart(costsAndRevenueChartWrapper)
	costsAndRevenueChartWrapper.innerHTML = '<canvas id="chartPageCostsChart"></canvas>'
	let chartPageCostsChart = document.getElementById('chartPageCostsChart')
	let steppedChart = new Chart(chartPageCostsChart, {
		type: 'line',
		data: {
			labels: chosenVar.periods,
			datasets: [{
					label: 'Общий объём финансирования (план)',
					fill: false,
					lineTension: 0,
					steppedLine: true,
					backgroundColor: 'rgb(255, 99, 132)',
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
					borderColor: 'rgba(255, 99, 132, 0.3)',
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
					steppedLine: false,
					backgroundColor: 'rgba(99, 99, 199, .2)',
					borderColor: 'rgb(99, 199, 99)',
					data: revenueArr
					},
				{
					label: 'Доступный эскроу ресурс',
					fill: false,
					lineTension: 0,
					steppedLine: false,
					backgroundColor: 'rgba(99, 99, 199, .2)',
					borderColor: 'rgb(99, 99, 199)',
					data: escrowArr
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


export function connectCostsAndRevenue(chosenVar) {
	let [revenueArr, escrowArr] = [[], []]

	let startIndex = chosenVar.repaymentPeriods.indexOf(chosenVar.periods[0])
	
	if (startIndex > -1) {
		for (let i = 0; i < chosenVar.periods.length; i++) {
			revenueArr[i] = chosenVar.revenue.changesArr[startIndex]
			escrowArr[i] = chosenVar.escrow.changesArr[startIndex]
			startIndex++
		}
	} else {
		startIndex = chosenVar.periods.indexOf(chosenVar.repaymentPeriods[0])
		if (startIndex > -1) {
			for (let i = 0; i < chosenVar.periods.length; i++) {
				revenueArr[startIndex] = chosenVar.revenue.changesArr[i]
				escrowArr[startIndex] = chosenVar.escrow.changesArr[i]
				startIndex++
			}
		}
	}

	return [revenueArr, escrowArr]
}


export function removeChart(chartWrap) {
	chartWrap.innerHTML = ""
}
