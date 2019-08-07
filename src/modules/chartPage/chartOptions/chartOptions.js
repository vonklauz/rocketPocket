import {
	elementsHandler
} from '../form/formUsageSteps'

//Функция отображения опций под графиком
export function showFinancingChartAndOptions(chosenVar) {
	//Блок с опциями под графиком
	const chartAndSourcesH1 = document.getElementById('chartAndSourcesH1')
	const chartWrapper = document.querySelector('.main__chartPage__wrapper')
	const chartPageOptions = document.querySelector('.chartPage__wrapper__chart_options')
	const setPeriodOption = document.querySelector('.chart_options__set_period__wrapper')
	const addMoneyOption = document.querySelector('.chart_options__add_cash__wrapper')
	const chartPageTable = document.querySelector('.chart_page__table__wrapper')
	const chartPageRepayment = document.querySelector('.chart_page__repayment_wrapper')

	chartAndSourcesH1.classList.remove('hide')
	chartPageOptions.classList.remove('hide')

	if (chosenVar.periods.length > 0) {
		chartWrapper.classList.remove('hide')
		setPeriodOption.classList.add('hide')
		addMoneyOption.classList.remove('hide')
		chartPageTable.classList.remove('hide')
	} else {
		setPeriodOption.classList.remove('hide')
		addMoneyOption.classList.add('hide')
		chartPageTable.classList.add('hide')
		chartWrapper.classList.add('hide')
	}
}


export function showRepaymentChartAndOptions(chosenVar) {

	const chartPageRepayment = document.querySelector('.chart_page__repayment_wrapper')
	const chartPageRevenueOptions = document.querySelector('.revenue_chart__options')
	const chartPageRevenueSetPeriod = document.querySelector('.revenue_chart__options_set_period')
	const chartPageRevenueAddCash = document.querySelector('.revenue_chart__options__add_cash')
	const chartPageRevenueChart = document.querySelector('.revenue_chart__wrapper')

	chartPageRepayment.classList.remove('hide')
	chartPageRevenueOptions.classList.remove('hide')

	if (chosenVar.repaymentPeriods.length > 0) {
		chartPageRevenueSetPeriod.classList.add('hide')
		chartPageRevenueAddCash.classList.remove('hide')
		chartPageRevenueChart.classList.remove('hide')
	} else {
		chartPageRevenueSetPeriod.classList.remove('hide')
		chartPageRevenueAddCash.classList.add('hide')
		chartPageRevenueChart.classList.add('hide')
	}
}


//Добавление/удаление денежной суммы на графике у выбранного источника денежных средств
export function addCashToChart(chosenVar, source, volume, month, year, operation, periodsArr) {
	let incomeDate = month + ' ' + year
	let indexOfDate;
	let sourceVolume;

	if (!year) {
		alert('Укажите год')
		return
	}
	indexOfDate = periodsArr.indexOf(incomeDate)

	//Следует учитывать, что если происходит вычитание, то логика функции не меняется - просто вычитаемое становится отрицательным числом
	if (operation == '-') {
		sourceVolume = +(volume.replace(/ /g, "")) * -1

		if (chosenVar[source].currentBalance - sourceVolume > chosenVar[source].defaultBalance) {
			alert('Превышен изначальный объём финансирования указанного источника. Введите меньшую сумму.')
			return
		} else if (chosenVar[source].changesArr[indexOfDate] < sourceVolume * (-1)) {
			alert('Введённое число превышает вложенный объём средств в выбранном периоде.')
			return
		}
	} else {
		sourceVolume = +(volume.replace(/ /g, ""))
	}



	if (indexOfDate >= 0) {
		if (sourceVolume <= chosenVar[source].currentBalance) {
			chosenVar[source].currentSpended += sourceVolume
			for (let i = indexOfDate; i < periodsArr.length; i++) {
				if (chosenVar[source].changesArr[i]) {
					chosenVar[source].changesArr[i] += sourceVolume
				} else {
					chosenVar[source].changesArr[i] = sourceVolume
				}
			}
			chosenVar[source].currentBalance -= sourceVolume
			if (source != 'revenue') {
				document.getElementById(source + 'Chart').value = String(chosenVar[source].currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
			}
			if (source == 'revenue') {
				countAvailableEscrow(chosenVar, chosenVar.escrow.percents)
			}
		} else {
			alert('Введённая сумма превышает остаток данного источника.')
			return
		}

	} else {
		alert('Указанная дата не входит в период строительства.')
		return
	}
}


//Создание периода строительства на основе указанных дат
export function setBuildingPeriod(startMonth, startYear, endMonth, endYear) {
	let periodsArray = []
	const defaultMonthsArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
	if (endYear < startYear) {
		alert('Введите корректную дату.')
		return false
	}
	//Считает месяцы из стартового года периода строительства
	function countStartPeriod(startMonth, startYear) {
		for (let i = startMonth; i < defaultMonthsArray.length; i++) {
			periodsArray.push(defaultMonthsArray[i] + " " + startYear)
		}
	}
	//Считает месяцы всех лет периода строительства, не включая стартовый и последний годы
	function countMiddlePeriod(oneYearAfterStart, lastYear) {
		while (oneYearAfterStart < lastYear) {
			for (let i = 0; i < defaultMonthsArray.length; i++) {
				periodsArray.push(defaultMonthsArray[i] + " " + oneYearAfterStart)
			}
			oneYearAfterStart++
		}
	}
	//Считает месяцы из последнего года периода строительства
	function countLastPeriod(lastMonth, lastYear) {
		for (let i = 0; i < lastMonth + 1; i++) {
			periodsArray.push(defaultMonthsArray[i] + " " + lastYear)
		}
	}
	if (startYear == endYear) {
		for (let i = startMonth; i < (endMonth + 1); i++) {
			periodsArray.push(defaultMonthsArray[i] + " " + startYear)
		}
		return periodsArray
	}

	countStartPeriod(startMonth, startYear)
	if (endYear - startYear == 1) {
		countLastPeriod(endMonth, endYear)
	} else if ((endYear - startYear > 1)) {
		countMiddlePeriod(startYear + 1, endYear)
		countLastPeriod(endMonth, endYear)
	}
	return periodsArray
}


//Создание периода продаж выбранного объекта(период строительства + заданный срок после)
export function setSellingAutoMode(chosenObj, chosenVar) {

	chosenVar.revenue.changesArr.length = 0
	chosenVar.revenue.currentBalance = chosenVar.revenue.defaultBalance
	chosenVar.revenue.currentSpended = 0
	chosenVar.escrow.changesArr.length = 0
	chosenVar.autoSells = document.getElementById('volumeOfAutoSells').value

	let sumOfSells = Number(document.getElementById('volumeOfAutoSells').value.replace(/ /g, ""))

	let month, year;
	
	chosenVar.revenue.changesArr[0] = 0

	for (let i = 1; i < chosenVar.repaymentPeriods.length; i++) {

		month = chosenVar.repaymentPeriods[i].slice(0, chosenVar.repaymentPeriods[i].length - 3)
		year = chosenVar.repaymentPeriods[i].slice(chosenVar.repaymentPeriods[i].length - 2)

		if (chosenVar.revenue.currentBalance > sumOfSells) {
			addCashToChart(chosenVar, ['revenue'], String(sumOfSells), month, year, '+', chosenVar.repaymentPeriods)
		} else {
			addCashToChart(chosenVar, ['revenue'], String(chosenVar.revenue.currentBalance), month, year, '+', chosenVar.repaymentPeriods)
		}
	}
	document.getElementById('lastToRevenue').value = String(chosenVar.revenue.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	countAvailableEscrow(chosenVar, chosenVar.escrow.percents)
}


export function checkAvailableEscrow() {
	let availableEscrow = Number(document.getElementById('escrowPercents').value)

	if (availableEscrow <= 0 || availableEscrow >= 100) {
		alert("Указан некорректный процент допустимого эскроу.")
		return false
	}
	return availableEscrow
}


//Подсчёт текущих общих затрат
export function countCurrentWastedSum(chosenVar) {

	function checkItem(item) {
		let num = 0
		if (item >= 0) {
			num = item
			return num
		}
		return num
	}
	for (let i = 0; i < chosenVar.periods.length; i++) {
		chosenVar.currentDepositedSumChangesArr[i] = 0
		chosenVar.currentDepositedSumChangesArr[i] += checkItem(chosenVar.ownCash.changesArr[i]) + checkItem(chosenVar.bankCredit.changesArr[i]) + checkItem(chosenVar.escrowResource.changesArr[i]) + checkItem(chosenVar.investorA.changesArr[i]) + checkItem(chosenVar.investorB.changesArr[i])
	}
}


//Сохранение выбранного варианта финансирования после внесённых изменений
export function saveChangesInChosenVar(chosenObj, chosenVar) {
	localStorage.setItem(chosenObj.key, JSON.stringify(chosenObj))
}


//После задания периода строительства забивает объём общего финансирования в график
export function createTotalValueLine(chosenVar) {
	chosenVar.totalValue.changesArr.length = 0
	for (let i = 0; i < chosenVar.periods.length; i++) {
		chosenVar.totalValue.changesArr.push(chosenVar.totalValue.defaultBalance)
	}
}


//Удаление варианта из базы
export function deleteVariant(chosenObj, chosenVar) {
	alert('Вариант удалён.')
	delete(chosenObj.variantsOfFinancing[chosenVar.key])
	localStorage.setItem(chosenObj.key, JSON.stringify(chosenObj))
	window.location.reload()

}

//Расчёт доступной суммы к эскроу кредиту в зависимости от переданной суммы продаж и процентного значения от неё
export function countAvailableEscrow(chosenVar, percents) {
	let availableEscrow;
	chosenVar.escrow.currentSpended = 0
	for (let i = 0; i < chosenVar.repaymentPeriods.length; i++) {

		availableEscrow = (chosenVar.revenue.changesArr[i] / 100) * percents
		chosenVar.escrow.changesArr[i] = availableEscrow
		chosenVar.escrow.currentSpended += availableEscrow

		if (chosenVar.repaymentPeriods[i] == chosenVar.periods[chosenVar.periods.length - 1]) {
			break
		}
	}
}


export function checkRevenue(chosenVar) {

	const warning = document.getElementById('smallWarning')
	const refreshRevenueChartButton = document.getElementById('refreshRevenueChartButton')
	let revenueToCheck = document.getElementById('totalValueTd').innerText
	revenueToCheck = Number(revenueToCheck.replace(/ /g, ""))

	if (revenueToCheck != chosenVar.revenue.defaultBalance) {
		elementsHandler('show', [warning, refreshRevenueChartButton])
		chosenVar.revenue.defaultBalance = revenueToCheck
		chosenVar.revenue.currentBalance = revenueToCheck
	}
}


export function checkEscrow(chosenVar) {

	const warning = document.getElementById('smallWarning')
	const refreshRevenueChartButton = document.getElementById('refreshRevenueChartButton')
	let escrowPercentsToCheck = Number(document.getElementById('escrowPercents').value)

	if (escrowPercentsToCheck != chosenVar.escrow.percents) {
		elementsHandler('show', [warning, refreshRevenueChartButton])
		chosenVar.escrow.percents = escrowPercentsToCheck
	}

}


export function refreshRevenueLine(chosenVar) {

	let revenueArr = [...chosenVar.revenue.changesArr]

	chosenVar.revenue.currentBalance = chosenVar.revenue.defaultBalance
	chosenVar.revenue.currentSpended = 0
	chosenVar.revenue.changesArr.length = 0

	chosenVar.revenue.currentBalance -= revenueArr[0]
	chosenVar.revenue.currentSpended += revenueArr[0]
	chosenVar.revenue.changesArr.push(revenueArr[0])

	for (let i = 1; i < chosenVar.repaymentPeriods.length; i++) {

		let item = revenueArr[i] - revenueArr[i - 1]
		
		if(item + revenueArr[i - 1] < chosenVar.revenue.defaultBalance) {
			chosenVar.revenue.changesArr[i] = revenueArr[i]
			chosenVar.revenue.currentBalance -= item
			chosenVar.revenue.currentSpended += item
		}
		
		else{
			chosenVar.revenue.changesArr[i] = chosenVar.revenue.defaultBalance
			chosenVar.revenue.currentBalance = 0
			chosenVar.revenue.currentSpended = chosenVar.revenue.defaultBalance
		}
		
	}
}
