"use strict"

const containers = document.querySelectorAll(".container");
const start = document.querySelector(".start");
const board = document.querySelector("#board");
const imgRandom = [
"img/1.png", 
"img/2.png",
"img/3.png",
"img/4.png",
"img/5.png"];
let imgsTop;
let imgsReverse;
let imgsBottom;
let sumImgs;


//Перемешиваем картинки для карт
function ramdomImgCards (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        //Деструктуризация массива (меняем местами img по индексу)
        [arr[i], arr[j]] = [arr[j], arr[i]];  
    }
    return arr;
}

imgsTop = JSON.parse(JSON.stringify(ramdomImgCards(imgRandom))); // 5 верхних карточек
imgsReverse = imgRandom.reverse();
imgsBottom = JSON.parse(JSON.stringify(ramdomImgCards(imgsReverse))); // 5 нижних карточек
sumImgs = [...imgsTop,...imgsBottom]; // объеденяем в один массив
let activeCards = []; // массив блоков карт
let hasFlippedCard = false; 
let activeCard; // Псевдомассив с картами
let oneCard; // первая карта которую перевернули
let twoCard;// вторая карта которую перевернули
let f = []; // массив куда помещяются перевернутые карты
let count = 0;// счетчик успешных совпадений карт

// Начало игры
function startGame() {
    start.addEventListener("click", () => {
            ramdomImgCards (sumImgs);
            createCard ();
            containers[0].classList.add("up");
            containers[1].style.flexDirection = "row";
            containers[1].classList.remove("up");
            count = 0;
    });
}
startGame();
// Создаем карты на доске
function createCard () {
    sumImgs.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card","noactive");
        let img = document.createElement("img");
        img.src = item;
        img.setAttribute("data-num",item.match(/\d/));
        containers[1].append(card);
        card.append(img);
    });
    activeCard = document.querySelectorAll(".card");
    activeCards = [...activeCard];
    console.log( activeCards);
    return activeCards;
    
}
// Перевороачиваем карты и ищем совпадения
function flipCard(e) {
    changeActive(e.target);

    if (!hasFlippedCard && e.target.classList.contains("noactive")) {
        hasFlippedCard = true;
        oneCard = e.target;
        f.push(oneCard);
        return;
    }
    if(hasFlippedCard && e.target.classList.contains("noactive")){
        twoCard = e.target;
        hasFlippedCard = false;
        f.push(twoCard);
    }
    
    if(f.length === 2){
        activeCards.forEach(i => {
            i.classList.add("no-click");
        });
    }
    f = [];
    
    if (oneCard.childNodes[0].dataset.num === twoCard.childNodes[0].dataset.num) {
        oneCard.classList.add("succeed");
        twoCard.classList.add("succeed");
        count += 2;
        setTimeout(() => {
            activeCards.forEach(i => {
                i.classList.remove("no-click");  
            });
        },1000);
    }else{
        activeCards.forEach(i => {
            setTimeout(() => {
            i.classList.remove("active", "no-click");
            },1000);
        });   
    }
    if(count === activeCards.length){
        finishGame(); 
    } 
 }
 // переворачиваем карту
 function changeActive (item) {
    if(!item.classList.contains("noactive") ){
        return item; 
    }else{
        item.classList.add("active");  
    }
 }
// Выводим снопку для рестарта игры
 function finishGame() {
   const finishMassege = document.createElement("div");
    finishMassege.classList.add("massege");
    finishMassege.innerHTML = "Winner!!!";
    containers[1].append(finishMassege);
    finishMassege.addEventListener("click", () => {
        while (containers[1].firstChild) {
                containers[1].removeChild(containers[1].firstChild);
            }
            containers[0].classList.remove("up");
            containers[1].classList.add("up");
            f = [];
            count = 0;
            activeCards = [];
            finishMassege.remove();   
        });     
 }

//Обработчик на переворот карт
containers[1].addEventListener("click", flipCard);