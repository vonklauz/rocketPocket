//Загрузка вариантов финансирования из хранилища
export function loadVariants() {
	let variantsArray = []
	if (localStorage.length > 0) {
		let keysArray = Object.keys(localStorage)
		for (let i = 0; i < keysArray.length; i++) {
			if (keysArray[i].indexOf('variant') > -1) {
				variantsArray.push(JSON.parse(localStorage.getItem(keysArray[i])))
			}
		}
	}
	return variantsArray
}


//Добавление названий загруженных вариантов в select
export function showLoadedVariants(loadedVariantsArray, $select) {
	let option;

	if (loadedVariantsArray.length > 0) {
		option = document.createElement('option')
		option.value = null
		option.textContent = "Выберите вариант финансирования"
		$select.appendChild(option)
		loadedVariantsArray.sort((a, b) => {
			return (+(a.key.slice(7))) - (+(b.key.slice(7)))
		})
		for (let i = 0; i < loadedVariantsArray.length; i++) {
			option = document.createElement('option')
			option.value = i
			option.textContent = "Вариант финансирования " + (i + 1)
			$select.appendChild(option)
		}

	} else {
		option = document.createElement('option')
		option.textContent = "В базе данных отсутствуют сохранённые объекты."
		$select.appendChild(option)
	}
	return loadedVariantsArray
}


//Очистка select с названиями вариантов финансирования
export function clearSelect($select) {
	$select.innerHTML = ""
}
