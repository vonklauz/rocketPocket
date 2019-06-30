import Chart from 'chart.js'
import ObjectOfBuilding from './Classes'
(function () {
	const form = document.querySelector('.app__main__form')
	//Активные поля ввода для источников финансирования, без общей суммы и неактивных для пользовательского ввода полей
	const activeInputs = document.getElementsByClassName('sourceOfResource')
	//Абсолютно все поля ввода на странице "объём и источники финансирования"
	const allInputs = form.getElementsByTagName('input')
	//Поле ввода общей суммы финансирования
	const totalValueInput = document.getElementById('totalValueInput')
	//Блок-обёртка для общего объёма финансирования
	const totalValueWrapper = document.getElementById('totalValueWrapper')
	//Блок, появляющийся при недостаточной общей сумме финансирования
	const errorSpan = document.getElementById('errorSpan')
	//Кнопка для отображения графика
	const volumesOfCashChartButton = document.getElementById('volumesOfCashChartButton')
	//Кнопка сохранить
	const saveButton = document.getElementById('volumesOfCashSaveButton')
	//Поле с числом дефицита финансирования
	const deficiteSum = form.deficiteSum
	//Ссылка на страницу объёма финансирования
	const volumePageLink = document.getElementById('volumePageLink')
	//Число общей суммы финансирования
	let totalValue,
		//Один процент от общей суммы финансирования
		onePercent, ownCash, bankCredit, escrowResource, investorA, investorB, deficite,
		//Сумма источников поступлений на данный момент
		currentSumOfInputsValues,
		//Массив с суммами различных источников финансирования
		valuesArray,
		//сумма всех инпутов
		valuesSum,
		//Булево значение, превышен ли общий объём финансирования
		isOverflow,
		//переменная-id блока с графиком
		volumePageChart,
		//переменная-график
		myDoughnutChart


	totalValueInput.addEventListener('blur', () => {
		totalValue = +(totalValueInput.value.replace(/ /g, ""))
		onePercent = totalValue / 100
		collectInputValues()
		isOverflow = countDeficite()
		isLessThanTotalValue()
		for (let i = 0; i < activeInputs.length; i++) {
			if (!totalValueInput.value) {
				activeInputs[i].disabled = true
			} else {
				activeInputs[i].disabled = false
				countPercents(activeInputs[i])
			}
		}
	})


	//Перебор инпутов источников финансирования и навешивание на каждый обработчик с логикой
	for (let i = 0; i < activeInputs.length; i++) {
		activeInputs[i].addEventListener('blur', () => {
			totalValue = +(form.querySelector('.totalValueInput').value.replace(/ /g, ""))
			onePercent = totalValue / 100
			countPercents(activeInputs[i])
			collectInputValues()
			isOverflow = countDeficite()
			isLessThanTotalValue()
		})
	}


	saveButton.addEventListener('click', (event) => {
		event.preventDefault()
		collectInputValues()
		isOverflow = countDeficite()
		if (!isOverflow) {
			if (!localStorage['variant' + localStorage.length]) {
				localStorage.setItem('variant' + localStorage.length, JSON.stringify(new ObjectOfBuilding(totalValue, ownCash, bankCredit, escrowResource, investorA, investorB, deficite, ('variant' + localStorage.length))))
				alert('Объект успешно сохранён.')
			} else if (localStorage['variant' + localStorage.length]) {
				let n = localStorage.length
				while (true) {
					if (!localStorage['variant' + n]) {
						localStorage.setItem('variant' + n, JSON.stringify(new ObjectOfBuilding(totalValue, ownCash, bankCredit, escrowResource, investorA, investorB, deficite, ('variant' + n))))
						alert('Объект успешно сохранён.')
						break
					}
					n++
				}
			} else {
				alert('Невозможно сохранить объект: превышен общий объём финансирования.')
			}
		}
	})


	volumePageLink.addEventListener('click', () => {
		totalValue = +(totalValueInput.value.replace(/ /g, ""))
		if (totalValue) {
			onePercent = totalValue / 100
			collectInputValues()
			isOverflow = countDeficite()
			isLessThanTotalValue()
			for (let i = 0; i < activeInputs.length; i++) {
				if (!totalValueInput.value) {
					activeInputs[i].disabled = true
				} else {
					activeInputs[i].disabled = false
					countPercents(activeInputs[i])
				}
			}
		}
	})


	volumesOfCashChartButton.addEventListener('click', (event) => {
		event.preventDefault()
		collectInputValues()
		isOverflow = countDeficite()
		if (!isOverflow) {
			chartDiv.innerHTML = ""
			chartDiv.innerHTML = '<canvas id="volumePageChart"></canvas>'
			volumePageChart = document.getElementById('volumePageChart');
			myDoughnutChart = new Chart(volumePageChart, {
				type: 'doughnut',
				data: {
					labels: ['Собственные ср-ва', 'Кредит банка под залог', 'Кредит банка/эскроу ресурс', 'Инв-р кат. А', 'Инв-р кат. В', 'Дефицит ресурсов'],
					datasets: [{
						label: '# of Votes',
						data: [ownCash, bankCredit, escrowResource, investorA, investorB, deficite],
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
		} else {
			chartDiv.innerHTML = ""
		}
	})



	//Сбор текущих значений полей ввода 
	function collectInputValues() {
		totalValue = +(form.totalValue.value.replace(/ /g, ''))
		ownCash = +(form.ownCash.value.replace(/ /g, ''))
		bankCredit = +(form.bankCredit.value.replace(/ /g, ''))
		escrowResource = +(form.escrowResource.value.replace(/ /g, ''))
		investorA = +(form.investorA.value.replace(/ /g, ''))
		investorB = +(form.investorB.value.replace(/ /g, ''))
		valuesArray = [ownCash, bankCredit, escrowResource, investorA, investorB]
	}


	//Подсчёт, какой процент от общей суммы финансирования составляет принятый инпут
	function countPercents($el) {
		let percentsOfTotal;
		let elValue;
		elValue = +($el.value.replace(/ /g, ""))
		percentsOfTotal = elValue / onePercent
		$el.nextElementSibling.textContent = percentsOfTotal.toFixed(2) + "% от общего объёма"
	}


	//Подсчёт суммы дефицита финансирования
	function countDeficite() {
		let result;
		let percentOfTotal;
		valuesSum = 0
		for (let i = 0; i < valuesArray.length; i++) {
			valuesSum += valuesArray[i]
		}
		deficite = totalValue - valuesSum
		deficiteSum.value = String(totalValue - valuesSum).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		percentOfTotal = (totalValue - valuesSum) / (totalValue / 100)
		deficiteSum.nextElementSibling.textContent = percentOfTotal.toFixed(2) + "% от общего объёма"
		result = valuesSum > totalValue ? true : false
		return result
	}


	//Оповещает о превышении общей суммы финансирования, если такое произойдёт
	function isLessThanTotalValue() {
		if (isOverflow) {
			totalValueWrapper.classList.add('block_error')
			totalValueInput.classList.add('input_error')
			errorSpan.classList.remove('hide')
		} else {
			totalValueWrapper.classList.remove('block_error')
			totalValueInput.classList.remove('input_error')
			errorSpan.classList.add('hide')
		}
	}
}())
