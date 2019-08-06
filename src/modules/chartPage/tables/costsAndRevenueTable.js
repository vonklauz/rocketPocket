import {
	connectCostsAndRevenue
} from '../charts/charts.js'


export function createCostsAndRevenueTable(chosenVar) {
	
	let availableEscrowArr = connectCostsAndRevenue(chosenVar)[1]
	const table = document.getElementById('costsAndRevenueTable')
	let totalDeficite = (availableEscrowArr[0] || 0) - (chosenVar.escrowResource.changesArr[0] || 0)
	
	table.innerHTML = ''
	//countCostsAndRevenue(availableEscrowArr[0], chosenVar.escrowResource.changesArr[0], chosenVar.periods[0], totalDeficite)
	table.insertAdjacentHTML('afterbegin', `<tr> <th>Месяц</th> <th>Разница между доступным и необходимым</th> <th>Нарастающий итог</th> </tr>`)
	table.insertAdjacentHTML('beforeend', countCostsAndRevenue(availableEscrowArr[0], chosenVar.escrowResource.changesArr[0], chosenVar.periods[0], totalDeficite))
	
	for ( let i = 1; i < chosenVar.periods.length; i ++) {
		
		let monthAvailableEscrow = ((availableEscrowArr[i] || 0) - (availableEscrowArr[i - 1] || 0))
		let monthRequiredEscrow = (chosenVar.escrowResource.changesArr[i] || 0) - (chosenVar.escrowResource.changesArr[i - 1] || 0)
		if(i > availableEscrowArr.length - 1) {
			monthAvailableEscrow = 0
		}
		totalDeficite += ((monthAvailableEscrow || 0) - (monthRequiredEscrow || 0))
		table.insertAdjacentHTML('beforeend',countCostsAndRevenue(monthAvailableEscrow, monthRequiredEscrow, chosenVar.periods[i], totalDeficite))
	}
}


function countCostsAndRevenue(availableEscrow, requiredEscrow , month, totalDeficite) {
	let monthId =(availableEscrow || 0)> (requiredEscrow || 0) ? 'greenTd' : 'redTd'
	let totalId = totalDeficite > 0 ? 'greenTd' : 'redTd'
	console.log(availableEscrow, requiredEscrow)
	return `<tr><td class="monthTd">${month}</td><td class="${monthId}">${String((availableEscrow || 0) - (requiredEscrow || 0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td><td class="${totalId}">${String(totalDeficite).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td></tr>`
}
