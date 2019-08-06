export function renderCostOfAttractingTable(chosenObj, chosenVar) {
	const table = document.getElementById('costCorrectionTable')
	table.innerHTML = '';
	let m2OwnCost = chosenObj.estimate.m2OwnCost.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	let correctedM2OwnCost = String(correctOwnCost(chosenObj, chosenVar)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	const tableContent =
		`<tr>
							<th></th>
							<th>Квартиры</th>
							<th>Офисы</th>
							<th>Торг. площади</th>
							<th>Склады</th>
							<th>Парковка</th>
							<th>По объекту</th>
						</tr>
						<tr>
							<th>Себестоимость м<sup>2</sup></th>
						</tr>
						<tr>
							<td>Без учёта стоимости привлечения фин. рес. </td>
							<td>${printValue(chosenObj, m2OwnCost, 'flats')}</td>
							<td>${printValue(chosenObj, m2OwnCost, 'offices')}</td>
							<td>${printValue(chosenObj, m2OwnCost, 'trade')}</td>
							<td>${printValue(chosenObj, m2OwnCost, 'storages')}</td>
							<td>${printValue(chosenObj, m2OwnCost, 'parking')}</td>
							<td>${String(chosenObj.estimate.ownCost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						</tr>
						<tr>
							<td>С учётом стоимости привлечения фин. рес. </td>
							<td>${printValue(chosenObj, correctedM2OwnCost, 'flats')}</td>
							<td>${printValue(chosenObj, correctedM2OwnCost, 'offices')}</td>
							<td>${printValue(chosenObj, correctedM2OwnCost, 'trade')}</td>
							<td>${printValue(chosenObj, correctedM2OwnCost, 'storages')}</td>
							<td>${printValue(chosenObj, correctedM2OwnCost, 'parking')}</td>
							<td>${String((chosenObj.estimate.ownCost + chosenVar.costOfAttractiveFinance).toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						</tr>
						<tr>
							<th>Цена реализации м<sup>2</sup></th>
						</tr>
						<tr>
							<td>Без учёта стоимости привлечения фин. рес. </td>
							<td>${chosenObj.estate.flats.flatsPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
							<td>${chosenObj.estate.offices.officesPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
							<td>${chosenObj.estate.trade.tradePrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
							<td>${chosenObj.estate.storages.storagesPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
							<td>${chosenObj.estate.parking.parkingPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
							<td>${String(chosenObj.estimate.revenueExcludingFinRes.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						</tr>
						<tr>
							<td>С учётом стоимости привлечения фин. рес.</td>
							<td>${correctSellingPrice(chosenObj, 'flats', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'offices', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'trade', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'storages', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'parking', chosenVar)}</td>
							<td id='totalValueTd'>${correctTotalRevenue(chosenObj, chosenVar)}</td>
						</tr>`
	table.insertAdjacentHTML('afterbegin', tableContent)

}


export function cleanCostOfAttractingTable() {
	
	const table = document.getElementById('costCorrectionTable')
	table.innerHTML = '';
	const tableContent =
		`<tr>
							<th></th>
							<th>Квартиры</th>
							<th>Офисы</th>
							<th>Торг. площади</th>
							<th>Склады</th>
							<th>Парковка</th>
							<th>По объекту</th>
						</tr>
						<tr>
							<th>Себестоимость м<sup>2</sup></th>
						</tr>
						<tr>
							<td>Без учёта стоимости привлечения фин. рес. </td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>С учётом стоимости привлечения фин. рес. </td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<th>Цена реализации м<sup>2</sup></th>
						</tr>
						<tr>
							<td>Без учёта стоимости привлечения фин. рес. </td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>С учётом стоимости привлечения фин. рес.</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td id='totalValueTd'></td>
						</tr>`
	
	table.insertAdjacentHTML('afterbegin', tableContent)
	
	
}


function printValue(chosenObj, value, estateType) {
	if (chosenObj['estate'][estateType][estateType + 'Square'] > 0) {
		return value
	}
	return ''
}


function correctOwnCost(chosenObj, chosenVar) {
	let correctedCost = (chosenVar.costOfAttractiveFinance / chosenObj.estate.totalSquare) + Number(chosenObj.estimate.m2OwnCost)
	return correctedCost.toFixed(0)
}


function correctSellingPrice(chosenObj, estateType, chosenVar) {
	let correctedPrice;
	let correctedOwnCost = (chosenVar.costOfAttractiveFinance / chosenObj.estate.totalSquare) + Number(chosenObj.estimate.m2OwnCost)
	if (Number(chosenObj['estate'][estateType][estateType + 'Price']) > 0) {
		correctedPrice = ((correctedOwnCost / 100) * chosenObj['estate'][estateType][estateType + 'Markup']) + correctedOwnCost;
		chosenVar['prices'][estateType] = correctedPrice;
		return String(correctedPrice.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	} else {
		return ''
	}
}


function correctTotalRevenue(chosenObj, chosenVar) {
	let keysArr = ['flats', 'offices', 'trade', 'storages', 'parking']
	let totalRevenue = 0;
	for (let i = 0; i < keysArr.length; i++) {
		if (chosenObj['estate'][keysArr[i]][keysArr[i] + 'Markup'] > 0) {
			totalRevenue += chosenVar['prices'][keysArr[i]] * chosenObj['estate'][keysArr[i]][keysArr[i] + 'Square']
		}
	}
	/*chosenVar.revenue.defaultBalance = Number(totalRevenue.toFixed(0))
	chosenVar.revenue.currentBalance = Number(totalRevenue.toFixed(0))*/
	return String(totalRevenue.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
}
