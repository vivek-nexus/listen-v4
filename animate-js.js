const helpCard1 = document.querySelector('.h-card-1');
const helpCard2 = document.querySelector('.h-card-2');
const helpCard3 = document.querySelector('.h-card-3');
const playAgain = document.querySelector('#play-again');

const arrow1= document.querySelector('.arrow-1');
const arrow2= document.querySelector('.arrow-2');

playAgain.style.display="none";
playAgain.addEventListener('click',animateCards);
setTimeout(animateCards, 1500);
// setTimeout(animateCards, 9800);


// https://animate.style/

function animateCards() {
    playAgain.style.display="none";
    helpCard2.style.backgroundColor = "rgba(255, 255, 255, 0.16)";
    helpCard3.style.backgroundColor = "rgba(255, 255, 255, 0.16)";
    helpCard1.classList.remove('animate__animated', 'animate__pulse');
    helpCard2.classList.remove('animate__animated', 'animate__pulse');
    helpCard3.classList.remove('animate__animated', 'animate__pulse');
    arrow1.style.fill = "black";
    arrow2.style.fill = "black";
    setTimeout(function(){
        helpCard1.classList.add('animate__animated', 'animate__pulse');
        helpCard1.style.backgroundColor = "#03DAC53D";
    },300);
    setTimeout(function () {
        arrow1.style.fill = "#03DAC5";
        helpCard2.classList.add('animate__animated', 'animate__pulse');
        helpCard1.style.backgroundColor = "rgba(255, 255, 255, 0.16)";
        helpCard2.style.backgroundColor = "#03DAC53D";
    }, 2000);
    setTimeout(function () {
        arrow2.style.fill = "#03DAC5";
        helpCard3.classList.add('animate__animated', 'animate__pulse');
        helpCard2.style.backgroundColor = "rgba(255, 255, 255, 0.16)";
        helpCard3.style.backgroundColor = "#03DAC53D";
    }, 4000);
    setTimeout(function () {
        playAgain.style.display="inline-block";
    }, 6000);
}


const today = new Date();
const curHr = today.getHours();

if (curHr > 6 && curHr < 12) {
  document.querySelector('h2').innerText="What will you lizen to, this morning?";
} else if (curHr >= 12 && curHr < 17) {
    document.querySelector('h2').innerText="What will you lizen to, this afternoon?";
} else if (curHr >= 17 && curHr < 21) {
    document.querySelector('h2').innerText="What will you lizen to, this evening?";
}
    else {
    document.querySelector('h2').innerText="What will you lizen to, this night?";
}



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

