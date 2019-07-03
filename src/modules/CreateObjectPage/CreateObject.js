import {
	ObjectOfBuilding
} from '../commonFiles/Classes'

(function () {
	const necessaryInputs = [document.getElementById('objectName'), document.getElementById('objectEstimate'), document.getElementById('objectArea')]

	const unnecessaryInputs = [document.getElementById('flatsSquare'), document.getElementById('officesSquare'), document.getElementById('tradeSquare'), document.getElementById('storagesSquare'), document.getElementById('parkingSquare')]

	const markupInputs = [document.getElementById('flatsMarkup'), document.getElementById('officesMarkup'), document.getElementById('tradeMarkup'), document.getElementById('storagesMarkup'), document.getElementById('parkingMarkup')]

	const priceInputs = [document.getElementById('flatsPrice'), document.getElementById('officesPrice'), document.getElementById('tradePrice'), document.getElementById('storagesPrice'), document.getElementById('parkingPrice')]
	
	const squareInputs = []
	
	const displayedMarks = []
	const displayedPrices = []

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
					console.log(+(necessaryInputs[i].value.replace(/ /g, "")))
					totalSquare = +(necessaryInputs[i].value.replace(/ /g, ""))
					if (necessaryInputs[i].parentNode.lastElementChild == document.querySelector('.small_error')) {
						necessaryInputs[i].parentNode.removeChild(document.querySelector('.small_error'))
					}
				}
			}
		}
		return true
	}


	function validUnnecessaryInputs(unnecessaryInputs) {
		const errorSpan = `<small class="small_error">Заполните, как минимум, 1 тип недвижимости</small>`
		const incorrectDataSpan = `<small class="small_error">Сумма введённых кв.метров не соответсвует общему числу кв.м. к реализации.</small>`
		const passportUlLabel = document.getElementById('passportUlLabel')

		let fulfilledInputsCounter = 0
		let inputsSum = 0
		for (let i = 0; i < unnecessaryInputs.length; i++) {
			if (+(unnecessaryInputs[i].value.replace(/ /g, "")) > 0) {
				fulfilledInputsCounter++
				inputsSum += +(unnecessaryInputs[i].value.replace(/ /g, ""))
				markupInputs[i].parentNode.classList.remove('hide')
				priceInputs[i].parentNode.classList.remove('hide')
				displayedMarks.push(markupInputs[i])
				displayedPrices.push(priceInputs[i])
				squareInputs.push(+(unnecessaryInputs[i].value.replace(/ /g, "")))
			}
			else{
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
	
	
	function countPrice(){
		let markup;
		let price;
		let totalRevenue = 0
		
		for(let i = 0; i < displayedMarks.length; i++){
			markup = +(displayedMarks[i].value)
			console.log(markup, m2OwnCost)
			price = (((m2OwnCost / 100) * markup) + m2OwnCost).toFixed(0)
			displayedPrices[i].value = String(price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
			totalRevenue += (price * squareInputs[i])
		}
		totalRevenueInput.value = String(totalRevenue).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	}
	

	objectPassportNextStepButton.addEventListener('click', (event) => {
		event.preventDefault()

		isNecessaryInputsValid = validNecessaryInputs(necessaryInputs)
		isUnnecessaryInputsValid = validUnnecessaryInputs(unnecessaryInputs)

		if (isNecessaryInputsValid && isUnnecessaryInputsValid) {
			showSecondHalfOfForm()
			m2OwnCost = countM2OwnCost(totalSquare, estimate, m2OwnCost, m2OwnCostInput)
		}
		m2OwnCost = +(m2OwnCost)
	})
	
	countPriceButton.addEventListener('click',(event) =>{
		event.preventDefault()
		
		countPrice()
	})

}())
