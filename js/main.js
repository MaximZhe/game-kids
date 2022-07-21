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
"img/5.png"].sort(() => Math.random() - 0.5)

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
})

let hasFlippedCard = false;
let i;
let r;

function flipCard(e) {
    if(e.target.classList.contains("noactive")){
        e.target.classList.add("active");
    }

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        i = e.target.childNodes[0].dataset.num;
        return;
    }else{
        r = e.target.childNodes[0].dataset.num;;
        hasFlippedCard = false;
    }
   console.log(i,rgit)
    

   checkForMatch();
 }

 function checkForMatch() {
 if (i.dataset.num === r.dataset.num) {
     return;
   }


 }

container.addEventListener("click", flipCard);

