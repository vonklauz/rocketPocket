import {
	VariantOfFinancing
} from '../../commonFiles/Classes'

export function saveVariant(chosenObj) {
	
	let n = Object.keys(chosenObj.variantsOfFinancing).length
	const form = document.getElementById('volumesOfCashForm')
	let [
		totalValue,
		ownCash,
		bankCredit,
		escrowResource,
		investorA,
		investorB,
		deficite
	] = [
		Number(form.totalValue.value.replace(/ /g, "")),
		Number(form.ownCash.value.replace(/ /g, "")),
		Number(form.bankCredit.value.replace(/ /g, "")),
		Number(form.escrowResource.value.replace(/ /g, "")),
		Number(form.investorA.value.replace(/ /g, "")),
		Number(form.investorB.value.replace(/ /g, "")),
		Number(form.deficiteSum.value.replace(/ /g, ""))
	]

	while (true) {
		if (chosenObj.variantsOfFinancing['variant' + n]) {
			n++
		} else {
			chosenObj.variantsOfFinancing['variant' + n] = new VariantOfFinancing(totalValue, ownCash, bankCredit, escrowResource, investorA, investorB, deficite, ('variant' + n))
			break

		}

	}
	
	localStorage.setItem(chosenObj.key, JSON.stringify(chosenObj))
	alert('Вариант успешно сохранён.')
	return ('variant' + n)

}
