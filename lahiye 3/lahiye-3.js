let exchan1 = document.querySelectorAll('.MainSection .Left-Side .Selection label');
let exchan2 = document.querySelectorAll('.MainSection .Right-Side .Selection label');
let inputTo = document.querySelector('.to');
let inputFrom = document.querySelector('.from');
let ParagraphFrom = document.querySelector('.ff');
let ParagraphTo = document.querySelector('.ee');
var currency1 = document.getElementById('RUB1').value;
var currency2 = document.getElementById('USD2').value;

eventListeners();
function eventListeners() {
    inputFrom.addEventListener("keyup", checkDataByFrom);
    inputTo.addEventListener("keyup", checkDataByTo);
}

exchan1.forEach((select) => {
    select.addEventListener('click', (e) => {
        currency1 = e.target.innerText
        console.log(currency1)
        checkDataByTo()
    })
})
exchan2.forEach((select) => {
    select.addEventListener('click', (e) => {
        currency2 = e.target.innerText
        console.log(currency2)
        checkDataByFrom()
    })
})

async function checkDataByFrom() {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${currency1}&symbols=${currency2}`)
        .catch(err => {
            alert('Access Denied')


        });
    const data = await res.json();
    inputTo.value = (Object.values(data.rates)[0] * inputFrom.value).toFixed(2);
    if (currency1 && currency2) {
        ParagraphFrom.innerHTML = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(5)} ${Object.keys(data.rates)}`;
        ParagraphTo.innerHTML = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(5)} ${data.base}`;
    }
}
async function checkDataByTo() {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${currency1}&symbols=${currency2}`).catch(err => alert('Acess Denied'));
    const data = await res.json();
    inputTo.value = (Object.values(data.rates)[0] * inputFrom.value).toFixed(2);
    if (currency1 && currency2) {
        ParagraphFrom.innerHTML = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(5)} ${Object.keys(data.rates)}`;
        ParagraphTo.innerHTML = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(5)} ${data.base}`;
    }
}