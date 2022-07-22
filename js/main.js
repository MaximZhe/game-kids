"use strict"

const container = document.querySelector(".container");
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



sumImgs.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card","noactive");
    let img = document.createElement("img");
    img.src = item;
    img.setAttribute("data-num",item.match(/\d/));
    container.append(card);
    card.append(img);
});

let hasFlippedCard = false;
let lockCard = 2;
let oneCard;
let twoCard;
let f = [];
let activeCard = document.querySelectorAll(".card");
let count = 0;
function flipCard(e) {
    
    if(e.target.classList.contains("noactive")){
        e.target.classList.add("active");
    }
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        oneCard = e.target;
        f.push(oneCard);
        return;

    }
    if(hasFlippedCard){
        twoCard = e.target;
        hasFlippedCard = false;
        f.push(twoCard);
    }
    if(f.length === 2){
        activeCard.forEach(i => {
            i.classList.add("no-click");
        });
    }
    
    if (oneCard.childNodes[0].dataset.num === twoCard.childNodes[0].dataset.num) {
    oneCard.classList.add("succeed");
    twoCard.classList.add("succeed");
    count += 2;
    setTimeout(() => {
        activeCard.forEach(i => {
            i.classList.remove("no-click");  
        });
    },2000);
    
    }else{
        activeCard.forEach(i => {
            setTimeout(() => {
            i.classList.remove("active", "no-click");
            },2000);
            
        });
        
    }
    f = [];
    console.log(count);
    if(count === activeCard.length){
        finishGame();
    }
 }
 
 function finishGame() {
   const finishMassege = document.createElement("div");
    finishMassege.classList.add("massege");
    finishMassege.innerHTML = "Ты победил!!!";
    container.append(finishMassege);
    finishMassege.addEventListener("click", () => {
   
        while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        });
 }
 


container.addEventListener("click", flipCard);




