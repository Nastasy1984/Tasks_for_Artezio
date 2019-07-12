//все диапазоны считаются включая x1 и x2
function btnRun(){
    let x1 = document.getElementById('x1').value;
    let x2 = document.getElementById('x2').value;

    //проверка на корректность ввода
    if(x1 == "" || x2 == ""){
        alert("Поля x1 и x2 должны быть заполнены")
    } 
    else if(Number.isNaN(+x1) || Number.isNaN(+x2)) {
        alert("В поля x1 и x2 должны быть введены числовые значения")
    } 
    else {
        let result = document.getElementById("result");
        //result.style.fontSize = "15pt";
        result.style.background = "white";
        result.style.color = "black";
        result.value = "";
        result.innerText = result.value;

        //реализуем вариант с минимумом и максимумом, чтобы скрипт работал корректно и в случае ввода X1 больше X2
        let max = 0;
        let min = 0;
        if ((+x1) <= (+x2)){
            min = parseInt(x1);
            max = parseInt(x2);
        }
        else{
            min = parseInt(x2);
            max = parseInt(x1);
        }

        //в зависимости от выбора пользователя реализуем один из 3 вариантов подсчета
        let arrRadio = document.getElementsByName("choice");
        //вариант с суммой всех целых в диапазоне
        if(arrRadio[0].checked){
            let sum = 0;
            for(let i = min; i <= max; i++){
                sum += i;
                //если число получается слишком большое для корректного вывода, останавливаем цикл, чтобы не расходовать ресурсы
                if ((sum > 1000000000000000) || (sum < -1000000000000000)){                                   
                    break;
                }
            }
            result.value = sum;
            //проверяем не слишком ли большое число получилось для корректного вывода
            if ((result.value > 1000000000000000)|| (result.value < -1000000000000000)){
                result.innerText = ("Сумма целых чисел от " + min + " до " + max + " слишком длинное число");
            }
            else{
                result.innerText = ("Сумма целых чисел от " + min + " до " + max + " = " + result.value);
            }
        }
        //вариант с произведением всех целых в диапазоне
        else if(arrRadio[1].checked){
            let mult = 1;
            //если одно число меньше, а другое больше 0, то произведение всех чисел между ними всегда будет 0,
            //т.к. будет умножение на 0, поэтому для этого случая нет смысла запускать цикл, можно сразу выдать ответ
            if ((min <= 0) && (max >= 0)){
                mult = 0;
            }
            else{
                for(let i = min; i <= max; i++){
                    mult *= i;
                    //если число получается слишком большое для корректного вывода, останавливаем цикл, чтобы не расходовать ресурсы
                    if ((mult > 1000000000000000) || (mult < -1000000000000000)){
                        break;
                    }
                }
            }
            result.value = mult;
            //проверяем не слишком ли большое число получилось для корректного вывода
            if ((result.value > 1000000000000000)|| (result.value < -1000000000000000)){
                result.innerText = ("Произведение целых чисел от " + min + " до " + max + " слишком длинное число");
            }
            //поясняем пользователю, откуда взялся 0 в ответе на случай проблем с математикой :)
            else if (result.value === 0){
                result.innerText = ("Произведение целых чисел от " + min + " до " + max + " = " + result.value + " т.к. в диапазоне есть 0");
            }
            else{
                result.innerText = ("Произведение целых чисел от " + min + " до " + max + " = " + result.value);
            }
        }
        //вариант с выводом всех простых чисел в диапазоне
        else{
            result.value = getAllSimple(min, max);
            //если вернулся диапазон, а не строка с отказом или одно число в случае равенства введенных двух простых чисел, 
            //то приводим его в вид строки для установки запятых и пробелов между цифрами и переноса строк
            if ((typeof result.value != "string") && (typeof result.value != "number")){
                strRes = "";
                for (let i = 0; i < result.value.length; i++){
                    strRes += result.value[i] + ", ";
                }
                //убираем последнюю запятую
                result.innerText = strRes.substring(0, (strRes.length-2));
                //выходим из функции
                return;
            }
            //если вернулась строка с отказом, печатаем эту строку
            result.innerText = result.value;
        }
    }
}

//функия для кнопки clear
function btnClear(){
    document.getElementById('x1').value = "";
    document.getElementById('x2').value = "";
}

//Реализуйте алгоритм нахождения простых чисел в промежутке от X1 до X2. 
//Натуральное число, большее 1, называется простым, если оно ни на что не делится, 
//кроме себя и 1. Т.е. если x1=2, а x2=10, результат должен быть: 2, 3, 5, 7. 

function getAllSimple(min, max){
    let strNo = "Простых чисел нет";
    //если передали два равных числа и они простые
    if (min === max){
        if ((min >= 1) && (isSimple(min))){
            return min;
        }
        //если передали два равных числа и они не простые
        else{
            return strNo;
        }
    }
    let arr = [];
    for (let i = min; i <= max; i++){
        if ((i >= 1) && (isSimple(i))){
            arr.push(i);
            //чтобы страница не зависала, оставляем диапазон в разумных пределах (можно поменять в зависимости от назначения программы)
            //при достижении этого предела завершаем цикл и покидаем функцию
            if (arr.length >= 1000){
                return "Слишком большой диапазон";
            }
        }
    }
    //если получили массив из простых чисел в диапазоне и не вышли по условию о слишком большом диапазоне ранее
    if ((arr.length > 0)){
        return arr;  
    }
    //во всех остальных случаях, если нет простых чисел
    return strNo;
}


//функция для проверки одного числа, простое ли оно
function isSimple(num){
    //проверяем, корректное ли значение передали
    if ((isNaN(num)) || (num <=1)){
        return false;
    }
    //для 2 сразу возвращаем true
    if (2 === num){
        return true;
    }
    //для прочих чисел проводим проверку до квадратного корня, при нахождении делителя, возвращаем false
    for (let i = 2; i <= Math.sqrt(num); i++){
        if (num % i === 0){
            return false
        }
    }
    return true;
}