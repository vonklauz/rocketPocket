export function showBoxes(btn = 'select', exp) {
	const checkBoxes = document.getElementById('checkBoxes')
	if (btn == 'select') {
		if (!exp) {
			checkBoxes.classList.remove('hide')
			exp = true
		} else {
			checkBoxes.classList.add('hide')
			exp = false
		}
		return exp
	} else {
		checkBoxes.classList.add('hide')
		exp = false
	}
	return exp
}
