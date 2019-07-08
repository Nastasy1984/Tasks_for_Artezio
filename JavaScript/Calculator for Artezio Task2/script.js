//const x1 = document.getElementById('x1');
//const x2 = document.getElementById('x2');


function btnRun(){
    let x1 = document.getElementById('x1').value;
    let x2 = document.getElementById('x2').value;

    if(x1 == "" || x2 == ""){
        alert("Поля x1 и x2 должны быть заполнены")
    } else if(Number.isNaN(+x1) || Number.isNaN(+x2)) {
        alert("В поля x1 и x2 должны быть введены числовые значения")
    } else {
        let result = document.getElementById("result");
        result.value = "";
        result.innerText = result.value;
        let max = 0;
        let min = 0;
        if ((+x1) <= (+x2)){
            min = +x1;
            max = +x2;
        }
        else{
            min = +x2;
            max = +x1;
        }
        let arrRadio = document.getElementsByName("choice");
        if(arrRadio[0].checked){
            let sum = 0;
            for(let i = min; i <= max; i++){
                sum += i;
            }
            result.value = sum;
            //проверяем не слишком ли большое число получилось для корректного вывода
            if ((result.value > 1000000000000000)|| (result.value < -1000000000000000)){
                result.innerText = ("Сумма всех чисел от " + x1 + " до " + x2 + " = " + "слишком длинное число");
            }
            else{
                result.innerText = ("Сумма всех чисел от " + x1 + " до " + x2 + " = " + result.value);
            }
        }
        else if(arrRadio[1].checked){
            let mult = 1;
            for(let i = min; i <= max; i++){
                mult *= i;
            }
            result.value = mult;
            //result.innerText = ("Произведение всех чисел от " + x1 + " до " + x2 + " = " + result.value);
            if ((result.value > 1000000000000000)|| (result.value < -1000000000000000)){
                result.innerText = ("Произведение всех чисел от " + x1 + " до " + x2 + " = " + "слишком длинное число");
            }
            else{
                result.innerText = ("Произведение всех чисел " + x1 + " до " + x2 + " = " + result.value);
            }
        }
        else{
            result.value = getAllSimple(min, max);
            result.innerText = result.value;
        }

    }
    result.style.background = "white";
    result.style.color = "black";
}

function btnClear(){
    document.getElementById('x1').value = "";
    document.getElementById('x2').value = "";
}

function checkRadio(name)
{
    let arrRadio = document.getElementsByName(name);
    for (var i = 0; i < arrRadio.length; i++) {
        if (arrRadio[i].type == "radio" && arrRadio[i].checked) {
            alert("selected: " + inp[i].value);
        }
    }
}

//Реализуйте алгоритм нахождения простых чисел в промежутке от X1 до X2. 
//Натуральное число, большее 1, называется простым, если оно ни на что не делится, 
//кроме себя и 1. Т.е. если x1=2, а x2=10, результат должен быть: 2, 3, 5, 7. 

function getAllSimple(min, max){
    let strNo = "Простых чисел нет";
    if (min === max){
        if ((x1 >= 1) && (isSimple(x1))){
            return x1;
        }
        else{
            return strNo;
        }
    }
    let arr = [];

    for (let i = min; i <= max; i++){
        if ((i >= 1) && (isSimple(i))){
            arr.push(i);
        }
    }
    if ((arr.length > 0) && (arr.length < 23)){
        return arr;  
    }
    else if ((arr.length > 0) && (arr.length >= 23)){
        return "Слишком большой диапазон";  
    }
    return strNo;
}




//функция для проверки 1 числа, простое ли оно
function isSimple(num){
    //проверяем, корректное ли значение передали
    if ((isNaN(num)) || (num <=1)){
        return false;
    }
    //для 2 сразу возвращаем true
    if (2 === num){
        return true;
    }
    //для прочих чисел до квадратного корня проводим проверку, при нахождении делителя, возвращаем false
    for (let i = 2; i <= Math.sqrt(num); i++){
        if (num % i === 0){
            return false
        }
    }
    return true;
}