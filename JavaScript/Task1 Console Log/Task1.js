alert("It works");
//Задание 1. Работа с консолью. 
//Вывести в консоль числа от 10 до 20 включительно.
for (let i = 10; i <= 20; i++){
    console.log(i);
}

//Доработайте скрипт таким образом, чтобы в консоль выводились квадраты чисел от 10 до 20. 
for (let i = 10; i <= 20; i++){
    console.log(Math.pow(i,2));
}

//Доработайте скрипт таким образом, чтобы в консоль выводились сумма всех чисел от 10 до 20.
function countSum(start, fin){
    let sum = 0;
    for (let i = start; i <= fin; i++){
        sum += i;
    }
    return sum;
}
console.log(countSum(10, 20));