//Загрузка вариантов финансирования из хранилища
export function loadObjects() {
	let objectsArray = []
	if (localStorage.length > 0) {
		let keysArray = Object.keys(localStorage)
		for (let i = 0; i < keysArray.length; i++) {
			if (keysArray[i].indexOf('objectOfBuilding') > -1) {
				objectsArray.push(JSON.parse(localStorage.getItem(keysArray[i])))
			}
		}
	}
	return objectsArray
}


//Добавление названий загруженных вариантов в select
export function showLoadedData(loadedObjectsArray, $objectSelect) {
	let option;

	if (loadedObjectsArray.length > 0) {
		option = document.createElement('option')
		option.value = null
		option.textContent = "Выберите объект строительства"
		$objectSelect.appendChild(option)
		loadedObjectsArray.sort((a, b) => {
			return (a.name.toLowerCase) - (b.name.toLowerCase)
		})
		for (let i = 0; i < loadedObjectsArray.length; i++) {
			option = document.createElement('option')
			option.value = i
			option.textContent = loadedObjectsArray[i].name
			$objectSelect.appendChild(option)
		}

	} else {
		option = document.createElement('option')
		option.textContent = "В базе данных отсутствуют сохранённые объекты."
		$objectSelect.appendChild(option)
	}
	return loadedObjectsArray
}


export function showVariants(chosenObject, $variantSelect) {
	let option;
	let keys = Object.keys(chosenObject.variantsOfFinancing)
	if (keys.length > 0) {
		
		option = document.createElement('option')
		option.value = null
		option.textContent = "Выберите вариант финансирования"
		$variantSelect.appendChild(option)

		for (let i = 0; i < keys.length; i++) {
			option = document.createElement('option')
			option.value = keys[i]
			option.textContent = 'Вариант финансирования ' + (i + 1)
			$variantSelect.appendChild(option)
		}
	} else {
		option = document.createElement('option')
		option.textContent = "У данного объекта пока нет вариантов финансирования."
		$variantSelect.appendChild(option)
	}
	return chosenObject.variantsOfFinancing
}


//Очистка select с названиями вариантов финансирования
export function clearSelect($select) {
	$select.innerHTML = ""
}
