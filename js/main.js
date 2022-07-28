
const containers = document.querySelectorAll(".container");
const start = document.querySelector(".start");
const board = document.querySelector("#board");
const btnsLevel = document.querySelectorAll(".btns");
let imgs = [
"img/1.png", 
"img/2.png",
"img/3.png",
"img/4.png",
"img/5.png"];

let sumImgs;
//Уровень 1
function levelEasy(array){
    array = JSON.parse(JSON.stringify(imgs));
    sumImgs = [...array,...array.reverse()];
}
//Уровень 2
function levelNormal(array) {
    array = JSON.parse(JSON.stringify(imgs));
    array = [...array, "img/6.png", "img/7.png"];
    sumImgs = [...array,...array.reverse()];
}
//Уровень 3
function levelHard(array) {
    array = JSON.parse(JSON.stringify(imgs));
    array = [...array, "img/6.png", "img/7.png", "img/8.png"];
    sumImgs = [...array,...array.reverse()];
}

//Сообщение если уровень сложности не выбран
function massegeChoiceLevel (){
    const massegeLevel = document.createElement("div");
    massegeLevel.classList.add("level");
    massegeLevel.innerHTML ="Выберите уровень сложности";
    containers[0].append(massegeLevel);
}
function massegeChoiceLevelHide(){
    let mass = document.querySelector(".level");
    mass.classList.remove("level");
}

//Кнопки выбора уровня сложности
function choiceLevel () {
    btnsLevel.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if(e.target && e.target.dataset.level === "1" ){
                massegeChoiceLevelHide()
                levelEasy();
                board.style.maxWidth ="650px";
            }else if(e.target && e.target.dataset.level === "2" ){
                massegeChoiceLevelHide()
                levelNormal();
                board.style.maxWidth ="850px";
            }else {
                massegeChoiceLevelHide()
                levelHard();
                board.style.maxWidth ="960px";
            } 
        });  
    });
}
choiceLevel ();
//Перемешиваем картинки для карт
function ramdomImgCards (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        //Деструктуризация массива (меняем местами img по индексу)
        [arr[i], arr[j]] = [arr[j], arr[i]];  
    }
    return arr;
}
 // объеденяем в один массив
let activeCards = []; // массив блоков карт
let hasFlippedCard = false;
let oneCard; // первая карта которую перевернули
let twoCard;// вторая карта которую перевернули
let f = []; // массив куда помещяются перевернутые карты
let count = 0;// счетчик успешных совпадений карт

// Начало игры
function startGame() {
    start.addEventListener("click", () => {
        if(sumImgs === undefined){
            massegeChoiceLevel ();
        }
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
    activeCards = document.querySelectorAll(".card");
    return activeCards;
    
}
// Переворачиваем карты и ищем совпадения
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
    //Сравниваем значения data у img
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
 // Переворачиваем карту
 function changeActive (item) {
    if(!item.classList.contains("noactive") ){
        return item; 
    }else{
        item.classList.add("active");  
    }
 }
// Выводим кнопку для рестарта игры
 function finishGame() {
   const finishMassege = document.createElement("div");
    finishMassege.classList.add("massege");
    finishMassege.innerHTML = "Победа!!!";
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