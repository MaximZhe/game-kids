
const containers = document.querySelectorAll(".container");
const start = document.querySelector(".start");
const board = document.querySelector("#board");
const btnsLevel = document.querySelectorAll(".btns");
const modalForm = document.querySelector("#modal-form");
const form = document.querySelector("#form-main");
const label = form.querySelector("label");
const inputName = form.querySelector("input[name='name']");
const btnCloseModal =document.querySelector(".modal__close");
const btnOpenModal = document.querySelector("#login-form");

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

//Кнопки выбора уровня сложности
function choiceLevel () {
    btnsLevel.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if(e.target && e.target.dataset.level === "1" ){
                levelEasy();
                board.style.maxWidth ="650px";
            }else if(e.target && e.target.dataset.level === "2" ){              
                levelNormal();
                board.style.maxWidth ="850px";
            }else {
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
let activeCards = []; // массив блоков карт
let hasFlippedCard = false;
let oneCard; // первая карта которую перевернули
let twoCard;// вторая карта которую перевернули
let f = []; // массив куда помещяются перевернутые карты
let g = [];
let count = 0;// счетчик успешных совпадений карт

// Начало игры
function startGame() {
    start.addEventListener("click", () => {
            ramdomImgCards (sumImgs);
            createCard ();
            containers[0].classList.add("up");
            containers[1].style.flexDirection = "row";
            containers[1].classList.remove("up");
            g = [];
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
    console.log(e.target);
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
    console.log(oneCard === oneCard);
    if(f.length === 2){
        activeCards.forEach(i => {
            i.classList.add("no-click");
        });
    }
    f = [];
    //Сравниваем значения data у img
    if (oneCard.childNodes[0].dataset.num === twoCard.childNodes[0].dataset.num && oneCard != twoCard) {
        oneCard.classList.add("succeed");
        twoCard.classList.add("succeed");
        if(oneCard.classList.contains("succeed") === twoCard.classList.contains("succeed")){
           g.push(oneCard,twoCard); 
        }
        
        setTimeout(() => {
            activeCards.forEach(i => {
                i.classList.remove("no-click");  
            });
        },1000);
    }
    else if (oneCard === twoCard || oneCard === undefined || twoCard === undefined){
        oneCard = {};
        twoCard = {};
        activeCards.forEach(i => {
            i.classList.remove("active", "no-click");
        });

    }else{
        activeCards.forEach(i => {
            setTimeout(() => {
            i.classList.remove("active", "no-click");
            },1000);
        }); 
    }
    if(g.length === activeCards.length){
        finishGame(); 
    } 
 }
 // Переворачиваем карту
 function changeActive (item) {
    if(!item.classList.contains("noactive") ){
        return item; 
    }else{
        item.classList.add("active", "no-click");  
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
            g = [];
            activeCards = [];
            finishMassege.remove();   
        });     
 }

 

//Обработчик на переворот карт
containers[1].addEventListener("click", flipCard);

//Меняем label у формы 
function labelHide () {
    inputName.addEventListener("focus", (e) => {
        if(e.type === "focus"){
            label.classList.add("hide");
            setTimeout(() => {
                label.style.display = "none";
            },500);  
        } 
    });
}
labelHide ();

//Возвращаем label
function labelActive () {
    modalForm.addEventListener("click", (e)  =>{
        if(e.target != inputName && !e.target.classList.contains("form__btn")){
            label.classList.remove("hide");
            label.classList.add("active");
            setTimeout(() => {
                label.style.display = "flex";
            },500);
        }
    });
}
labelActive ();

let users;

/*
function userForm (f) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const r = new XMLHttpRequest ();
        r.open("POST", "ajax-form.php");
        r.setRequestHeader("Content-type", "application/json")
        const formData = new FormData (f);

        const obj = {};

        formData.forEach((value, key) => {
            obj[key] = value;
        });

        const json = JSON.stringify(obj);

        r.send(json);

        r.addEventListener("load", () => {
            if(r.status === 200){
                console.log(obj)
            }
        })
    })
}*/

// Функция обработки запроса и возврата JSON файла
const postData = async (url, data) => {  //делаем запрос не ассинхронным
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: data
    });
    return await result.json();
};
//Отправляем данные с формы в JSON файл
function userForm (f) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData (f);// Собираем значения с input

        const obj = {};

        formData.forEach((value, key) => {
            obj[key] = value;
        });

        postData("http://localhost:3000/users", JSON.stringify(obj))
        .then(data => {
            console.log(data.name);
            console.log(users);
        }).finally(() => {
            f.reset();
            modalForm.classList.add("hide");
            setTimeout(() => {
                form.classList.remove("active");
                form.classList.add("hide");
                btnCloseModal.style.display = "none";
            },400);
        });
        getData ();
        
    });
}
userForm (form);

function getData () {
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(json => users = json)
    .then(() => {
        return users;
    });
}
getData ();

//Закрваем Модальное окно

function modalClose () {
    btnCloseModal.addEventListener("click", () => {
        modalForm.classList.add("hide");
        setTimeout(() => {
            form.classList.remove("active");
            form.classList.add("hide");
            btnCloseModal.style.display = "none";
        },400);
        
    });
}
modalClose ();

//Открываем форму для ввода имени
function modalOpen () {
    btnOpenModal.addEventListener("click", () => {
        modalForm.classList.remove("hide");
        modalForm.classList.add("active");
        setTimeout(() => {
            form.classList.remove("hide");
            form.classList.add("active");
            btnCloseModal.style.display = "flex";
        },400);
    } );
}
modalOpen ();