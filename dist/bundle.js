!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){$(".number_input").on("keypress",function(e){if(8!=e.which&&0!=e.which&&46!=e.which&&(e.which<48||e.which>57))return!1}),$(".number_input").on("input",function(e){let t=$(this).val().replace(/ /g,"");t=t.replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "),$(this).val(t)})},function(e,t){document.getElementById("app__header"),document.querySelector(".app__main"),document.getElementById("app__h1");const n=document.getElementById("volumePage"),r=document.getElementById("volumePageLink"),a=document.getElementById("chartPage"),o=document.getElementById("chartPageLink"),l=document.getElementById("unitedChartLink"),d=document.getElementById("unitedChartPage");let s;function c(){document.querySelector(".rendered").classList.add("hide"),document.querySelector(".rendered").classList.remove("rendered")}function i(e){e.classList.remove("hide"),e.classList.add("rendered")}function u(e){sessionStorage.setItem("pageToShow",e)}window.addEventListener("load",()=>{sessionStorage.pageToShow?(s=sessionStorage.getItem("pageToShow"),i(document.getElementById(s))):(i(n),u("volumePage"),$("#volumePage").hide().fadeIn(500))}),r.addEventListener("click",()=>{c(),i(n),u("volumePage"),$("#volumePage").hide().fadeIn(500)}),o.addEventListener("click",()=>{c(),i(a),u("chartPage"),$("#chartPage").hide().fadeIn(500)}),l.addEventListener("click",()=>{c(),i(d),u("unitedChartPage"),$("#unitedChartPage").hide().fadeIn(500)})},function(e,t,n){"use strict";n.r(t);n(0),n(1);function r(){let e=[];if(localStorage.length>0){let t=Object.keys(localStorage);for(let n=0;n<t.length;n++)t[n].indexOf("variant")>-1&&e.push(JSON.parse(localStorage.getItem(t[n])))}return e}function a(e,t){let n;if(e.length>0){(n=document.createElement("option")).value=null,n.textContent="Выберите вариант финансирования",t.appendChild(n),e.sort((e,t)=>+e.key.slice(7)-+t.key.slice(7));for(let r=0;r<e.length;r++)(n=document.createElement("option")).value=r,n.textContent="Вариант финансирования "+(r+1),t.appendChild(n)}else(n=document.createElement("option")).textContent="В базе данных отсутствуют сохранённые объекты.",t.appendChild(n);return e}function o(e){e.innerHTML=""}function l(e){const t=document.querySelector(".chartPage__wrapper__chart_options"),n=document.querySelector(".chart_options__set_period__wrapper"),r=document.querySelector(".chart_options__add_cash__wrapper"),a=document.querySelector(".chart_page__table__wrapper");t.classList.remove("hide"),e.periods.length>0?(n.classList.add("hide"),r.classList.remove("hide"),a.classList.remove("hide")):(n.classList.remove("hide"),r.classList.add("hide"),a.classList.add("hide"))}function d(e,t,n,r,a,o,l){let d,s,c=r+" "+a;if(a){if(d=l.indexOf(c),"-"==o){if(s=-1*+n.replace(/ /g,""),e[t].currentBalance-s>e[t].defaultBalance)return void alert("Превышен изначальный объём финансирования указанного источника. Введите меньшую сумму.");if(e[t].changesArr[d]<-1*s)return void alert("Введённое число превышает вложенный объём средств в выбранном периоде.")}else s=+n.replace(/ /g,"");if(d>=0)if(s<=e[t].currentBalance){e[t].currentSpended+=s;for(let n=d;n<l.length;n++)e[t].changesArr[n]?e[t].changesArr[n]+=s:e[t].changesArr[n]=s;e[t].currentBalance-=s,"revenue"!=t&&(document.getElementById(t+"Chart").value=String(e[t].currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "))}else alert("Введённая сумма превышает остаток данного источника.");else alert("Указанная дата не входит в период строительства.")}else alert("Укажите год")}function s(e){function t(e){let t=0;return e>=0?t=e:t}for(let n=0;n<e.periods.length;n++)e.currentDepositedSumChangesArr[n]=0,e.currentDepositedSumChangesArr[n]+=t(e.ownCash.changesArr[n])+t(e.bankCredit.changesArr[n])+t(e.escrowResource.changesArr[n])+t(e.investorA.changesArr[n])+t(e.investorB.changesArr[n])}function c(e){localStorage.setItem(e.key,JSON.stringify(e))}function i(e,t){let n;const r=document.getElementsByClassName("chosen_var"),a=document.querySelector(".app__main__form");if(1*e.value==+e.value){let o=+e.value;(n=t[o])?(l(n),r[0].textContent="Вариант финансирования "+(o+1),r[1].textContent="Вариант финансирования "+(o+1),$("#totalValueChart").val(String(n.totalValue.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")).hide().fadeIn(500),$("#ownCashChart").val(String(n.ownCash.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")).hide().fadeIn(500),$("#bankCreditChart").val(String(n.bankCredit.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")).hide().fadeIn(500),$("#escrowResourceChart").val(String(n.escrowResource.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")).hide().fadeIn(500),$("#investorAChart").val(String(n.investorA.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")).hide().fadeIn(500),$("#investorBChart").val(String(n.investorB.currentBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")).hide().fadeIn(500),$("#deficiteSumChart").val(String(n.deficite).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")).hide().fadeIn(500),a.totalValue.value=String(n.totalValue.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "),a.ownCash.value=String(n.ownCash.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "),a.bankCredit.value=String(n.bankCredit.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "),a.escrowResource.value=String(n.escrowResource.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "),a.investorA.value=String(n.investorA.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "),a.investorB.value=String(n.investorB.defaultBalance).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 "),a.deficiteSum.value=String(n.defificte).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")):(r[0].textContent="Вариант финансирования не выбран ",r[1].textContent="Вариант финансирования не выбран ")}return n}function u(e){p(revenueChartWrapper),revenueChartWrapper.innerHTML='<canvas id="chartPageRevenueChart"></canvas>';let t=document.getElementById("chartPageRevenueChart");new Chart(t,{type:"line",data:{labels:e.repaymentPeriods,datasets:[{label:"Текущий объём выручки (план)",fill:!1,lineTension:0,steppedLine:!0,backgroundColor:"rgba(99, 99, 199, .2)",borderColor:"rgb(99, 199, 99)",data:e.revenue.changesArr}]},options:{elements:{point:{radius:3}},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});localStorage.setItem(e.key,JSON.stringify(e))}function g(e){p(chartWrapper),chartWrapper.innerHTML='<canvas id="chartPageChart"></canvas>';let t=document.getElementById("chartPageChart");new Chart(t,{type:"line",data:{labels:e.periods,datasets:[{label:"Общий объём финансирования (план)",fill:!1,lineTension:0,steppedLine:!0,backgroundColor:"rgba(255, 99, 132, .2)",borderColor:"rgb(255, 99, 132)",data:e.totalValue.changesArr},{label:"Текущий объём затрат",backgroundColor:"rgba(0, 0, 0, 0.2)",lineTension:0,fill:!1,steppedLine:!0,borderColor:"rgb(0, 0, 0)",data:e.currentDepositedSumChangesArr},{label:"Собственные средства",backgroundColor:"rgba(255, 99, 132, 0.1)",steppedLine:!0,borderColor:"rgb(255, 99, 132)",data:e.ownCash.changesArr},{label:"Кредит банка под залог",backgroundColor:"rgba(54, 162, 235, 0.2)",steppedLine:!0,borderColor:"rgb(54, 162, 235)",data:e.bankCredit.changesArr},{label:"Кредит банка / эскроу ресурс",backgroundColor:"rgba(255, 206, 86, 0.2)",steppedLine:!0,borderColor:"rgb(255, 206, 86)",data:e.escrowResource.changesArr},{label:'Инвестор категории "А"',backgroundColor:"rgba(125, 192, 192, 0.2)",steppedLine:!0,borderColor:"rgb(125, 192, 192)",data:e.investorA.changesArr},{label:'Инвестор категории "B"',backgroundColor:"rgba(153, 102, 255, 0.2)",steppedLine:!0,borderColor:"rgb(153, 102, 255)",data:e.investorB.changesArr}]},options:{elements:{point:{radius:3}},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});e.chart=!0,localStorage.setItem(e.key,JSON.stringify(e))}function h(e){p(costsAndRevenueChartWrapper),costsAndRevenueChartWrapper.innerHTML='<canvas id="chartPageCostsChart"></canvas>';let t=document.getElementById("chartPageCostsChart");new Chart(t,{type:"line",data:{labels:e.repaymentPeriods,datasets:[{label:"Общий объём финансирования (план)",fill:!1,lineTension:0,steppedLine:!0,backgroundColor:"rgba(255, 99, 132, .2)",borderColor:"rgb(255, 99, 132)",data:e.totalValue.changesArr},{label:"Текущий объём затрат",backgroundColor:"rgba(0, 0, 0, 0.2)",lineTension:0,fill:!1,steppedLine:!0,borderColor:"rgb(0, 0, 0)",data:e.currentDepositedSumChangesArr},{label:"Собственные средства",backgroundColor:"rgba(255, 99, 132, 0.1)",steppedLine:!0,borderColor:"rgb(255, 99, 132)",data:e.ownCash.changesArr},{label:"Кредит банка под залог",backgroundColor:"rgba(54, 162, 235, 0.2)",steppedLine:!0,borderColor:"rgb(54, 162, 235)",data:e.bankCredit.changesArr},{label:"Кредит банка / эскроу ресурс",backgroundColor:"rgba(255, 206, 86, 0.2)",steppedLine:!0,borderColor:"rgb(255, 206, 86)",data:e.escrowResource.changesArr},{label:'Инвестор категории "А"',backgroundColor:"rgba(125, 192, 192, 0.2)",steppedLine:!0,borderColor:"rgb(125, 192, 192)",data:e.investorA.changesArr},{label:'Инвестор категории "B"',backgroundColor:"rgba(153, 102, 255, 0.2)",steppedLine:!0,borderColor:"rgb(153, 102, 255)",data:e.investorB.changesArr},{label:"Текущий объём выручки (план)",fill:!1,lineTension:0,steppedLine:!0,backgroundColor:"rgba(99, 99, 199, .2)",borderColor:"rgb(99, 199, 99)",data:e.revenue.changesArr}]},options:{elements:{point:{radius:3}},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}function p(e){e.innerHTML=""}function m(e="select",t){const n=document.getElementById("checkBoxes");return"select"==e?(t?(n.classList.add("hide"),t=!1):(n.classList.remove("hide"),t=!0),t):(n.classList.add("hide"),t=!1)}!function(){const e=document.getElementById("chartPageLink"),t=document.getElementById("chartPageSelect"),n=document.getElementById("chartWrapper"),m=document.getElementById("deleteVariant"),f=document.getElementById("setBuildingPeriodButton"),b=document.getElementById("enterCashButton"),v=document.getElementById("removeCashButton"),C=document.getElementById("chartPageTable"),y=document.getElementById("revenueChartWrapper"),B=document.getElementById("enterRevenueCashButton"),A=document.getElementById("removeRevenueCashButton");document.getElementById("costsAndRevenueChartWrapper");let k,I=!1;function _(e){e.innerHTML="";let t=`\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>Источник:</th>\n\t\t\t\t\t\t\t<th class="bankTd">Кредит банка под залог</th>\n\t\t\t\t\t\t\t<th class="escrowTd">Кредит банка / эксроу ресурс</th>\n\t\t\t\t\t\t\t<th class="investorATd">Инвестор категории "А"</th>\n\t\t\t\t\t\t\t<th class="investorBTd">Инвестор категории "В"</th>\n\t\t\t\t\t\t\t<th>Сумма ежемесячных выплат по %</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>Ставка, %:</th>\n\t\t\t\t\t\t\t<th class="bankTd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="bankInstallment" maxlength="4" value="${I.bankCredit.interestRate}"></th>\n\t\t\t\t\t\t\t<th class="escrowTd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="escrowInstallment" maxlength="4" value="${I.escrowResource.interestRate}"></th>\n\t\t\t\t\t\t\t<th class="investorATd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="investorAInstallment" maxlength="4" value="${I.investorA.interestRate}"></th>\n\t\t\t\t\t\t\t<th class="investorBTd"><input type="text" class="input_wrapper__input add_cash__input table_input" id="investorBInstallment" maxlength="4" value="${I.investorB.interestRate}"></th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>Месяц</th>\n\t\t\t\t\t\t</tr>`;e.insertAdjacentHTML("afterbegin",t)}function L(e,t){if(e>0&&t>0){return(e/100*(t/12)).toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")}return 0}function E(e,t){if(e>0&&t>0){return e/100*(t/12)}return 0}function S(e,t,n){let r;return e>=0&&t>0?n+=r=e/100*(t/12):(n+=r=0,0)}window.addEventListener("load",()=>{o(t),k=a(k=r(),t),I||(I=i(t,k))}),e.addEventListener("click",()=>{o(t),k=a(k=r(),t),I||(I=i(t,k))}),t.addEventListener("change",()=>{I=i(t,k),_(C),1==I.chart?(g(I),u(I),_(C),function(e){let t=[e.totalValue.changesArr,e.ownCash.changesArr,e.bankCredit.changesArr,e.escrowResource.changesArr,e.investorA.changesArr,e.investorB.changesArr,e.currentDepositedSumChangesArr];for(let n=0;n<t.length;n++)for(let r=e.periods.length;r<e.repaymentPeriods.length;r++)t[n][r]=t[n][e.periods.length-1]}(I),h(I)):(p(n),p(y))}),m.addEventListener("click",()=>{!function(e){alert("Вариант удалён."),delete localStorage[e.key],window.location.reload()}(I)}),f.addEventListener("click",()=>{let e=+document.getElementById("StartOfPeriodMonth").value,t=+document.getElementById("StartOfPeriodYear").value,n=+document.getElementById("EndOfPeriodMonth").value,r=+document.getElementById("EndOfPeriodYear").value;I.firstMonth=e,I.firstYear=t,I.lastMonth=n,I.lastYear=r,I.periods=function(e,t,n,r){let a=[];const o=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];if(r<t)return alert("Введите корректную дату."),!1;function l(e,t){for(let n=0;n<e+1;n++)a.push(o[n]+" "+t)}if(t==r){for(let r=e;r<n+1;r++)a.push(o[r]+" "+t);return a}return function(e,t){for(let n=e;n<o.length;n++)a.push(o[n]+" "+t)}(e,t),r-t==1?l(n,r):r-t>1&&(function(e,t){for(;e<t;){for(let t=0;t<o.length;t++)a.push(o[t]+" "+e);e++}}(t+1,r),l(n,r)),a}(e,t,n,r),I.repaymentPeriods=function(e,t,n){const r=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];let a=e.slice(),o=t+1,l=t+7,d=6;if(t<=5)for(let e=o;e<l;e++)a.push(r[e]+" "+n);else{for(let e=o;e<12;e++)a.push(r[e]+" "+n),d--;for(let e=0;e<d;e++)a.push(r[e]+" "+(n+1))}return a}(I.periods,n,r),I.periods.length>0&&(!function(e){e.totalValue.changesArr.length=0;for(let t=0;t<e.periods.length;t++)e.totalValue.changesArr.push(e.totalValue.defaultBalance)}(I),l(I),c(I),g(I),u(I))}),b.addEventListener("click",()=>{d(I,document.getElementById("sourceOfIncome").value,document.getElementById("sumOfIncome").value,document.getElementById("monthOfIncome").value,document.getElementById("yearOfIncome").value,"+",I.periods),s(I),c(I),g(I)}),v.addEventListener("click",()=>{d(I,document.getElementById("sourceOfIncome").value,document.getElementById("sumOfIncome").value,document.getElementById("monthOfIncome").value,document.getElementById("yearOfIncome").value,"-",I.periods),s(I),c(I),g(I)}),B.addEventListener("click",()=>{d(I,"revenue",document.getElementById("sumOfRevenue").value,document.getElementById("monthOfRevenue").value,document.getElementById("yearOfRevenue").value,"+",I.repaymentPeriods),c(I),u(I)}),A.addEventListener("click",()=>{d(I,"revenue",document.getElementById("sumOfRevenue").value,document.getElementById("monthOfRevenue").value,document.getElementById("yearOfRevenue").value,"-",I.repaymentPeriods),c(I),u(I)}),document.getElementById("CountPercentPayments").addEventListener("click",()=>{I.bankCredit.interestRate=+document.getElementById("bankInstallment").value,I.escrowResource.interestRate=+document.getElementById("escrowInstallment").value,I.investorA.interestRate=+document.getElementById("investorAInstallment").value,I.investorB.interestRate=+document.getElementById("investorBInstallment").value;let e=0,t=0,n=0,r=0;localStorage.setItem(I.key,JSON.stringify(I)),_(C),$("#chartPageTable").hide().fadeIn(500);for(let a=0;a<I.periods.length;a++){e=S(I.bankCredit.changesArr[a],I.bankCredit.interestRate,e),t=S(I.escrowResource.changesArr[a],I.escrowResource.interestRate,t),n=S(I.investorA.changesArr[a],I.investorA.interestRate,n),r=S(I.investorB.changesArr[a],I.investorB.interestRate,r);let o=`<tr>\n\t\t\t\t\t\t<td class="monthTd">${I.periods[a]}</td>\n\t\t\t\t\t\t<td class="bankTd">${L(I.bankCredit.changesArr[a],I.bankCredit.interestRate)}</td>\n\t\t\t\t\t\t<td class="escrowTd">${L(I.escrowResource.changesArr[a],I.escrowResource.interestRate)}</td>\n\t\t\t\t\t\t<td class="investorATd">${L(I.investorA.changesArr[a],I.investorA.interestRate)}</td>\n\t\t\t\t\t\t<td class="investorBTd">${L(I.investorB.changesArr[a],I.investorB.interestRate)}</td>\n\t\t\t\t\t\t<td>${(E(I.bankCredit.changesArr[a],I.bankCredit.interestRate)+E(I.escrowResource.changesArr[a],I.escrowResource.interestRate)+E(I.investorA.changesArr[a],I.investorA.interestRate)+E(I.investorB.changesArr[a],I.investorB.interestRate)).toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")}</td>\n\t\t\t\t</tr>`;C.insertAdjacentHTML("beforeend",o)}let a=`<tr>\n\t\t\t\t\t\t<td>Итого по отдельным источникам:</td>\n\t\t\t\t\t\t<td class="bankTd">${e.toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")}</td>\n\t\t\t\t\t\t<td class="escrowTd">${t.toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")}</td>\n\t\t\t\t\t\t<td class="investorATd">${n.toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")}</td>\n\t\t\t\t\t\t<td class="investorBTd">${r.toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")}</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th></th>\n\t\t\t\t\t\t<th></th>\n\t\t\t\t\t\t<th class="totalTh">Итого по всем источникам:</th>\n\t\t\t\t\t\t<th>${(e+t+n+r).toFixed(0).replace(/(\d)(?=(\d{3})+(\D|$))/g,"$1 ")}</th>\n\t\t\t\t\t\t<th></th>\n\t\t\t\t\t\t<th></th>\n\t\t\t\t\t</tr>`;C.insertAdjacentHTML("beforeend",a)})}(),function(){const e=[],t=document.getElementById("unitedChartLink"),n=document.querySelector(".united_chart__chart_wrapper"),r=document.getElementById("checkBoxes"),a=document.querySelector(".selectBox"),o=document.getElementById("buildUnitedChart"),l=document.getElementById("reloadUnitedChart"),d=document.getElementById("deleteUnitedChart");let s,c=!1;function i(){if(e.length=0,localStorage.length>0){let t=Object.keys(localStorage);for(let n=0;n<t.length;n++)t[n].indexOf("variant")>-1&&e.push(JSON.parse(localStorage.getItem(t[n])))}}function u(){if(!(e.length>0))return!1;e.sort((e,t)=>+e.key.slice(e.key.length-1)-+t.key.slice(t.key.length-1));for(let t=0;t<e.length;t++){let e=`<label for="${"unitedChartCheckbox"+(t+1)}"><input type="checkbox" class="united_chart__checkbox" id="${"unitedChartCheckbox"+(t+1)}" value="${t}">Вариант финансирования ${t+1}</label>`;r.insertAdjacentHTML("beforeend",e)}}function g(){r.innerHTML=""}function h(e){for(let g=0;g<e.length;g++){if(0==e[g].periods.length)return void alert(`Невозможно построить график: необходимо задать период строительства варианту финансирования ${g+1} .`);{let g=[],h=[],m=[],f=[],b=[],v=[],C=[],y=[],B=[],A=[],k=[];function t(e){e.sort((e,t)=>e.firstYear-t.firstYear);for(let t=0;t<e.length;t++)e[t].firstYear==e[0].firstYear?g.push(e[t]):e[t].firstYear>e[0].firstYear&&e[t].firstYear<e[e.length-1].firstYear?h.push(e[t]):e[t].firstYear==e[e.length-1].firstYear&&m.push(e[t])}function r(e){e.sort((e,t)=>e.firstMonth-t.firstMonth)}function a(e){for(let t=0;t<e.length;t++)for(let n=0;n<e[t].periods.length;n++)-1==b.indexOf(e[t].periods[n])&&b.push(e[t].periods[n])}function s(e){let t;for(let n=0;n<e.length;n++)t=b.indexOf(e[n].periods[0]),i(e[n].totalValue,v,t),e[n].currentDepositedSumChangesArr.length>0&&c(e[n].currentDepositedSumChangesArr,f,t),e[n].ownCash.changesArr.length>0&&i(e[n].ownCash,C,t),e[n].bankCredit.changesArr.length>0&&i(e[n].bankCredit,y,t),e[n].escrowResource.changesArr.length>0&&i(e[n].escrowResource,B,t),e[n].investorA.changesArr.length>0&&i(e[n].investorA,A,t),e[n].investorB.changesArr.length>0&&i(e[n].investorB,k,t)}function c(e,t,n){let r=0;for(let a=n;a<b.length;a++)e[r]>=0?t[a]?t[a]+=e[r]:t[a]=e[r]:r>=e.length&&(t[a]?t[a]+=e[e.length-1]:t[a]=e[e.length-1]),r++}function i(e,t,n){let r=0;for(let a=n;a<b.length;a++)e.changesArr[r]>=0?t[a]>=0?t[a]+=e.changesArr[r]:t[a]=e.changesArr[r]:r>=e.changesArr.length&&(t[a]>=0?t[a]+=e.changesArr[e.changesArr.length-1]:t[a]=e.changesArr[e.changesArr.length-1]),r++}function u(){p(),n.innerHTML='<canvas id="unitedChartPageChart"></canvas>';let e=document.getElementById("unitedChartPageChart");new Chart(e,{type:"line",data:{labels:b,datasets:[{label:"Общий объём финансирования (план)",fill:!1,lineTension:0,steppedLine:!0,backgroundColor:"rgba(255, 99, 132, .2)",borderColor:"rgb(255, 99, 132)",data:v},{label:"Текущий объём затрат",backgroundColor:"rgba(0, 0, 0, 0.2)",lineTension:0,fill:!1,steppedLine:!0,borderColor:"rgb(0, 0, 0)",data:f},{label:"Собственные средства",backgroundColor:"rgba(255, 99, 132, 0.1)",steppedLine:!0,borderColor:"rgb(255, 99, 132)",data:C},{label:"Кредит банка под залог",backgroundColor:"rgba(54, 162, 235, 0.2)",steppedLine:!0,borderColor:"rgb(54, 162, 235)",data:y},{label:"Кредит банка / эскроу ресурс",backgroundColor:"rgba(255, 206, 86, 0.2)",steppedLine:!0,borderColor:"rgb(255, 206, 86)",data:B},{label:'Инвестор категории "А"',backgroundColor:"rgba(125, 192, 192, 0.2)",steppedLine:!0,borderColor:"rgb(125, 192, 192)",data:A},{label:'Инвестор категории "B"',backgroundColor:"rgba(153, 102, 255, 0.2)",steppedLine:!0,borderColor:"rgb(153, 102, 255)",data:k}]},options:{elements:{point:{radius:3}},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}document.querySelector(".main__united_chart__wrapper").classList.add("hide"),o.classList.add("hide"),l.classList.remove("hide"),d.classList.remove("hide"),t(e),r(g),a(g),h.length>0&&(r(h),a(h)),m.length>0&&(r(m),a(m)),s(g),h.length>0&&s(h),m.length>0&&s(m),u()}}}function p(){n.innerHTML=""}window.addEventListener("load",()=>{i(),g(),u()}),t.addEventListener("click",()=>{i(),g(),u()}),a.addEventListener("click",()=>{c=m("select",c)}),o.addEventListener("click",()=>{c=m("btn",c),h(s=function(){const t=document.getElementsByClassName("united_chart__checkbox"),n=[];for(let r=0;r<t.length;r++)1==t[r].checked&&n.push(e[+t[r].value]);return n}())}),l.addEventListener("click",()=>{h(s)}),d.addEventListener("click",()=>{p(),document.querySelector(".main__united_chart__wrapper").classList.remove("hide"),o.classList.remove("hide"),l.classList.add("hide"),d.classList.add("hide")})}(),console.log("Start")}]);