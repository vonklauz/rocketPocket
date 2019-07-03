//Запрет ввода любых символов, кроме цифр, точек и запятых
$('.number_input').on('keypress', function (e) {
	if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
		return false
	}
});

//Авторазбивка введённых чисел по числу нулей
$('.number_input').on('input', function (e) {
	let $sum = $(this).val().replace(/ /g, '')
	$sum = $sum.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
	$(this).val($sum)

});


