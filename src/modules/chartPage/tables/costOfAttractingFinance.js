export function renderCostOfAttractingTable(chosenObj, chosenVar) {
	const table = document.getElementById('costCorrectionTable')
	let m2OwnCost = chosenObj.estimate.m2OwnCost.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
	let correctedM2OwnCost = String(correctOwnCost(chosenObj, chosenVar)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
	
	chosenObj.estate.flats.flatsMarkup = +(document.getElementById('tableFlatsMarkup').value.replace(/ /g, "")) > 0 ? +(document.getElementById('tableFlatsMarkup').value.replace(/ /g, "")) : "";
	
	chosenObj.estate.offices.officesMarkup = +(document.getElementById('tableOfficesMarkup').value.replace(/ /g, "")) > 0 ? +(document.getElementById('tableOfficesMarkup').value.replace(/ /g, "")) : "";
	
	chosenObj.estate.trade.tradeMarkup = +(document.getElementById('tableTradeMarkup').value.replace(/ /g, "")) > 0 ? +(document.getElementById('tableTradeMarkup').value.replace(/ /g, "")) : "";
	
	chosenObj.estate.storages.storagesMarkup = +(document.getElementById('tableStoragesMarkup').value.replace(/ /g, "")) > 0 ? +(document.getElementById('tableStoragesMarkup').value.replace(/ /g, "")) : "";
	
	chosenObj.estate.parking.parkingMarkup = +(document.getElementById('tableParkingMarkup').value.replace(/ /g, "")) > 0 ? +(document.getElementById('tableParkingMarkup').value.replace(/ /g, "")) : "";
	
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
							<th>Планируемая рентабельность, %</th>
						</tr>
						<tr>
							<td>По типам недвижимости</td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableFlatsMarkup" value="${chosenObj.estate.flats.flatsMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableOfficesMarkup" value="${chosenObj.estate.offices.officesMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableTradeMarkup" value="${chosenObj.estate.trade.tradeMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableStoragesMarkup" value="${chosenObj.estate.storages.storagesMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableParkingMarkup" value="${chosenObj.estate.parking.parkingMarkup}" maxlength="4"></input></td>
							<td id="middleObjectMarkup"></td>
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
							<td>${countSellingPriceWOAttractingResources(chosenObj, m2OwnCost)}</td>
						</tr>
						<tr>
							<td>С учётом стоимости привлечения фин. рес.</td>
							<td>${correctSellingPrice(chosenObj, 'flats', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'offices', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'trade', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'storages', chosenVar)}</td>
							<td>${correctSellingPrice(chosenObj, 'parking', chosenVar)}</td>
							<td id='totalValueTd'>${correctTotalRevenue(chosenObj, chosenVar)}</td>
						</tr>
						<tr>
							<th>Эффект</th>
						</tr>
						<tr>
							<td><b>Прибыль застройщика</b></td>
							<td id="builderNetProfitTd"></td>
						</tr>
						<tr>
							<td><b>Фактическая рентабельность, %</b></td>
							<td id="actualProfabilityTd"></td>
						</tr>
						`
	
	table.insertAdjacentHTML('afterbegin', tableContent);
	
	chosenObj.estimate.revenueIncludingFinRes = Number(correctTotalRevenue(chosenObj, chosenVar).replace(/ /g, ""));
	
	let builderNetProfit = chosenObj.estimate.revenueIncludingFinRes - chosenVar.costOfAttractiveFinance - chosenObj.estimate.ownCost;
	console.log(`builderNetProfit: ${String(builderNetProfit.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`);
	
	let actualProfability = builderNetProfit / (chosenObj.estimate.ownCost / 100);
	console.log(`actualProfability: ${String(actualProfability.toFixed(2)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`);
	
	document.getElementById('builderNetProfitTd').textContent = String(builderNetProfit.toFixed(0)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
	
	document.getElementById('actualProfabilityTd').textContent = String(actualProfability.toFixed(2)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
	
	
	document.getElementById('middleObjectMarkup').textContent = (chosenObj.estimate.revenueExcludingFinRes  / (chosenObj.estimate.ownCost / 100) - 100).toFixed(2);
	

}


export function cleanCostOfAttractingTable(chosenObj) {
	
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
							<th>Планируемая рентабельность, %</th>
						</tr>
						<tr>
							<td>По типам недвижимости</td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableFlatsMarkup" value="${chosenObj.estate.flats.flatsMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableOfficesMarkup" value="${chosenObj.estate.offices.officesMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableTradeMarkup" value="${chosenObj.estate.trade.tradeMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableStoragesMarkup" value="${chosenObj.estate.storages.storagesMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"><input type="text" class="costOfAttractingFinanceTable_input number_input" id="tableParkingMarkup" value="${chosenObj.estate.parking.parkingMarkup}" maxlength="4"></input></td>

							<td class="costOfAttractingFinanceTable_td"></td>
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

function countSellingPriceWOAttractingResources(chosenObj, m2OwnCost){
	const keysArr = ['flats', 'offices', 'trade', 'storages', 'parking']
	
	let buildingOwnCost = 0;
	
	m2OwnCost = +(m2OwnCost.replace(/ /g, ""))
	
	keysArr.map((estateType) => {
		if(chosenObj['estate'][estateType][estateType + 'Square']){
			let estateTypeOwnCost = (chosenObj['estate'][estateType][estateType + 'Square'] * m2OwnCost)
			buildingOwnCost += ((estateTypeOwnCost / 100) * chosenObj['estate'][estateType][estateType + 'Markup']) + estateTypeOwnCost
		}
	})
	
	chosenObj.estimate.revenueExcludingFinRes = buildingOwnCost
	
	return String(buildingOwnCost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
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
	const keysArr = ['flats', 'offices', 'trade', 'storages', 'parking']
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
