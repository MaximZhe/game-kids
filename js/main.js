"use strict"

const containers = document.querySelectorAll(".container");
const start = document.querySelector(".start");
const board = document.querySelector("#board");
const imgRandom = [
"img/1.png", 
"img/2.png",
"img/3.png",
"img/4.png",
"img/5.png",
"img/1.png",
"img/2.png",
"img/3.png",
"img/4.png",
"img/5.png"].sort(() => Math.random() - 0.5);

let imgsTop = new Set([...imgRandom]);
let imgsReverse = imgRandom.reverse();
let imgsBottom = new Set([...imgsReverse]);
let sumImgs = [...imgsTop,...imgsBottom];
let activeCards = [];
let hasFlippedCard = false;
let activeCard;
let oneCard;
let twoCard;
let f = [];
let count = 0;
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
    activeCard.forEach(c => {
        activeCards.push(c);
    });
    return activeCards;
    
}



function flipCard(e) {
    if(!e.target.classList.contains("noactive") ){
        return e.target; 
    }
    if(e.target.classList.contains("noactive")){
        e.target.classList.add("active");  
    }
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
 
 function finishGame() {
   const finishMassege = document.createElement("div");
    finishMassege.classList.add("massege");
    finishMassege.innerHTML = "Ты победил!!!";
    containers[1].append(finishMassege);
    finishMassege.addEventListener("click", () => {
        while (containers[1].firstChild) {
                containers[1].removeChild(containers[1].firstChild);
            }
            containers[0].classList.remove("up");
            f = [];
            count = 0;
            activeCards = [];
            finishMassege.remove();
        });
       
 }

 function startGame() {
    start.addEventListener("click", () => {
            createCard ();
            containers[0].classList.add("up");
            count = 0;
    });
}

startGame();

containers[1].addEventListener("click", flipCard);