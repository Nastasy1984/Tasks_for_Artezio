const start = document.getElementById("start");
const gameArea = document.getElementById("gameArea");
const arrDivs = document.getElementsByClassName("card");
const name = document.getElementById("name");

//переменная для хранения предыдущей выбранной карты
let cardPrev = null;
//переменная для подсчета исчезнувших карт
let countDissapeared = 0;

//создаем класс - шаблон для каждой карты со строкой для установки картинки и числовым id
class Card {
    constructor(picture, id) {
        //простая проверка на правильность ввода данных
        if (typeof picture !== "string" || Number.isNaN(id)){
            console.log("Wrong input");
            return false;
        }
        this.picture = picture;
        this.id = id;
        this.dissapeared = false;
        this.div = null;
    }
}

//создаем массив из карт с текстом для установления картинки в div и id
const arrCards = [];

arrCards.push(new Card("<img src=\"01.png\">", 1));
arrCards.push(new Card("<img src=\"01.png\">", 1));
arrCards.push(new Card("<img src=\"02.png\">", 2));
arrCards.push(new Card("<img src=\"02.png\">", 2));
arrCards.push(new Card("<img src=\"03.png\">", 3));
arrCards.push(new Card("<img src=\"03.png\">", 3));
arrCards.push(new Card("<img src=\"04.png\">", 4));
arrCards.push(new Card("<img src=\"04.png\">", 4));
arrCards.push(new Card("<img src=\"05.png\">", 5));
arrCards.push(new Card("<img src=\"05.png\">", 5));
arrCards.push(new Card("<img src=\"06.png\">", 6));
arrCards.push(new Card("<img src=\"06.png\">", 6));
arrCards.push(new Card("<img src=\"07.png\">", 7));
arrCards.push(new Card("<img src=\"07.png\">", 7));
arrCards.push(new Card("<img src=\"08.png\">", 8));
arrCards.push(new Card("<img src=\"08.png\">", 8));

//назначаем функцию кнопке старт - выводим обложки на экран и перемешиваем массив карт
start.onclick = onClickStart;

function onClickStart(){
    //создаем пустые div'ы для карточек с картинкой обложки
    gameArea.innerHTML = "";
    for(let i = 0; i < 16; i++){
        let tmpDiv = document.createElement('div');
        tmpDiv.className = "card";
        tmpDiv.innerHTML = "<img src=\"card.png\">";
        gameArea.appendChild(tmpDiv);
    }
    //перемешиваем массив с картами
    shakeArr(arrCards);
    //let arrDivs = document.getElementsByClassName("card");

    for(let i = 0; i < 16; i++){
        arrCards[i].div = arrDivs[i];
        //присваиваем функцию onclick всем дивам
        arrCards[i].div.onclick = function(){
            onClickDiv(i);
        };
    }
}

//функция для перемешивания массива карт
function shakeArr(arr){
    //простая проверка на случай, если в функцию передан не массив
    if ((!Array.isArray(arr))){
        return null; 
    }
	for (let i = 0; i < arr.length; i++)
	{
		let j =  randomInteger(arr.length - 1);//случайное число в рамках массива
		let t = arr[i];//временной переменной присваиваем i - тое значение
		arr[i] = arr[j];//i-той переменной присваиваем значение переменной на j-той позиции
		arr[j] = t;//j той переменной присваиваем бывшее значение i-той
    }
    return arr;
}

//функция для нахождения целого случайного числа в диапазоне от 0 до max
function randomInteger(max) {
    var rand = 0 + Math.random() * (max + 1);
    rand = Math.floor(rand);
    return rand;
  }

//функция получает порядковый номер div'a в массиве, чтобы обращаться к нему
function onClickDiv(n){
    //если карта уже была убрана (кликнули по пустому месту), ничего не происходит
    if(true === arrCards[n].dissapeared){
        return;
    }

    //если ни одна карта до этого не была выбрана
    if (null === cardPrev){
        //показываем эту карту пользователю
        arrCards[n].div.innerHTML = arrCards[n].picture;
        //присваиваем значение дива переменной для хранения первой из пары выбранных карт
        cardPrev = arrCards[n];
        return;
    }

    //еще одна "защита от дурака" - если пользователь нажал на ту же карту
    if (arrCards[n] === cardPrev){
        return;
    }

    //если первая карта из пары уже была выбрана
    //показываем выбранную карту пользователю
    arrCards[n].div.innerHTML = arrCards[n].picture;
    //сравниваем карты в паре по id, если они совпали, убираем карты 
    if (cardPrev.id === arrCards[n].id){
        //вводим временную переменную, чтобы скрипт не "ломался" (из-за обнуления cardPrev с задержкой) если пользователь
        //кликнул на другую карту раньше, чем выполнилась функция в блоке setTimeout
        tmp1 = cardPrev;
        cardPrev = null;
        setTimeout(function()
        {
            //делаем обе карты невидимыми на экране с небольшой задержкой
            arrCards[n].div.innerHTML = "";
            tmp1.div.innerHTML = "";
            //устанавливаем маркер исчезновения на обе карты
            arrCards[n].dissapeared = true;
            tmp1.dissapeared = true;
            tmp1 = null;
            //добавляем к переменной для подсчета исчезнувших карт 2 
            countDissapeared += 2;
            if (arrCards.length === countDissapeared){
                win();
            }
        }, 500);
    }

    //карты в паре не совпали
    else{
        //вводим временную переменную, чтобы скрипт не "ломался" (из-за обнуления cardPrev с задержкой) если пользователь
        //кликнул на другую карту раньше, чем выполнилась функция в блоке setTimeout
        tmp2 = cardPrev;
        cardPrev = null;
        //закрываем карты на экране с небольшой задержкой 
        setTimeout(function()
            {   
                tmp2.div.innerHTML = "<img src=\"card.png\">";
                arrCards[n].div.innerHTML = "<img src=\"card.png\">";
                tmp2 = null;
            }, 500);
    }
}

function win(){
    gameArea.innerHTML = "";
    let tmpDivWin = document.createElement('div');
    tmpDivWin.id = "winText";
    tmpDivWin.innerHTML = "<img src=\"win.png\">";
    //tmpDivWin.innerText = "Победа! Вы поймали удачу за хвост!";
    gameArea.appendChild(tmpDivWin);
    tmpDivWin = document.createElement('div');
    tmpDivWin.className = "btn";
    gameArea.appendChild(tmpDivWin);
    tmpDivWin.appendChild(start);
    clearVariables();
}

function clearVariables(){
    for (let i = 0; i < arrCards.length; i++)
	{
        arrCards[i].dissapeared = false;
        countDissapeared = 0;
    }
}