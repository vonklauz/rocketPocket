import {
	showOptions
} from '../chartOptions/chartOptions'

export function chooseObject($select, objectsArr) {
	if (typeof + ($select.value) == 'number') {
		let chosenObj = objectsArr[+($select.value)]
		return chosenObj
	} else {
		return false
	}
}

//Отображение выбранного варианта на странице
export function chooseVariant($select, loadedVariantsArray) {

	//Выбранный вариант финансирования попадёт в эту переменную
	let chosenVar;
	const form = document.querySelector('.app__main__form')

	chosenVar = loadedVariantsArray[$select.value]
	if (chosenVar) {
		showOptions(chosenVar)

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
		countPercents(form.totalValue)

		form.ownCash.value = String(chosenVar.ownCash.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		countPercents(form.ownCash)

		form.bankCredit.value = String(chosenVar.bankCredit.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		countPercents(form.bankCredit)

		form.escrowResource.value = String(chosenVar.escrowResource.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		countPercents(form.escrowResource)

		form.investorA.value = String(chosenVar.investorA.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		countPercents(form.investorA)

		form.investorB.value = String(chosenVar.investorB.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		countPercents(form.investorB)

		form.deficiteSum.value = String(chosenVar.deficite).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
		countPercents(form.deficiteSum)


		return chosenVar
	}
	return false
}


export function countPercents(input) {
	let totalVal = Number(document.getElementById('totalValueInput').value.replace(/ /g, ""))
	let onePercent = totalVal / 100
	let percentOfTotal = Number(input.value.replace(/ /g, "")) / onePercent
	if (percentOfTotal > 0) {
		input.nextElementSibling.textContent = percentOfTotal.toFixed(2) + "% от общего объёма"
	}
	else{
		input.nextElementSibling.textContent = "% от общего объёма"
	}
}
