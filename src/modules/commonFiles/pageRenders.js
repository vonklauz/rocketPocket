const appHeader = document.getElementById('app__header')
const appMain = document.querySelector('.app__main')
const appH1 = document.getElementById('app__h1')
//Страница объём финансирования
const volumePage = document.getElementById('volumePage')
//Ссылка на страницу объёма финансирования
const volumePageLink = document.getElementById('volumePageLink')
//Страница график финансирования
const chartPage = document.getElementById('chartPage')
//Ссылка на страницу график финансирования
const chartPageLink = document.getElementById('chartPageLink')
//Ссылка на страницу консолидированный график
const unitedChartLink = document.getElementById('unitedChartLink')
//Страница консолидированный график
const unitedChartPage = document.getElementById('unitedChartPage')
//Текущая страница, на которой находится юзер
let pageToShow


window.addEventListener('load', () => {
	if (sessionStorage["pageToShow"]) {
		pageToShow = sessionStorage.getItem('pageToShow')
		addRendered(document.getElementById(pageToShow))
	} else {
		addRendered(volumePage)
		rememberPage('volumePage')
		$('#volumePage').hide().fadeIn(500);
	}
})


volumePageLink.addEventListener('click', () => {
	hideRendered()
	addRendered(volumePage)
	rememberPage('volumePage')
	$('#volumePage').hide().fadeIn(500);
})


chartPageLink.addEventListener('click', () => {
	hideRendered()
	addRendered(chartPage)
	rememberPage('chartPage')
	$('#chartPage').hide().fadeIn(500);
})


/*unitedChartLink.addEventListener('click', () => {
	hideRendered()
	addRendered(unitedChartPage)
	rememberPage('unitedChartPage')
	$('#unitedChartPage').hide().fadeIn(500);
})*/


//Функция выбирает текущий отрендеренный html, прячет его и убирает класс rendered, чтобы его можно было присвоить тому html, что встал на место скрытого
function hideRendered() {
	document.querySelector('.rendered').classList.add('hide')
	document.querySelector('.rendered').classList.remove('rendered')
}


//Принимает в качестве аргумента элемент html, который нужно в данный момент отобразить и задаёт ему соответствующий класс rendered
function addRendered($el) {
	$el.classList.remove('hide')
	$el.classList.add('rendered')
}


//Сохранение id текущей страницы в sessionStorage, чтобы при обновлении страницы браузера приложение открывалось на той странице, где в последний раз был юзер
function rememberPage(id) {
	sessionStorage.setItem('pageToShow', id)
}
