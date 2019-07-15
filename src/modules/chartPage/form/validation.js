import {
	countPercents
} from '../dataListener/chooseVariant'

//Возвращает булево значение, превышен ли общий объём финансирования
export function validInputs(inputsArr, totalValue) {
	let deficite = 0;
	for (let i = 0; i < inputsArr.length; i++) {
		if (inputsArr[i].value) {
			deficite += Number(inputsArr[i].value.replace(/ /g, ""))
		}
	}
	let isOverflow = totalValue >= deficite ? false : true
	deficite = totalValue - deficite
	document.getElementById('volumesOfCashForm').deficiteSum.value = String(deficite).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	countPercents(document.getElementById('volumesOfCashForm').deficiteSum)
	return isOverflow
}


//Оповещает о превышении общей суммы финансирования, если такое произойдёт
export function isLessThanTotalValue(isOverflow) {

	//Поле ввода общей суммы финансирования
	const totalValueInput = document.getElementById('totalValueInput')
	//Блок-обёртка для общего объёма финансирования
	const totalValueWrapper = document.getElementById('totalValueWrapper')

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


//Подсчёт заполненных полей ввода
export function countFulfilledInputs(inputsArr) {

	let fulfilledInputsCounter = 0

	for (let i = 0; i < inputsArr.length; i++) {
		Number(inputsArr[i].value) > 0 ? fulfilledInputsCounter++ : false
	}

	return fulfilledInputsCounter
}
