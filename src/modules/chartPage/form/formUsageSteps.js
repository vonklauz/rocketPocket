export function hideElement($el) {
	$el.classList.add('hide')
}


export function hideAll($els) {
	for (let i = 0; i < $els.length; i++) {
		$els[i].classList.add('hide')
	}
}


export function showElement($el) {
	$el.classList.remove('hide')
}


export function turnOnInputs(inputsArr) {
	for (let i = 0; i < inputsArr.length; i++) {
		inputsArr[i].disabled = false
	}
}


export function turnOffInputs(inputsArr) {
	for (let i = 0; i < inputsArr.length; i++) {
		inputsArr[i].disabled = true
	}
}


export function clearInputs(inputsArr) {
	for (let i = 0; i < inputsArr.length; i++) {
		inputsArr[i].value = ''
	}
	document.getElementById('volumesOfCashForm').deficiteSum.value = ''
}
