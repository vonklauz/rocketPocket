import Chart from 'chart.js'


import {
	VariantOfFinancing
} from '../commonFiles/Classes'


import {
	loadObjects,
	showLoadedData,
	showVariants,
	clearSelect
} from '../commonFiles/dataLoader'


import {
	chooseObject,
	chooseVariant,
	countPercents
} from './dataListener/chooseVariant'


import {
	elementsHandler,
	inputsHandler,
	clearInputs,
	setOptionToShow,
	displayChosenSelectOption,
	setDefaultForm
} from './form/formUsageSteps'


import {
	saveVariant
} from './form/saveVariant'


import {
	validInputs,
	isLessThanTotalValue,
	countFulfilledInputs
} from './form/validation'


import {
	showFinancingChartAndOptions,
	showRepaymentChartAndOptions,
	addCashToChart,
	setBuildingPeriod,
	countCurrentWastedSum,
	saveChangesInChosenVar,
	deleteVariant,
	createTotalValueLine,
	checkAvailableEscrow,
	setSellingAutoMode,
	checkRevenue,
	checkEscrow,
	refreshRevenueLine,
	countAvailableEscrow
} from './chartOptions/chartOptions'


import {
	renderCostOfAttractingTable,
	cleanCostOfAttractingTable,
} from './tables/costOfAttractingFinance'


import {finalCorrection} from'./tables/finalCorrection';

import {
	createCostsAndRevenueTable
} from './tables/costsAndRevenueTable'


import {
	createDoughnutChart,
	createRevenueChart,
	createChart,
	removeChart,
	createCostsChart
} from './charts/charts'


(function () {
	//Ссылка на страницу с графиками
	const chartPageLink = document.getElementById('chartPageLink')

	const chartPageSelectObject = document.getElementById('chartPageSelectObject')
	const chartPageSelectVariant = document.getElementById('chartPageSelectVariant')
	const chartPageCreateVariantButton = document.getElementById('chartPageCreateVariantButton')
	const chartPageFormSaveButton = document.getElementById('chartPageFormSaveButton')
	const deleteVariantButton = document.getElementById('deleteVariantButton')

	const form = document.querySelector('.app__main__form')
	const estimateInput = document.getElementById('totalValueInput')
	const allFormInputs = form.getElementsByTagName('input')
	const activeInputs = form.getElementsByClassName('sourceOfResource')
	const deficiteSum = form.deficiteSum
	const doughNutChartWrapper = document.getElementById('doughNutChartWrapper')

	const chartPageSecondPart = document.getElementById('chartPageSecondPart')

	const chartWrapper = document.getElementById('chartWrapper')
	const setBuildingPeriodButton = document.getElementById('setBuildingPeriodButton')
	const enterCashButton = document.getElementById('enterCashButton')
	const removeCashButton = document.getElementById('removeCashButton')
	const tab = document.getElementById('chartPageTable')

	const chartPageRevenueWrapper = document.querySelector('.chart_page__repayment_wrapper')
	const setRevenuePeriod = document.getElementById('setRevenuePeriod')
	const revenueChartWrapper = document.getElementById('revenueChartWrapper')
	const smallWarning = document.getElementById('smallWarning')
	const escrowPercents = document.getElementById('escrowPercents')
	const refreshRevenueChartButton = document.getElementById('refreshRevenueChartButton')
	const enterRevenueCashButton = document.getElementById('enterRevenueCashButton')
	const removeRevenueCashButton = document.getElementById('removeRevenueCashButton')

	const costsAndRevenueChartWrapper = document.querySelector('.chart_page__costs_wrapper')
	let loadedVariantsArray;
	let objectsArr;
	let chosenVar = false
	let chosenObj = false
	let isOverflow;
	let optionToDisplay;


	window.addEventListener('load', () => {
		objectsArr = loadObjects()
		showLoadedData(objectsArr, chartPageSelectObject)
		//setDefaultForm([], activeInputs, allFormInputs)
	})


	for (let i = 0; i < activeInputs.length; i++) {
		activeInputs[i].addEventListener('blur', () => {
			countPercents(activeInputs[i])
			isOverflow = validInputs(activeInputs, chosenObj.estimate.ownCost)
			isLessThanTotalValue(isOverflow)
		})
	}


	chartPageLink.addEventListener('click', () => {
		clearSelect(chartPageSelectObject)
		objectsArr = loadObjects()
		showLoadedData(objectsArr, chartPageSelectObject)
		optionToDisplay = setOptionToShow(optionToDisplay, chosenObj, objectsArr)
		displayChosenSelectOption(chartPageSelectObject, optionToDisplay)
	})


	chartPageSelectObject.addEventListener('change', () => {
		chosenObj = chooseObject(chartPageSelectObject, objectsArr)
		clearSelect(chartPageSelectVariant)
		setDefaultForm([chartPageFormSaveButton, deleteVariantButton], activeInputs, allFormInputs)
		elementsHandler('hide', [chartPageSecondPart])
		if (chosenObj) {
			elementsHandler('show', [chartPageCreateVariantButton])
			loadedVariantsArray = showVariants(chosenObj, chartPageSelectVariant)
			estimateInput.value = String(chosenObj.estimate.ownCost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		} else {
			estimateInput.value = ''
			elementsHandler('hide', [chartPageCreateVariantButton])
		}
	})


	chartPageCreateVariantButton.addEventListener('click', () => {
		clearInputs(activeInputs)
		removeChart(doughNutChartWrapper)
		elementsHandler('hide', [chartPageSecondPart, deleteVariantButton])
		elementsHandler('show', [chartPageFormSaveButton])
		inputsHandler('enable', activeInputs)
		cleanCostOfAttractingTable(chosenObj)
		chartPageSelectVariant.value = false
		//displayChosenSelectOption(chartPageSelectVariant)
	})


	chartPageSelectVariant.addEventListener('change', () => {
		chosenVar = chooseVariant(chartPageSelectVariant, loadedVariantsArray)
		inputsHandler('disable', activeInputs)
		elementsHandler('hide', [chartPageFormSaveButton])

		if (chosenVar) {

			elementsHandler('show', [chartPageSecondPart, deleteVariantButton])
			createDoughnutChart(chosenVar)
			cleanTab(tab)
			cleanCostOfAttractingTable(chosenObj)

			//Проверка на отстроенный график затрат
			if (chosenVar.chart == true) {
				createChart(chosenObj, chosenVar)
			} else {
				elementsHandler('hide', [chartPageRevenueWrapper])
				removeChart(chartWrapper)
			}
			//Проверка на построенный график продаж
			if (chosenVar.correctedM2OwnCost == true) {
				showRepaymentChartAndOptions(chosenVar)

				if (chosenVar.repaymentPeriods.length > 0) {
					createRevenueChart(chosenObj, chosenVar)
				}
			} else {
				chartPageRevenueWrapper.classList.add('hide')
			}

			if (chosenVar.revenueChart == true) {
				elementsHandler('show', [costsAndRevenueChartWrapper])
				createCostsChart(chosenVar)
				createCostsAndRevenueTable(chosenVar)
			} else {
				elementsHandler('hide', [costsAndRevenueChartWrapper])
			}

		} else {
			elementsHandler('hide', [chartPageSecondPart, deleteVariantButton])
			removeChart(doughNutChartWrapper)
			clearInputs(activeInputs)
		}
	})


	chartPageFormSaveButton.addEventListener('click', () => {
		if (Number(deficiteSum.value.replace(/ /g, "") >= 0)) {
			clearSelect(chartPageSelectVariant)
			optionToDisplay = saveVariant(chosenObj)
			loadedVariantsArray = showVariants(chosenObj, chartPageSelectVariant)
			displayChosenSelectOption(chartPageSelectVariant, optionToDisplay)
			chosenVar = chooseVariant(chartPageSelectVariant, loadedVariantsArray)
			inputsHandler('disable', activeInputs)
			elementsHandler('hide', [chartPageFormSaveButton, chartPageRevenueWrapper, costsAndRevenueChartWrapper])
			if (chosenVar) {
				elementsHandler('show', [chartPageSecondPart, deleteVariantButton])
				createDoughnutChart(chosenVar)
				cleanTab(tab)
				//Проверка на отстроенный график затрат
				if (chosenVar.chart == true) {
					createChart(chosenObj, chosenVar)
				} else {
					removeChart(chartWrapper)
				}
				//Проверка на построенный график продаж
				if (chosenVar.correctedM2OwnCost == true) {
					showRepaymentChartAndOptions(chosenVar)

					if (chosenVar.repaymentPeriods.length > 0) {
						createRevenueChart(chosenObj, chosenVar)
					}
				} else {
					chartPageRevenueWrapper.classList.add('hide')
				}

			} else {
				elementsHandler('hide', [chartPageSecondPart, deleteVariantButton])
				removeChart(doughNutChartWrapper)
				clearInputs(activeInputs)
			}
		} else {
			alert('Невозможно сохранить вариант: превышен общий объём финансирования.')
		}
	})


	deleteVariantButton.addEventListener('click', () => {
		deleteVariant(chosenObj, chosenVar)
	})


	setBuildingPeriodButton.addEventListener('click', () => {
		let startMonth = +(document.getElementById('StartOfPeriodMonth').value);
		let startYear = +(document.getElementById('StartOfPeriodYear').value);
		let endMonth = +(document.getElementById('EndOfPeriodMonth').value);
		let endYear = +(document.getElementById('EndOfPeriodYear').value);
		chosenVar.firstMonth = startMonth;
		chosenVar.firstYear = startYear;
		chosenVar.lastMonth = endMonth;
		chosenVar.lastYear = endYear;
		chosenVar.periods = setBuildingPeriod(startMonth, startYear, endMonth, endYear);

		if (chosenVar.periods.length > 0) {
			createTotalValueLine(chosenVar)
			showFinancingChartAndOptions(chosenVar)
			saveChangesInChosenVar(chosenObj, chosenVar)
			createChart(chosenObj, chosenVar)
		}
	})


	enterCashButton.addEventListener('click', () => {
		addCashToChart(chosenVar, document.getElementById('sourceOfIncome').value, document.getElementById('sumOfIncome').value, document.getElementById('monthOfIncome').value, document.getElementById('yearOfIncome').value, '+', chosenVar.periods)
		countCurrentWastedSum(chosenVar)
		saveChangesInChosenVar(chosenObj, chosenVar)
		createChart(chosenObj, chosenVar)
	})


	removeCashButton.addEventListener('click', () => {
		addCashToChart(chosenVar, document.getElementById('sourceOfIncome').value, document.getElementById('sumOfIncome').value, document.getElementById('monthOfIncome').value, document.getElementById('yearOfIncome').value, '-', chosenVar.periods)
		countCurrentWastedSum(chosenVar)
		saveChangesInChosenVar(chosenObj, chosenVar)
		createChart(chosenObj, chosenVar)
	})


	document.getElementById('CountPercentPayments').addEventListener('click', () => {
		chosenVar.bankCredit.interestRate = +(document.getElementById('bankInstallment').value)
		chosenVar.escrowResource.interestRate = +(document.getElementById('escrowInstallment').value)
		chosenVar.investorA.interestRate = +(document.getElementById('investorAInstallment').value)
		chosenVar.investorB.interestRate = +(document.getElementById('investorBInstallment').value)
		
		
		//Итоговая сумма платежей по процентам банк.кредита
		let bankInstallmentTotal = 0;
		//Итоговая сумма платежей по процентам эскроу ресурса
		let escrowInstalmentTotal = 0;
		//Итоговая сумма платежей по процентам инвестор А
		let investorAInstallmentTotal = 0;
		//Итоговая сумма платежей по процентам инвестор В
		let investorBInstallmentTotal = 0;
		//Стоимость привлечённых ресурсов, рассчитанных по ставке эскроу кредита. Необходима для подсчёта чистой прибыли застройщика.
		let sumOfAttractiveResourcesWithEscrowInterestRate = 0;
		cleanTab(tab)
		$('#chartPageTable').hide().fadeIn(500);
		for (let i = 0; i < chosenVar.periods.length; i++) {
			bankInstallmentTotal = countTotalPayment(chosenVar.bankCredit.changesArr[i], chosenVar.bankCredit.interestRate, bankInstallmentTotal)
			escrowInstalmentTotal = countTotalPayment(chosenVar.escrowResource.changesArr[i], chosenVar.escrowResource.interestRate, escrowInstalmentTotal)
			investorAInstallmentTotal = countTotalPayment(chosenVar.investorA.changesArr[i], chosenVar.investorA.interestRate, investorAInstallmentTotal)
			investorBInstallmentTotal = countTotalPayment(chosenVar.investorB.changesArr[i], chosenVar.investorB.interestRate, investorBInstallmentTotal)
			let $el = `<tr>
						<td class="monthTd narrowTd">${chosenVar.periods[i]}</td>
						<td class="bankTd">${checkPercentPayment(chosenVar.bankCredit.changesArr[i], chosenVar.bankCredit.interestRate)}</td>
						<td class="escrowTd">${checkPercentPayment(chosenVar.escrowResource.changesArr[i], chosenVar.escrowResource.interestRate)}</td>
						<td class="investorATd">${checkPercentPayment(chosenVar.investorA.changesArr[i], chosenVar.investorA.interestRate)}</td>
						<td class="investorBTd">${checkPercentPayment(chosenVar.investorB.changesArr[i], chosenVar.investorB.interestRate)}</td>
						<td>${(sumMonthlyPayments(chosenVar.bankCredit.changesArr[i], chosenVar.bankCredit.interestRate) + sumMonthlyPayments(chosenVar.escrowResource.changesArr[i], chosenVar.escrowResource.interestRate) + sumMonthlyPayments(chosenVar.investorA.changesArr[i], chosenVar.investorA.interestRate) + sumMonthlyPayments(chosenVar.investorB.changesArr[i], chosenVar.investorB.interestRate)).toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
				</tr>`
			tab.insertAdjacentHTML('beforeend', $el);
			
			//Подсчёт стоимости привлечёнки по фиксированной ставке эскроу кредита для вычисления чистой прибыли застройщика в следующей таблице
			
		}
		let $totalEl = `<tr>
						<td>Итого по отдельным источникам:</td>
						<td class="bankTd">${(bankInstallmentTotal.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td class="escrowTd">${(escrowInstalmentTotal.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td class="investorATd">${(investorAInstallmentTotal.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td class="investorBTd">${(investorBInstallmentTotal.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
					</tr>
					<tr>
						<th></th>
						<th></th>
						<th class="totalTh">Итого по всем источникам:</th>
						<th>${(bankInstallmentTotal + escrowInstalmentTotal + investorAInstallmentTotal + investorBInstallmentTotal).toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</th>
						<th></th>
						<th></th>
					</tr>`
		
		tab.insertAdjacentHTML('beforeend', $totalEl)
		
		chosenVar.costOfAttractiveFinance = bankInstallmentTotal + escrowInstalmentTotal + investorAInstallmentTotal + investorBInstallmentTotal
		
		renderCostOfAttractingTable(chosenObj, chosenVar)
		saveChangesInChosenVar(chosenObj, chosenVar)
		
		if (chosenVar.revenueChart == true) {
			checkRevenue(chosenVar)
			checkEscrow(chosenVar)
		} else {
			chosenVar.revenue.defaultBalance = Number(document.getElementById('totalValueTd').innerText.replace(/ /g, ""))
			chosenVar.revenue.currentBalance = chosenVar.revenue.defaultBalance
		}

		saveChangesInChosenVar(chosenObj, chosenVar)
		chosenVar.correctedM2OwnCost = true
		showRepaymentChartAndOptions(chosenVar)
		document.getElementById('correctedRevenue').value = String(chosenVar.revenue.defaultBalance.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')

	})


	function cleanTab(tab) {
		tab.innerHTML = ""
		let $defaultTabContent = `
						<tr>
							<th>Источник:</th>
							<th class="bankTd">Кредит банка под залог</th>
							<th class="escrowTd">Кредит банка / эксроу ресурс</th>
							<th class="investorATd">Инвестор категории "А"</th>
							<th class="investorBTd">Инвестор категории "В"</th>
							<th>Сумма ежемесячных выплат по %</th>
						</tr>
						<tr>
							<th>Ставка, %:</th>
							<th class="bankTd"><input type="text" class="input_wrapper__input add_cash__input table_input number_input" id="bankInstallment" maxlength="4" value="${chosenVar.bankCredit.interestRate}"></th>
							<th class="escrowTd"><input type="text" class="input_wrapper__input add_cash__input table_input number_input" id="escrowInstallment" maxlength="4" value="${chosenVar.escrowResource.interestRate}"></th>
							<th class="investorATd"><input type="text" class="input_wrapper__input add_cash__input table_input number_input" id="investorAInstallment" maxlength="4" value="${chosenVar.investorA.interestRate}"></th>
							<th class="investorBTd"><input type="text" class="input_wrapper__input add_cash__input table_input number_input" id="investorBInstallment" maxlength="4" value="${chosenVar.investorB.interestRate}"></th>
						</tr>
						<tr>
							<th>Месяц</th>
						</tr>`
		tab.insertAdjacentHTML('afterbegin', $defaultTabContent)
	}

	function checkPercentPayment(item, interestRate) {
		if (item > 0 && interestRate > 0) {
			let periodPayment = ((item / 100) * (interestRate / 12)).toFixed(0)
			return periodPayment.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		}
		return 0
	}


	function sumMonthlyPayments(item, interestRate) {
		if (item > 0 && interestRate > 0) {
			let periodPayment = (item / 100) * (interestRate / 12)
			return periodPayment
		}
		return 0

	}


	function countTotalPayment(item, interestRate, total) {
		let periodPayment;
		if (item >= 0 && interestRate > 0) {
			periodPayment = (item / 100) * (interestRate / 12)
			total += periodPayment
			return total
		} else {
			periodPayment = 0
			total += periodPayment
		}
		return 0
	}


	setRevenuePeriod.addEventListener('click', () => {
		let startMonth = +(document.getElementById('revenueStartMonth').value)
		let startYear = +(document.getElementById('revenueStartYear').value)
		let endMonth = +(document.getElementById('revenueLastMonth').value)
		let endYear = +(document.getElementById('revenueLastYear').value)

		chosenVar.repaymentPeriods = setBuildingPeriod(startMonth, startYear, endMonth, endYear)
		chosenVar.revenue.startMonth = chosenVar.repaymentPeriods[0].slice(0, chosenVar.repaymentPeriods[0].length - 3)
		chosenVar.revenue.startYear = startYear

		if (chosenVar.repaymentPeriods.length > 0) {
			showRepaymentChartAndOptions(chosenVar)
			saveChangesInChosenVar(chosenObj, chosenVar)
			createRevenueChart(chosenObj, chosenVar)
		}
	})


	enterRevenueCashButton.addEventListener('click', () => {

		if (Number(document.getElementById('escrowPercents').value) > 0) {
			chosenVar.escrow.percents = checkAvailableEscrow()
		}


		addCashToChart(chosenVar, 'revenue', document.getElementById('sumOfRevenue').value, document.getElementById('monthOfRevenue').value, document.getElementById('yearOfRevenue').value, '+', chosenVar.repaymentPeriods)
		chosenVar.revenueChart = true
		elementsHandler('show', [costsAndRevenueChartWrapper])
		saveChangesInChosenVar(chosenObj, chosenVar)
		createRevenueChart(chosenObj, chosenVar)
		createCostsChart(chosenVar)
		createCostsAndRevenueTable(chosenVar)
	})


	removeRevenueCashButton.addEventListener('click', () => {
		addCashToChart(chosenVar, 'revenue', document.getElementById('sumOfRevenue').value, document.getElementById('monthOfRevenue').value, document.getElementById('yearOfRevenue').value, '-', chosenVar.repaymentPeriods)
		saveChangesInChosenVar(chosenObj, chosenVar)
		createRevenueChart(chosenObj, chosenVar)
		createCostsChart(chosenVar)
		createCostsAndRevenueTable(chosenVar)
	})


	escrowPercents.addEventListener('blur', () => {

		if (chosenVar.revenueChart == true) {
			checkEscrow(chosenVar)
		} else {
			chosenVar.escrow.percents = checkAvailableEscrow()
		}
		saveChangesInChosenVar(chosenObj, chosenVar)
	})


	refreshRevenueChartButton.addEventListener('click', () => {
		refreshRevenueLine(chosenVar)
		countAvailableEscrow(chosenVar, chosenVar.escrow.percents)
		saveChangesInChosenVar(chosenObj, chosenVar)
		elementsHandler('hide', [refreshRevenueChartButton, smallWarning])
		createRevenueChart(chosenObj, chosenVar)
		createCostsChart(chosenVar)
		createCostsAndRevenueTable(chosenVar)
	})


	document.getElementById('sellingAutoMode').addEventListener('click', () => {
		chosenVar.escrow.percents = checkAvailableEscrow()
		if (chosenVar.escrow.percents) {
			setSellingAutoMode(chosenObj, chosenVar)
			chosenVar.revenueChart = true
			saveChangesInChosenVar(chosenObj, chosenVar)
			createRevenueChart(chosenObj, chosenVar)
			elementsHandler('show', [costsAndRevenueChartWrapper])
			createCostsChart(chosenVar)
			createCostsAndRevenueTable(chosenVar)
		} else {
			alert('Для построения графика необходимо задать доступный процент от продаж для эскроу кредитования.')
		}
	})
	
	document.getElementById('countFinalEscrowPercents').addEventListener('click', () => {
		
		let ratePercent = +document.getElementById('percentOfRedutionRate').value;	
		let escrowPercent = +document.getElementById('revenueInPercentsOfEscrow').value;
		finalCorrection (ratePercent, escrowPercent, chosenVar);
	});
	
}())
