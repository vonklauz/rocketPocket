import {
	connectCostsAndRevenue
} from '../charts/charts'

export const finalCorrection = (rateRedutionPercent, percentOfEscrow, chosenVar) => {

	if (!rateRedutionPercent || !percentOfEscrow) {
		alert('Введите корректные данные');
		return
	}
	
	/*if(percentOfEscrow < 10) {
		if(String(rateRedutionPercent).length < 4) {
			alert('Так как указанный рост выручки в процентах от эскроу-кредита ниже 10, снижение ставки следует указать с сотыми долями.');
			return
		}
	}*/

	const revenueArr = connectCostsAndRevenue(chosenVar)[0];
	let correctedCostOfAttractiveResource = 0;
	let howMuchPercent, uselessNum, currentPayment;
	const table = document.getElementById('finalCorrectionTable');
	table.innerHTML = '';
	table.insertAdjacentHTML('afterbegin', `
		<tr>
			<th>Месяц</th>
			<th>Размер платежа по проценам эскроу-кредита</th>
			<th>Процентная ставка</th>
		</tr>
	`);
	chosenVar.periods.forEach((item, i) => {
		if (chosenVar.escrowResource.changesArr[i]) {
		
			howMuchPercent = Math.floor(countPercentOfSum(chosenVar.escrowResource.changesArr[i], revenueArr[i]));
			let a = (howMuchPercent - howMuchPercent % percentOfEscrow) / percentOfEscrow;
			let currentRate = ((12 - rateRedutionPercent * a).toFixed(1) / 12).toFixed(1);
			currentRate * 12 < 0.6 ? currentRate = 0.1  : null;
			currentPayment = (chosenVar.escrowResource.changesArr[i] / 100 * currentRate).toFixed(0);
			correctedCostOfAttractiveResource += +currentPayment;
			table.insertAdjacentHTML('beforeend', `
				<tr>
					<td class="monthTd narrowTd">${chosenVar.periods[i]}</td>
					<td class="escrowTd">${String(currentPayment).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
					<td>${currentRate}</td>
				</tr>
			`);
		}

	});
	const medianEscrowCreditRate = countPercentOfSum(chosenVar.escrowResource.changesArr[chosenVar.escrowResource.changesArr.length - 1], correctedCostOfAttractiveResource);

	table.insertAdjacentHTML('beforeend', `
		<tr>
			<th>Итого: </th>
			<th>${String(correctedCostOfAttractiveResource).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</th>
			<th>${medianEscrowCreditRate.toFixed(1)}</th>
		</tr>
	`);
}

const countPercentOfSum = (a, b) => b / (a / 100);
