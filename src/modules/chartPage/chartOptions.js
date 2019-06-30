//Функция отображения опций под графиком
export function showOptions(chosenVar) {
	//Блок с опциями под графиком
	const chartPageOptions = document.querySelector('.chartPage__wrapper__chart_options')
	const setPeriodOption = document.querySelector('.chart_options__set_period__wrapper')
	const addMoneyOption = document.querySelector('.chart_options__add_cash__wrapper')
	const chartPageTable = document.querySelector('.chart_page__table__wrapper')

	chartPageOptions.classList.remove('hide')
	if (chosenVar.periods.length > 0) {
		setPeriodOption.classList.add('hide')
		addMoneyOption.classList.remove('hide')
		chartPageTable.classList.remove('hide')
	} else {
		setPeriodOption.classList.remove('hide')
		addMoneyOption.classList.add('hide')
		chartPageTable.classList.add('hide')
	}
}


//Добавление/удаление денежной суммы на графике у выбранного источника денежных средств
export function addCashToChart(chosenVar, source, volume, month, year, operation, periodsArr) {
	let incomeDate = month + ' ' + year
	let indexOfDate
	let sourceVolume

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
export function setRepaymentPeriod(objectPeriodsArray, endMonth, endYear) {
	const defaultMonthsArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
	let repaymentPeriodsArray = objectPeriodsArray.slice()
	let startPoint = endMonth + 1
	let endPoint = endMonth + 7
	let halfYear = 6
	if (endMonth <= 5) {
		for (let i = startPoint; i < endPoint; i++) {
			repaymentPeriodsArray.push(defaultMonthsArray[i] + " " + endYear)
		}
	} else {
		for (let i = startPoint; i < 12; i++) {
			repaymentPeriodsArray.push(defaultMonthsArray[i] + " " + endYear)
			halfYear--
		}
		for (let i = 0; i < halfYear; i++) {
			repaymentPeriodsArray.push(defaultMonthsArray[i] + " " + (endYear + 1))
		}
	}
	return repaymentPeriodsArray
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
export function saveChangesInChosenVar(chosenVar) {
	localStorage.setItem(chosenVar.key, JSON.stringify(chosenVar))
}


//После задания периода строительства забивает объём общего финансирования в график
export function createTotalValueLine(chosenVar) {
	chosenVar.totalValue.changesArr.length = 0
	for (let i = 0; i < chosenVar.periods.length; i++) {
		chosenVar.totalValue.changesArr.push(chosenVar.totalValue.defaultBalance)
	}
}


//Удаление варианта из базы
export function deleteVariant(chosenVar) {
	alert('Вариант удалён.')
	delete(localStorage[chosenVar.key])
	window.location.reload()

}
