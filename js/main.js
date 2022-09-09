const containers = document.querySelectorAll(".container");
const start = document.querySelector(".start");
const board = document.querySelector("#board");
const btnsLevel = document.querySelectorAll(".btns");
const btnsLevelCopy = document.querySelectorAll(`[data-level]`);
const modalForm = document.querySelector("#modal-form");
const form = document.querySelector("#form-main");
const btnSub = document.querySelector("#sub");
const label = form.querySelector("label");
const inputName = form.querySelector("input[name='name']");
const btnCloseModal =document.querySelector(".modal__close");
const btnOpenModal = document.querySelector("#login-form");
const modalTable = document.querySelector("#modal-table");
const btnCloseTable = modalTable.querySelector(".modal__close");
const btnOpenTable = document.querySelector("#table-users");
let idUser = document.querySelector("#id-user").value;

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


//Присваиваем класс кнопке если выбрали уровень
function levelActive(btn){
    btn.classList.add("active");
}
//Убираем активный класс у кнопки уровня
function levelNoActive(btn){
    btn.classList.remove("active");
}
//Перебор массива для кнопок data-level
function levelButton (arr){
    arr.forEach( item => {
        levelNoActive(item);
    });
}
//Кнопки выбора уровня сложности
function choiceLevel () {
    btnsLevel.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let level;
            levelButton (btnsLevelCopy);
            levelActive(e.target);
            if(e.target && e.target.dataset.level === "1" ){
                returnLevelGame (level, e.target.dataset.level);
                levelEasy();
                board.style.maxWidth ="650px";
                setTimeout(() => {
                    addClassModal();
                },500);
            }else if(e.target && e.target.dataset.level === "2" ){
                returnLevelGame (level, e.target.dataset.level);
                levelNormal();    
                board.style.maxWidth ="850px";
                setTimeout(() => {
                    addClassModal();
                },500);
            }else {
                returnLevelGame (level, e.target.dataset.level);
                levelHard();
                board.style.maxWidth ="960px";
                setTimeout(() => {
                    addClassModal();
                },500);
            } 
        });  
    });
}
choiceLevel ();

//Передаем в таблицу игроков уровень сложности
function returnLevelGame (num, button){
    num = button;
    lvl = num;
    return lvl;
}
let lvl = 0;
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
let g = []; // массив куда добавляются совпавшие карты
let res = new Set (); // массив значений data-number совпавших карт
// Начало игры
function startGame() {
    start.addEventListener("click", () => {
            ramdomImgCards (sumImgs);
            createCard ();
            containers[0].classList.add("up");
            containers[1].style.flexDirection = "row";
            containers[1].classList.remove("up");
            g = [];
            res.clear();
            levelButton (btnsLevelCopy);
    });
}
startGame();
// Создаем карты на доске
function createCard () {
    sumImgs.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card","noactive");
        card.setAttribute("data-card", "false");
        let img = document.createElement("img");
        img.src = item;
        img.setAttribute("data-number",item.match(/\d/));
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
    if (!hasFlippedCard && e.target.hasAttribute("data-card")) {
        hasFlippedCard = true;
        oneCard = e.target;
        f.push(oneCard);
        return;
    }
    if(hasFlippedCard && e.target.hasAttribute("data-card")){
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
    if (oneCard.childNodes[0].dataset.number === twoCard.childNodes[0].dataset.number && oneCard != twoCard) {
        oneCard.classList.add("succeed");
        twoCard.classList.add("succeed");
        if(oneCard.classList.contains("succeed") === twoCard.classList.contains("succeed")){
           g.push(oneCard,twoCard);
           c (g);
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
        return oneCard,twoCard;

    }else{
        activeCards.forEach(i => {
            if(!i.classList.contains("succeed") || oneCard != twoCard || i.childNodes[0].dataset.number === undefined){
                setTimeout(() => {
                    i.classList.remove("active", "no-click");
                },800);
            }
            
        }); 
    }
    if(res.size === (activeCards.length / 2)){
        finishGame(); 
    }
    
    
 }
 
 //функция перебора и добавления экслюзивных значений в массив
 function c (arr) {
    arr.forEach(item => {
        res.add(item.childNodes[0].dataset.number);
    });
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

let coutUsers; //Переменная для объекта который возвращается при удачном POST
let userList; // Переменная для вывода и обновления списка игроков в таблице
// Функция обработки запроса и возврата JSON файла
const postData = async (url, data) => {  //делаем запрос не ассинхронным
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await result.json();
};

//Присваиваем знаение инпута для проверки имени
let valueInputName;
inputName.addEventListener("input", () => {
        valueInputName = inputName.value;
        return valueInputName;
    });
//Сверяем имена из файла с введенным.
btnSub.addEventListener("mouseover", () => {
    validateUsers();
});
function validateUsers(){
    userList.forEach( use => {
        if(valueInputName === use.name){
           const info = document.createElement("div");
           info.classList.add("info");
           info.innerHTML = `${valueInputName} уже используется, введите другое имя`;
           form.append(info);
           setTimeout(() => {
                info.remove();
           },1000);
        }
    }); 
}
//Сообщение об удачной отправки 
function massSucces () {
    const mass = document.createElement("div");
    mass.classList.add("info");
    mass.innerHTML = "Данные успешно отправлены";
    form.append(mass);
    setTimeout(() => {
        mass.remove();
    },1000);
}
//Отправляем данные с формы в JSON файл
function userForm (f) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData (f);// Собираем значения с input

        const obj = {};
        
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        obj.id = +idUser;
        obj.lvl = +lvl;
        postData("http://localhost:3000/users", obj )
        .then(data => coutUsers = data)
        .then(() =>{
            userList.push(obj);
            retUse(userList);
            massSucces ();
            return coutUsers;
        }).finally(() => {
            f.reset();
            valueInputName = " ";
            if(idUser === coutUsers.id){
                idUser = coutUsers.id + 1;
                return idUser;
            }
        });
        setTimeout(() => {
            modalForm.classList.remove("active");
            modalForm.classList.add("hide");
            form.classList.remove("active");
            form.classList.add("hide");
            btnCloseModal.style.display = "none";
        },1500);
        console.log(obj);
    });
}
userForm (form);

let users;
//Делаем запрос к json файлу
function getData () {
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(json => users = json)
    
    .then((users) => {idUser = users.length;
                        userList = [...users];
                        retUse(userList);
                    })
    .then(() => {
        idUser = +idUser + 1;
        return idUser;
    });
    
}
 getData ();
 
 //Возвращаем массив с пользователями users
 function retUse(use){
    return use;
}
//Закрваем Модальное окно с формой
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
function modalOpen (btnOpen) {
    btnOpen.addEventListener("click", () => {
        addClassModal();
    } );
}
modalOpen (btnOpenModal);

//присваиваем класс модальному окну с формой
function addClassModal(){
    modalForm.classList.remove("hide");
        modalForm.classList.add("active");
        setTimeout(() => {
            form.classList.remove("hide");
            form.classList.add("active");
            btnCloseModal.style.display = "flex";
        },400);
}

//Создаем список игроков
let ul;
function splitUsers( arr){
    const list = document.createElement("ul");
    arr.forEach(item => {
        const itemUser = document.createElement("li");
        list.classList.add("table");
        itemUser.innerHTML = `Name :<span>${item.name} </span> level:<span> ${item.lvl}</span> `;
        list.append(itemUser);
        modalTable.append(list); 
    });
    ul = list;
    return ul;
}
//Открываем таблицу с игроками
function openTable () {
    btnOpenTable.addEventListener("click", () => {
        modalTable.classList.remove("hide");
        modalTable.classList.add("active");
        btnCloseTable.style.display = "flex";
        splitUsers(userList);
    });
}
openTable ();
//Закрываем таблицу с игроками
function closeTable () {
    btnCloseTable.addEventListener("click", () => {
        modalTable.classList.add("hide");
        btnCloseTable.style.display = "none";
        ul.remove();
    });
}
closeTable ();