import {
	loadVariants,
	showLoadedVariants,
	clearSelect
} from './variantsLoader'
/*
loadVariants(){return variantsArray}
showLoadedVariants(loadedVariantsArray, $select) {return loadedVariantsArray}
clearSelect($select)*/

import {
	showOptions,
	addCashToChart,
	setBuildingPeriod,
	setRepaymentPeriod,
	countCurrentWastedSum,
	saveChangesInChosenVar,
	deleteVariant,
	createTotalValueLine
} from './chartOptions'
/*showOptions(chosenVar)
addCashToChart(chosenVar, source, volume, month, year, operation, periodsArr)
function setBuildingPeriod(startMonth, startYear, endMonth, endYear) {return periodsArray}
function setRepaymentPeriod(objectPeriodsArray, endMonth, endYear) {return repaymentPeriodsArray}
function countCurrentWastedSum(chosenVar)
function saveChangesInChosenVar(chosenVar)*/


import {
	chooseVariant
} from './chooseVariant'
/*chooseVariant($select, loadedVariantsArray) {return chosenVar}*/


import {
	createRevenueChart,
	createChart,
	removeChart,
	resetChosenVarValues,
	calculateValuesForCostsChart,
	createCostsChart
} from './charts'


(function () {
	//Ссылка на страницу с графиками
	const chartPageLink = document.getElementById('chartPageLink')
	
	//Список выбора варианта финансирования для дальнейших с ним действий
	const chartPageSelect = document.getElementById('chartPageSelect')
	const chartWrapper = document.getElementById('chartWrapper')
	const deleteVariantButton = document.getElementById('deleteVariant')
	const setBuildingPeriodButton = document.getElementById('setBuildingPeriodButton')
	const enterCashButton = document.getElementById('enterCashButton')
	const removeCashButton = document.getElementById('removeCashButton')
	const tab = document.getElementById('chartPageTable')
	
	const revenueChartWrapper = document.getElementById('revenueChartWrapper')
	const enterRevenueCashButton = document.getElementById('enterRevenueCashButton')
	const removeRevenueCashButton = document.getElementById('removeRevenueCashButton')
	
	const costsAndRevenueChartWrapper = document.getElementById('costsAndRevenueChartWrapper')
	let loadedVariantsArray;
	let chosenVar = false


	window.addEventListener('load', () => {
		clearSelect(chartPageSelect)
		loadedVariantsArray = loadVariants()
		loadedVariantsArray = showLoadedVariants(loadedVariantsArray, chartPageSelect)
		if (!chosenVar) {
			chosenVar = chooseVariant(chartPageSelect, loadedVariantsArray)
		}
	})


	chartPageLink.addEventListener('click', () => {
		clearSelect(chartPageSelect)
		loadedVariantsArray = loadVariants()
		loadedVariantsArray = showLoadedVariants(loadedVariantsArray, chartPageSelect)
		if (!chosenVar) {
			chosenVar = chooseVariant(chartPageSelect, loadedVariantsArray)
		}
	})


	chartPageSelect.addEventListener('change', () => {
		chosenVar = chooseVariant(chartPageSelect, loadedVariantsArray)
		cleanTab(tab)
		if (chosenVar.chart == true) {
			createChart(chosenVar)
			createRevenueChart(chosenVar)
			cleanTab(tab)
			calculateValuesForCostsChart(chosenVar)
			createCostsChart(chosenVar)
			//resetChosenVarValues(chosenVar)
		} else {
			removeChart(chartWrapper)
			removeChart(revenueChartWrapper)
		}
	})


	deleteVariantButton.addEventListener('click', () => {
		deleteVariant(chosenVar)
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
		chosenVar.repaymentPeriods = setRepaymentPeriod(chosenVar.periods, endMonth, endYear);

		if (chosenVar.periods.length > 0) {
			createTotalValueLine(chosenVar)
			showOptions(chosenVar)
			saveChangesInChosenVar(chosenVar)
			createChart(chosenVar)
			createRevenueChart(chosenVar)
		}
	})


	enterCashButton.addEventListener('click', () => {
		addCashToChart(chosenVar, document.getElementById('sourceOfIncome').value, document.getElementById('sumOfIncome').value, document.getElementById('monthOfIncome').value, document.getElementById('yearOfIncome').value, '+', chosenVar.periods)
		countCurrentWastedSum(chosenVar)
		saveChangesInChosenVar(chosenVar)
		createChart(chosenVar)
	})


	removeCashButton.addEventListener('click', () => {
		addCashToChart(chosenVar, document.getElementById('sourceOfIncome').value, document.getElementById('sumOfIncome').value, document.getElementById('monthOfIncome').value, document.getElementById('yearOfIncome').value, '-', chosenVar.periods)
		countCurrentWastedSum(chosenVar)
		saveChangesInChosenVar(chosenVar)
		createChart(chosenVar)
	})
	
	
	enterRevenueCashButton.addEventListener('click',() =>{
		addCashToChart(chosenVar, 'revenue', document.getElementById('sumOfRevenue').value, document.getElementById('monthOfRevenue').value, document.getElementById('yearOfRevenue').value, '+', chosenVar.repaymentPeriods)
		saveChangesInChosenVar(chosenVar)
		createRevenueChart(chosenVar)
	})
	
	
	removeRevenueCashButton.addEventListener('click',() =>{
		addCashToChart(chosenVar, 'revenue', document.getElementById('sumOfRevenue').value, document.getElementById('monthOfRevenue').value, document.getElementById('yearOfRevenue').value, '-', chosenVar.repaymentPeriods)
		saveChangesInChosenVar(chosenVar)
		createRevenueChart(chosenVar)
	})


	document.getElementById('CountPercentPayments').addEventListener('click', () => {
		chosenVar.bankCredit.interestRate = +(document.getElementById('bankInstallment').value)
		chosenVar.escrowResource.interestRate = +(document.getElementById('escrowInstallment').value)
		chosenVar.investorA.interestRate = +(document.getElementById('investorAInstallment').value)
		chosenVar.investorB.interestRate = +(document.getElementById('investorBInstallment').value)
		//Итоговая сумма платежей по процентам банк.кредита
		let bankInstallmentTotal = 0
		//Итоговая сумма платежей по процентам эскроу ресурса
		let escrowInstalmentTotal = 0
		//Итоговая сумма платежей по процентам инвестор А
		let investorAInstallmentTotal = 0
		//Итоговая сумма платежей по процентам инвестор В
		let investorBInstallmentTotal = 0
		localStorage.setItem(chosenVar.key, JSON.stringify(chosenVar))
		cleanTab(tab)
		$('#chartPageTable').hide().fadeIn(500);
		for (let i = 0; i < chosenVar.periods.length; i++) {
			bankInstallmentTotal = countTotalPayment(chosenVar.bankCredit.changesArr[i], chosenVar.bankCredit.interestRate, bankInstallmentTotal)
			escrowInstalmentTotal = countTotalPayment(chosenVar.escrowResource.changesArr[i], chosenVar.escrowResource.interestRate, escrowInstalmentTotal)
			investorAInstallmentTotal = countTotalPayment(chosenVar.investorA.changesArr[i], chosenVar.investorA.interestRate, investorAInstallmentTotal)
			investorBInstallmentTotal = countTotalPayment(chosenVar.investorB.changesArr[i], chosenVar.investorB.interestRate, investorBInstallmentTotal)
			let $el = `<tr>
						<td class="monthTd">${chosenVar.periods[i]}</td>
						<td class="bankTd">${checkPercentPayment(chosenVar.bankCredit.changesArr[i], chosenVar.bankCredit.interestRate)}</td>
						<td class="escrowTd">${checkPercentPayment(chosenVar.escrowResource.changesArr[i], chosenVar.escrowResource.interestRate)}</td>
						<td class="investorATd">${checkPercentPayment(chosenVar.investorA.changesArr[i], chosenVar.investorA.interestRate)}</td>
						<td class="investorBTd">${checkPercentPayment(chosenVar.investorB.changesArr[i], chosenVar.investorB.interestRate)}</td>
						<td>${(sumMonthlyPayments(chosenVar.bankCredit.changesArr[i], chosenVar.bankCredit.interestRate) + sumMonthlyPayments(chosenVar.escrowResource.changesArr[i], chosenVar.escrowResource.interestRate) + sumMonthlyPayments(chosenVar.investorA.changesArr[i], chosenVar.investorA.interestRate) + sumMonthlyPayments(chosenVar.investorB.changesArr[i], chosenVar.investorB.interestRate)).toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
				</tr>`
			tab.insertAdjacentHTML('beforeend', $el)
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
							<th class="bankTd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="bankInstallment" maxlength="4" value="${chosenVar.bankCredit.interestRate}"></th>
							<th class="escrowTd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="escrowInstallment" maxlength="4" value="${chosenVar.escrowResource.interestRate}"></th>
							<th class="investorATd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="investorAInstallment" maxlength="4" value="${chosenVar.investorA.interestRate}"></th>
							<th class="investorBTd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="investorBInstallment" maxlength="4" value="${chosenVar.investorB.interestRate}"></th>
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
}())
