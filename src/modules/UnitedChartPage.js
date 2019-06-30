import {
	showBoxes
} from './components/multiselectCheckbox.component'


(function () {
	const variantsArray = []
	const unitedChartLink = document.getElementById('unitedChartLink')
	const chartWrapper = document.querySelector('.united_chart__chart_wrapper')
	const checkBoxes = document.getElementById('checkBoxes')
	const selectBox = document.querySelector('.selectBox')
	const buildUnitedChart = document.getElementById('buildUnitedChart')
	const reloadUnitedChart = document.getElementById('reloadUnitedChart')
	const deleteUnitedChart = document.getElementById('deleteUnitedChart')
	let expanded = false
	let checkedVariants;

	function loadVariants() {
		variantsArray.length = 0
		if (localStorage.length > 0) {
			let keysArray = Object.keys(localStorage)
			for (let i = 0; i < keysArray.length; i++) {
				if (keysArray[i].indexOf('variant') > -1) {
					variantsArray.push(JSON.parse(localStorage.getItem(keysArray[i])))
				}
			}
		}
	}


	function showLoadedVariants() {
		if (variantsArray.length > 0) {
			variantsArray.sort((a, b) => {
				return (+(a.key.slice(a.key.length - 1))) - (+(b.key.slice(b.key.length - 1)))
			})
			for (let i = 0; i < variantsArray.length; i++) {
				let loadedVariant = `<label for="${'unitedChartCheckbox' + (i + 1)}"><input type="checkbox" class="united_chart__checkbox" id="${'unitedChartCheckbox' + (i + 1)}" value="${i}">Вариант финансирования ${i + 1}</label>`
				checkBoxes.insertAdjacentHTML('beforeend', loadedVariant)
			}
		} else {
			return false
		}
	}

	function clearCheckboxes() {
		checkBoxes.innerHTML = ''
	}

	window.addEventListener('load', () => {
		loadVariants()
		clearCheckboxes()
		showLoadedVariants()

	})

	unitedChartLink.addEventListener('click', () => {
		loadVariants()
		clearCheckboxes()
		showLoadedVariants()
	})

	selectBox.addEventListener('click', () => {
		expanded = showBoxes('select', expanded)
	})

	buildUnitedChart.addEventListener('click', () => {
		expanded = showBoxes('btn', expanded)
		checkedVariants = selectCheckedVariants()
		buildUnitedPeriod(checkedVariants)
	})

	reloadUnitedChart.addEventListener('click', () => {
		buildUnitedPeriod(checkedVariants)
	})

	deleteUnitedChart.addEventListener('click', () => {
		removeChart()
		document.querySelector('.main__united_chart__wrapper').classList.remove('hide')
		buildUnitedChart.classList.remove('hide')
		reloadUnitedChart.classList.add('hide')
		deleteUnitedChart.classList.add('hide')
	})

	function selectCheckedVariants() {
		const renderedVariants = document.getElementsByClassName('united_chart__checkbox')
		const checkedArr = []
		for (let i = 0; i < renderedVariants.length; i++) {
			if (renderedVariants[i].checked == true) {
				checkedArr.push(variantsArray[+(renderedVariants[i].value)])
			}
		}
		return checkedArr
	}


	function buildUnitedPeriod(varsArr) {
		for (let i = 0; i < varsArr.length; i++) {
			if (varsArr[i].periods.length == 0) {
				alert(`Невозможно построить график: необходимо задать период строительства варианту финансирования ${i+1} .`)
				return
			} else {
				let firstYearArr = []
				let middleYearsArr = []
				let lastYearArr = []
				let unitedDepositedSum = []
				let unitedPeriod = []
				let unitedTotalSum = []
				let unitedOwnCash = []
				let unitedBankCredit = []
				let unitedEscrowResource = []
				let unitedInvestorA = []
				let unitedInvestorB = []

				let allData = [firstYearArr, middleYearsArr, lastYearArr, unitedDepositedSum, unitedPeriod, unitedTotalSum, unitedOwnCash, unitedBankCredit, unitedEscrowResource, unitedInvestorA, unitedInvestorB]

				document.querySelector('.main__united_chart__wrapper').classList.add('hide')
				buildUnitedChart.classList.add('hide')
				reloadUnitedChart.classList.remove('hide')
				deleteUnitedChart.classList.remove('hide')


				function createPeriods(arr) {

					arr.sort((a, b) => {
						return a.firstYear - b.firstYear
					})


					for (let i = 0; i < arr.length; i++) {
						if (arr[i].firstYear == arr[0].firstYear) {
							firstYearArr.push(arr[i])
						} else if (arr[i].firstYear > arr[0].firstYear && arr[i].firstYear < arr[arr.length - 1].firstYear) {
							middleYearsArr.push(arr[i])
						} else if (arr[i].firstYear == arr[arr.length - 1].firstYear) {
							lastYearArr.push(arr[i])
						}
					}
				}


				function sortPeriodsArr(yearArr) {
					yearArr.sort((a, b) => {
						return a.firstMonth - b.firstMonth
					})
				}


				function unitePeriods(yearArr) {
					for (let i = 0; i < yearArr.length; i++) {
						for (let n = 0; n < yearArr[i].periods.length; n++) {
							if (unitedPeriod.indexOf(yearArr[i].periods[n]) == -1) {
								unitedPeriod.push(yearArr[i].periods[n])
							}
						}
					}
				}


				function addUnitedCosts(yearArr) {
					let startPoint;
					for (let i = 0; i < yearArr.length; i++) {
						startPoint = unitedPeriod.indexOf(yearArr[i].periods[0])
						countOneTypeCosts(yearArr[i].totalValue, unitedTotalSum, startPoint)
						if (yearArr[i].currentDepositedSumChangesArr.length > 0) {
							countUnitedDepositedSum(yearArr[i].currentDepositedSumChangesArr, unitedDepositedSum, startPoint)
						}
						if (yearArr[i].ownCash.changesArr.length > 0) {
							countOneTypeCosts(yearArr[i].ownCash, unitedOwnCash, startPoint)
						}

						if (yearArr[i].bankCredit.changesArr.length > 0) {
							countOneTypeCosts(yearArr[i].bankCredit, unitedBankCredit, startPoint)
						}

						if (yearArr[i].escrowResource.changesArr.length > 0) {
							countOneTypeCosts(yearArr[i].escrowResource, unitedEscrowResource, startPoint)
						}

						if (yearArr[i].investorA.changesArr.length > 0) {
							countOneTypeCosts(yearArr[i].investorA, unitedInvestorA, startPoint)
						}

						if (yearArr[i].investorB.changesArr.length > 0) {
							countOneTypeCosts(yearArr[i].investorB, unitedInvestorB, startPoint)
						}
					}
				}


				function countUnitedDepositedSum(variant, unitedCostsArr, start) {
					let n = 0
					for (let i = start; i < unitedPeriod.length; i++) {
						if (variant[n] >= 0) {
							if (unitedCostsArr[i]) {
								unitedCostsArr[i] += variant[n]
							} else {
								unitedCostsArr[i] = variant[n]
							}
						} else if (n >= variant.length) {
							if (unitedCostsArr[i]) {
								unitedCostsArr[i] += variant[variant.length - 1]
							} else {
								unitedCostsArr[i] = variant[variant.length - 1]
							}
						}
						n++
					}
				}


				function countOneTypeCosts(variant, unitedCostsArr, start) {
					let n = 0
					for (let i = start; i < unitedPeriod.length; i++) {
						if (variant.changesArr[n] >= 0) {
							if (unitedCostsArr[i] >= 0) {
								unitedCostsArr[i] += variant.changesArr[n]
							} else {
								unitedCostsArr[i] = variant.changesArr[n]
							}
						} else if (n >= variant.changesArr.length) {
							if (unitedCostsArr[i] >= 0) {
								unitedCostsArr[i] += variant.changesArr[variant.changesArr.length - 1]
							} else {
								unitedCostsArr[i] = variant.changesArr[variant.changesArr.length - 1]
							}
						}
						n++
					}

				}



				function createChart() {
					removeChart()
					chartWrapper.innerHTML = '<canvas id="unitedChartPageChart"></canvas>'
					let chartPageChart = document.getElementById('unitedChartPageChart')
					let steppedChart = new Chart(chartPageChart, {
						type: 'line',
						data: {
							labels: unitedPeriod,
							datasets: [{
									label: 'Общий объём финансирования (план)',
									fill: false,
									lineTension: 0,
									steppedLine: true,
									backgroundColor: 'rgba(255, 99, 132, .2)',
									borderColor: 'rgb(255, 99, 132)',
									data: unitedTotalSum
					},
								{
									label: 'Текущий объём затрат',
									backgroundColor: 'rgba(0, 0, 0, 0.2)',
									lineTension: 0,
									fill: false,
									steppedLine: true,
									borderColor: 'rgb(0, 0, 0)',
									data: unitedDepositedSum
					},
								{
									label: 'Собственные средства',
									backgroundColor: 'rgba(255, 99, 132, 0.1)',
									steppedLine: true,
									borderColor: 'rgb(255, 99, 132)',
									data: unitedOwnCash
					},
								{
									label: 'Кредит банка под залог',
									backgroundColor: 'rgba(54, 162, 235, 0.2)',
									steppedLine: true,
									borderColor: 'rgb(54, 162, 235)',
									data: unitedBankCredit
					},
								{
									label: 'Кредит банка / эскроу ресурс',
									backgroundColor: 'rgba(255, 206, 86, 0.2)',
									steppedLine: true,
									borderColor: 'rgb(255, 206, 86)',
									data: unitedEscrowResource
					},
								{
									label: 'Инвестор категории "А"',
									backgroundColor: 'rgba(125, 192, 192, 0.2)',
									steppedLine: true,
									borderColor: 'rgb(125, 192, 192)',
									data: unitedInvestorA
					},
								{
									label: 'Инвестор категории "B"',
									backgroundColor: 'rgba(153, 102, 255, 0.2)',
									steppedLine: true,
									borderColor: 'rgb(153, 102, 255)',
									data: unitedInvestorB
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
				
				//Необходимость данный последовательности (1,2) в том, что вначале нужно определиться, сколько существует периодов (начальный, средний между началом и концом, финальный), а затем уже заполнять график, иначе большая вероятность, что затраты некорректно суммируются на консолидированном графике
				
				//1 - Создание объединённого периода выбранных вариантов финансирования
				createPeriods(varsArr)
				sortPeriodsArr(firstYearArr)
				unitePeriods(firstYearArr)
				
				if (middleYearsArr.length > 0) {
					sortPeriodsArr(middleYearsArr)
					unitePeriods(middleYearsArr)
				}

				if (lastYearArr.length > 0) {
					sortPeriodsArr(lastYearArr)
					unitePeriods(lastYearArr)
				}
				
				//2 - После создания объединённого периода - заполнение графика тратами из источников финансирования
				addUnitedCosts(firstYearArr)
				
				if (middleYearsArr.length > 0) {
					addUnitedCosts(middleYearsArr)
				}

				if (lastYearArr.length > 0) {
					addUnitedCosts(lastYearArr)
				}
				
				//Когда объединённый объект собран - пора строить график
				createChart()

			}
		}
	}

	function removeChart() {
		chartWrapper.innerHTML = ""
	}

}())
