export function elementsHandler(operation, elements) {
	for (let i = 0; i < elements.length; i++) {

		if (operation == 'hide') {
			elements[i].classList.add('hide')
		} else if (operation == 'show') {
			elements[i].classList.remove('hide')
		} else {
			return false
		}
	}
}


export function inputsHandler(operation, inputs) {
	for (let i = 0; i < inputs.length; i++) {

		if (operation == 'enable') {
			inputs[i].disabled = false
		} else if (operation == 'disable') {
			inputs[i].disabled = true
		} else {
			return false
		}
	}
}


export function clearInputs(inputValues) {
	for (let i = 0; i < inputValues.length; i++) {
		inputValues[i].value = ''
		
		if (i > 0) {
			inputValues[i].nextElementSibling.innerHTML = '% от общего объёма'
		}
	}
	document.getElementById('volumesOfCashForm').ownCash.value = ''
	document.getElementById('volumesOfCashForm').ownCash.nextElementSibling.innerHTML = '% от общего объёма'
	document.getElementById('volumesOfCashForm').deficiteSum.value = ''
	document.getElementById('volumesOfCashForm').deficiteSum.nextElementSibling.innerHTML = '% от общего объёма'
}


export function setOptionToShow(optionToChoose, object, objectsArr) {
		for (let i = 0; i < objectsArr.length; i++) {
			if (objectsArr[i].key == object.key) {
				optionToChoose = i
			}
		}
	return optionToChoose
	}


export function displayChosenSelectOption(select, option) {
	let options = select.getElementsByTagName('option')
	console.log(option)
	for(let i = 0; i < options.length; i++) {
		if(options[i].value == option){
			options[i].selected = true
			console.log(options[i].selected)
		}
	}
	
}


export function setDefaultForm(elements, inputs, inputValues) {

	elementsHandler('hide', elements)
	inputsHandler('disable', inputs)
	clearInputs(inputValues)
	document.getElementById('doughNutChartWrapper').innerHTML = ''
}
