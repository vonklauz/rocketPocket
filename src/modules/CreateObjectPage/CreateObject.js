import {
	ObjectOfBuilding
} from '../commonFiles/Classes'

import {
	loadObjects,
	showLoadedData
} from '../commonFiles/dataLoader'

(function () {

	const objectsPageSelect = document.getElementById('objectsPageSelect')

	let objectsArr = []

	const form = document.querySelector('.object__passport')
	const formInputs = form.getElementsByTagName('input')
	const volumesOfCashCreateObjectButton = document.getElementById('volumesOfCashCreateObjectButton')
	const deleteObjectButton = document.getElementById('deleteObjectButton')
	const volumesOfCashSaveButton = document.getElementById('volumesOfCashSaveButton')

	const necessaryInputs = [document.getElementById('objectName'), document.getElementById('objectEstimate'), document.getElementById('objectArea')]

	const unnecessaryInputs = [document.getElementById('flatsSquare'), document.getElementById('officesSquare'), document.getElementById('tradeSquare'), document.getElementById('storagesSquare'), document.getElementById('parkingSquare')]

	const markupInputs = [document.getElementById('flatsMarkup'), document.getElementById('officesMarkup'), document.getElementById('tradeMarkup'), document.getElementById('storagesMarkup'), document.getElementById('parkingMarkup')]

	const priceInputs = [document.getElementById('flatsPrice'), document.getElementById('officesPrice'), document.getElementById('tradePrice'), document.getElementById('storagesPrice'), document.getElementById('parkingPrice')]

	let squareInputs = []
	let displayedMarks = []
	let displayedPrices = []

	const objectPassportNextStepButton = document.getElementById('objectPassportNextStepButton')
	const secondHalfOfForm = document.querySelector('.object__passport__cost_price')
	const m2OwnCostInput = document.getElementById('m2OwnCostInput')
	const countPriceButton = document.getElementById('countPriceButton')
	const totalRevenueInput = document.getElementById('totalRevenue')

	let isNecessaryInputsValid = false
	let isUnnecessaryInputsValid = false
	let totalSquare;
	let estimate;
	let m2OwnCost;
	let objectToSave;
	let chosenObj;


	function hideUselessButtons() {
		volumesOfCashCreateObjectButton.classList.add('hide')
		deleteObjectButton.classList.add('hide')
	}


	function validNecessaryInputs(necessaryInputs) {
		const errorSpan = `<small class="small_error">Данное поле обязательно к заполнению</small>`
		const incorrectDataSpan = `<small class="small_error">Введите корректные данные</small>`

		for (let i = 0; i < necessaryInputs.length; i++) {
			if (!necessaryInputs[i].value) {
				if (necessaryInputs[i].parentNode.lastElementChild == document.querySelector('.small_error')) {
					necessaryInputs[i].parentNode.removeChild(document.querySelector('.small_error'))
				}
				necessaryInputs[i].insertAdjacentHTML('afterend', errorSpan)
				return false
			} else {
				if (necessaryInputs[i].parentNode.lastElementChild == document.querySelector('.small_error')) {
					necessaryInputs[i].parentNode.removeChild(document.querySelector('.small_error'))
				}
			}

			if (necessaryInputs[i] == document.getElementById('objectEstimate')) {
				if (+(necessaryInputs[i].value) < 10000) {
					necessaryInputs[i].insertAdjacentHTML('afterend', incorrectDataSpan)
					return false
				} else {
					if (necessaryInputs[i].parentNode.lastElementChild == document.querySelector('.small_error')) {
						necessaryInputs[i].parentNode.removeChild(document.querySelector('.small_error'))
					}
					estimate = +(necessaryInputs[i].value.replace(/ /g, ""))
				}
			}

			if (necessaryInputs[i] == document.getElementById('objectArea')) {
				if (+(necessaryInputs[i].value) < 100) {
					necessaryInputs[i].insertAdjacentHTML('afterend', incorrectDataSpan)
					return false
				} else {
					totalSquare = +(necessaryInputs[i].value.replace(/ /g, ""))
					if (necessaryInputs[i].parentNode.lastElementChild == document.querySelector('.small_error')) {
						necessaryInputs[i].parentNode.removeChild(document.querySelector('.small_error'))
					}
				}
			}
		}
		objectToSave.name = document.getElementById('objectName').value
		objectToSave.estimate.ownCost = estimate
		objectToSave.estate.totalSquare = totalSquare
		return true
	}


	function validUnnecessaryInputs(unnecessaryInputs) {
		const errorSpan = `<small class="small_error">Заполните, как минимум, 1 тип недвижимости</small>`
		const incorrectDataSpan = `<small class="small_error">Сумма введённых кв.метров не соответсвует общему числу кв.м. к реализации.</small>`
		const passportUlLabel = document.getElementById('passportUlLabel')
		let prop;
		let fulfilledInputsCounter = 0
		let inputsSum = 0
		for (let i = 0; i < unnecessaryInputs.length; i++) {
			if (+(unnecessaryInputs[i].value.replace(/ /g, "")) > 0) {
				fulfilledInputsCounter++

				prop = unnecessaryInputs[i].getAttribute('id')
				inputsSum += +(unnecessaryInputs[i].value.replace(/ /g, ""))

				markupInputs[i].parentNode.classList.remove('hide')
				priceInputs[i].parentNode.classList.remove('hide')

				displayedMarks.push(markupInputs[i])
				displayedPrices.push(priceInputs[i])
				squareInputs.push(+(unnecessaryInputs[i].value.replace(/ /g, "")))

				objectToSave.estate[prop.slice(0, prop.length - 6)][prop] = +(unnecessaryInputs[i].value.replace(/ /g, ""))
			} else {
				markupInputs[i].parentNode.classList.add('hide')
				priceInputs[i].parentNode.classList.add('hide')
			}
		}

		if (fulfilledInputsCounter == 0) {
			if (passportUlLabel.nextElementSibling == document.querySelector('.small_error')) {
				passportUlLabel.parentNode.removeChild(document.querySelector('.small_error'))
			}
			passportUlLabel.insertAdjacentHTML('afterend', errorSpan)
			return false
		} else {
			if (passportUlLabel.nextElementSibling == document.querySelector('.small_error')) {
				passportUlLabel.parentNode.removeChild(document.querySelector('.small_error'))
			}
		}

		if (inputsSum != totalSquare) {
			if (passportUlLabel.nextElementSibling == document.querySelector('.small_error')) {
				passportUlLabel.parentNode.removeChild(document.querySelector('.small_error'))
			}
			passportUlLabel.insertAdjacentHTML('afterend', incorrectDataSpan)
			squareInputs.length = 0
			return false
		} else {
			if (passportUlLabel.nextElementSibling == document.querySelector('.small_error')) {
				passportUlLabel.parentNode.removeChild(document.querySelector('.small_error'))
			}
		}

		return true
	}


	function showSecondHalfOfForm() {
		secondHalfOfForm.classList.remove('hide')
		objectPassportNextStepButton.classList.add('hide')
	}


	function hideSecondHalfOfForm() {
		secondHalfOfForm.classList.add('hide')
		objectPassportNextStepButton.classList.remove('hide')
	}


	function countM2OwnCost(totalSquare, estimate, m2OwnCost, inputToDisplay) {
		m2OwnCost = (estimate / totalSquare).toFixed(0)
		inputToDisplay.value = String(m2OwnCost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		return m2OwnCost
	}


	function countPrice() {
		let markup;
		let price;
		let totalRevenue = 0
		let prop;

		for (let i = 0; i < displayedMarks.length; i++) {
			markup = +(displayedMarks[i].value)
			prop = displayedMarks[i].getAttribute('id')

			objectToSave.estate[prop.slice(0, prop.length - 6)][prop] = +(displayedMarks[i].value)

			price = (((m2OwnCost / 100) * markup) + m2OwnCost).toFixed(0)

			objectToSave.estate[prop.slice(0, prop.length - 6)][displayedPrices[i].getAttribute('id')] = price

			displayedPrices[i].value = String(price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
			totalRevenue += (price * squareInputs[i])
		}
		objectToSave.estimate.revenueExcludingFinRes = totalRevenue
		totalRevenueInput.value = String(totalRevenue).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	}


	function chooseObject($select) {
		if (typeof + ($select.value) == 'number') {
			chosenObj = objectsArr[+($select.value)]
			return chosenObj
		} else {
			return false
		}
	}

	//Заполнение полей ввода данными из выбранного объекта
	function fulfillPageInputs(chosenObj) {

		//Деактивация возможности ввода, дабы не перезаписать данные объекта(в данной версии приложения перезапись объекта нежелательна)
		disableInputs(formInputs)

		document.getElementById('objectName').value = chosenObj.name
		document.getElementById('objectEstimate').value = prepareValueToDisplay(chosenObj.estimate.ownCost)
		document.getElementById('objectArea').value = prepareValueToDisplay(chosenObj.estate.totalSquare)

		showFilledInput(chosenObj.estate, 'flats', 'flatsSquare')
		showFilledInput(chosenObj.estate, 'offices', 'officesSquare')
		showFilledInput(chosenObj.estate, 'trade', 'tradeSquare')
		showFilledInput(chosenObj.estate, 'storages', 'storagesSquare')
		showFilledInput(chosenObj.estate, 'parking', 'parkingSquare')

		m2OwnCostInput.value = prepareValueToDisplay(chosenObj.estimate.m2OwnCost)

		showFilledInput(chosenObj.estate, 'flats', 'flatsMarkup')
		showFilledInput(chosenObj.estate, 'offices', 'officesMarkup')
		showFilledInput(chosenObj.estate, 'trade', 'tradeMarkup')
		showFilledInput(chosenObj.estate, 'storages', 'storagesMarkup')
		showFilledInput(chosenObj.estate, 'parking', 'parkingMarkup')

		showFilledInput(chosenObj.estate, 'flats', 'flatsPrice')
		showFilledInput(chosenObj.estate, 'offices', 'officesPrice')
		showFilledInput(chosenObj.estate, 'trade', 'tradePrice')
		showFilledInput(chosenObj.estate, 'storages', 'storagesPrice')
		showFilledInput(chosenObj.estate, 'parking', 'parkingPrice')

		totalRevenueInput.value = prepareValueToDisplay(chosenObj.estimate.revenueExcludingFinRes)
	}


	function showFilledInput(chosenObj, estateType, inputType) {
		if (chosenObj[estateType][inputType]) {
			document.getElementById(inputType).value = prepareValueToDisplay(chosenObj[estateType][inputType])
			document.getElementById(inputType).parentNode.classList.remove('hide')
		}
	}


	function prepareValueToDisplay(val) {
		return String(val).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	}


	function disableInputs(inputsArr) {
		for (let i = 0; i < inputsArr.length; i++) {
			inputsArr[i].disabled = true
		}
	}


	function makeInputsAble(inputsArr) {
		for (let i = 0; i < inputsArr.length; i++) {
			inputsArr[i].disabled = false
		}
	}


	function clearInputsValues(inputsArr) {
		for (let i = 0; i < inputsArr.length; i++) {
			inputsArr[i].value = ''
		}
	}


	window.addEventListener('load', () => {
		objectsArr = loadObjects()
		showLoadedData(objectsArr, objectsPageSelect)
		disableInputs(formInputs)
		if (objectsArr.length == 0) {
			hideUselessButtons()
			makeInputsAble(formInputs)
			objectToSave = new ObjectOfBuilding()
		}
	})


	objectsPageSelect.addEventListener('change', () => {
		chosenObj = chooseObject(objectsPageSelect)
		if (chosenObj) {
			fulfillPageInputs(chosenObj)
			showSecondHalfOfForm()
			countPriceButton.classList.add('hide')
			volumesOfCashSaveButton.classList.add('hide')
			deleteObjectButton.classList.remove('hide')
		}
	})
	
	
	volumesOfCashCreateObjectButton.addEventListener('click', () => {
		objectToSave = new ObjectOfBuilding()
		hideSecondHalfOfForm()
		makeInputsAble(formInputs)
		clearInputsValues(formInputs)
		countPriceButton.classList.remove('hide')
		volumesOfCashSaveButton.classList.remove('hide')
		deleteObjectButton.classList.add('hide')
	})


	objectPassportNextStepButton.addEventListener('click', (event) => {
		event.preventDefault()

		isNecessaryInputsValid = validNecessaryInputs(necessaryInputs)
		isUnnecessaryInputsValid = validUnnecessaryInputs(unnecessaryInputs)

		if (isNecessaryInputsValid && isUnnecessaryInputsValid) {
			showSecondHalfOfForm()
			m2OwnCost = countM2OwnCost(totalSquare, estimate, m2OwnCost, m2OwnCostInput)
			objectToSave.estimate.m2OwnCost = m2OwnCost
		}
		m2OwnCost = +(m2OwnCost)
	})

	countPriceButton.addEventListener('click', (event) => {
		event.preventDefault()

		countPrice()
	})

	volumesOfCashSaveButton.addEventListener('click', () => {
		console.log(objectToSave)
		localStorage.setItem(objectToSave.key, JSON.stringify(objectToSave))
	})
	
	
	deleteObjectButton.addEventListener('click', () => {
		localStorage.removeItem(chosenObj.key)
		window.location.reload()
	})


}())
