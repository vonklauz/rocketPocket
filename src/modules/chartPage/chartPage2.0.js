(function () {
	//Select на странице графика финансирования
	const chartPageSelect = document.getElementById('chartPageSelect')
	//Массив с загруженными из LS вариантами финансирования
	const variantsArray = []
	//Ссылка в меню на страницу график финансирования
	const chartPageLink = document.getElementById('chartPageLink')
	const chartWrapper = document.getElementById('chartWrapper')
	const revenueChartWrapper = document.getElementById('revenueChartWrapper')
	const setBuildingPeriodButton = document.getElementById('setBuildingPeriodButton')
	const enterCashButton = document.getElementById('enterCashButton')
	const removeCashButton = document.getElementById('removeCashButton')
	const tab = document.getElementById('chartPageTable')
	//Выбранный вариант финансирования
	let chosenVar = null


	//Загрузка вариантов финансирования из хранилища
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


	//Добавление названий загруженных вариантов в select
	function showLoadedVariants() {
		if (variantsArray.length > 0) {
			option = document.createElement('option')
			option.value = null
			option.textContent = "Выберите вариант финансирования"
			chartPageSelect.appendChild(option)
			variantsArray.sort((a, b) => {
				return (+(a.key.slice(a.key.length - 1))) - (+(b.key.slice(b.key.length - 1)))
			})
			for (let i = 0; i < variantsArray.length; i++) {
				option = document.createElement('option')
				option.value = i
				option.textContent = "Вариант финансирования " + (i + 1)
				chartPageSelect.appendChild(option)
			}
		} else {
			option = document.createElement('option')
			option.textContent = "В базе данных отсутствуют сохранённые объекты."
			chartPageSelect.appendChild(option)
		}
	}


	//Очистка select с названиями вариантов финансирования
	function clearSelect() {
		chartPageSelect.innerHTML = ""
	}


	//Функция отображения опций под графиком
	function showOptions() {
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


	//Отображение выбранного варианта на странице
	function chooseVariant() {
		//Элементы p на всех страницах, где отображается название выбранного варианта
		const showedChosenVars = document.getElementsByClassName('chosen_var')
		//Форма на первой странице
		const form = document.querySelector('.app__main__form')

		if (chartPageSelect.value * 1 === +(chartPageSelect.value)) {
			let i = +(chartPageSelect.value)
			chosenVar = variantsArray[i]
			if (chosenVar) {
				showOptions()
				showedChosenVars[0].textContent = 'Вариант финансирования ' + (i + 1)
				showedChosenVars[1].textContent = 'Вариант финансирования ' + (i + 1)

				//Отображение текущего остатка выбранного варианта на второй странице
				$('#totalValueChart').val(String(chosenVar.totalValue.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')).hide().fadeIn(500)
				$('#ownCashChart').val(String(chosenVar.ownCash.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')).hide().fadeIn(500)
				$('#bankCreditChart').val(String(chosenVar.bankCredit.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')).hide().fadeIn(500)
				$('#escrowResourceChart').val(String(chosenVar.escrowResource.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')).hide().fadeIn(500)
				$('#investorAChart').val(String(chosenVar.investorA.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')).hide().fadeIn(500)
				$('#investorBChart').val(String(chosenVar.investorB.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')).hide().fadeIn(500)
				$('#deficiteSumChart').val(String(chosenVar.deficite).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')).hide().fadeIn(500)

				//Отображение значений по умолчанию выбранного варианта на первой странице
				form.totalValue.value = String(chosenVar.totalValue.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
				form.ownCash.value = String(chosenVar.ownCash.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
				form.bankCredit.value = String(chosenVar.bankCredit.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
				form.escrowResource.value = String(chosenVar.escrowResource.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
				form.investorA.value = String(chosenVar.investorA.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
				form.investorB.value = String(chosenVar.investorB.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
				form.deficiteSum.value = String(chosenVar.defificte).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
			} else {
				showedChosenVars[0].textContent = 'Вариант финансирования не выбран '
				showedChosenVars[1].textContent = 'Вариант финансирования не выбран '
			}
		}
	}


	function createChart() {
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


	function removeChart(chartWrap) {
		chartWrap.innerHTML = ""
	}


	function addCashToChart(source, volume, month, year, operation, periodsArr) {
		let incomeDate = month + ' ' + year
		let indexOfDate
		let sourceVolume
		console.log(chosenVar[source])
		if (!year) {
			alert('Укажите год')
			return
		}
		indexOfDate = periodsArr.indexOf(incomeDate)
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
				for (let i = indexOfDate; i < chosenVar.periods.length; i++) {
					if (chosenVar[source].changesArr[i]) {
						chosenVar[source].changesArr[i] += sourceVolume
					} else {
						chosenVar[source].changesArr[i] = sourceVolume
					}
				}
				chosenVar[source].currentBalance -= sourceVolume
				document.getElementById(source + 'Chart').value = String(chosenVar[source].currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
			} else {
				alert('Введённая сумма превышает остаток данного источника.')
				return
			}

		} else {
			alert('Указанная дата не входит в период строительства.')
			return
		}
	}



	function setBuildingPeriod(startMonth, startYear, endMonth, endYear) {
		let periodsArray = []
		let repaymentPeriodsArray = []
		let defaultMonthsArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
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

		repaymentPeriodsArray = periodsArray.slice()
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

		return [periodsArray, repaymentPeriodsArray]
	}


	function createTotalValueLine() {
		chosenVar.totalValue.changesArr.length = 0
		for (let i = 0; i < chosenVar.periods.length; i++) {
			chosenVar.totalValue.changesArr.push(chosenVar.totalValue.defaultBalance)
		}
	}


	function countCurrentWastedSum() {

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


	//Обработчики событий на 2 странице

	window.addEventListener('load', () => {
		clearSelect()
		loadVariants()
		showLoadedVariants()
		chooseVariant()
	})


	chartPageLink.addEventListener('click', () => {
		clearSelect()
		loadVariants()
		showLoadedVariants()
		chooseVariant()
	})


	chartPageSelect.addEventListener('change', (event) => {
		chooseVariant()
		if (chosenVar.chart == true) {
			createChart()
			cleanTab(tab)
		} else {
			removeChart(chartWrapper)
		}
	})


	setBuildingPeriodButton.addEventListener('click', (event) => {
		event.preventDefault()
		let startMonth = +(document.getElementById('StartOfPeriodMonth').value);
		let startYear = +(document.getElementById('StartOfPeriodYear').value);
		let endMonth = +(document.getElementById('EndOfPeriodMonth').value);
		let endYear = +(document.getElementById('EndOfPeriodYear').value);
		chosenVar.firstMonth = startMonth;
		chosenVar.firstYear = startYear;
		chosenVar.lastMonth = endMonth;
		chosenVar.lastYear = endYear;
		[chosenVar.periods, chosenVar.repaymentPeriods] = setBuildingPeriod(startMonth, startYear, endMonth, endYear);

		if (chosenVar.periods.length > 0) {
			createTotalValueLine()
			showOptions()
			localStorage.setItem(chosenVar.key, JSON.stringify(chosenVar))
			createChart()
		}
	})


	enterCashButton.addEventListener('click', (event) => {
		event.preventDefault()
		addCashToChart(document.getElementById('sourceOfIncome').value, document.getElementById('sumOfIncome').value, document.getElementById('monthOfIncome').value, document.getElementById('yearOfIncome').value, '+', chosenVar.periods)
	})

	removeCashButton.addEventListener('click', (event) => {
		event.preventDefault()
		addCashToChart(document.getElementById('sourceOfIncome').value, document.getElementById('sumOfIncome').value, document.getElementById('monthOfIncome').value, document.getElementById('yearOfIncome').value, '-', chosenVar.periods)
	})


	document.getElementById('deleteVariant').addEventListener('click', () => {
		deleteVariant()
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
		if (item >= 0 && interestRate > 0) {
			let periodPayment = (item / 100) * (interestRate / 12)
			total += periodPayment
			return total
		} else {
			periodPayment = 0
			total += periodPayment
		}
		return 0
	}


	function deleteVariant() {
		alert('Вариант удалён.')
		delete(localStorage[chosenVar.key])
		window.location.reload()

	}
}())