function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


const stopWatch = () => {
  const timer = document.querySelector(`.timer`);

  let milis = 1;
  let sec = 0;
  let min = 0;
  let hou = 0;

  interval = setInterval(() => {
    if (sec < 10 && min < 10) {
      timer.textContent = `0${min}:0${sec}`
    }
    else if (sec < 10 && min >= 10) {
      timer.textContent = `${min}:0${sec}`
    }
    else if (sec >= 10 && min < 10) {
      timer.textContent = `0${min}:${sec}`
    }
    else {
      timer.textContent = `${min}:${sec}`
    }
    milis += 1;
    if (milis === 100) {
      milis = 0;
      sec += 1;
    }
    if (sec == 60) {
      sec = 0;
      min += 1;
    }
    if (min == 60) {
      min = 0;
      hou += 1;
    }
  }, 10)


};


const makeBasicCards = (arr, zone) => {
  for (let i = 0; i < 12; i++) {
    card = document.createElement(`div`);
    card.classList.add(`card`);
    zone.appendChild(card);
    cCard = document.createElement(`div`);
    cCard.classList.add(`c${arr[i]}`);
    cCard.classList.add(`cCard`);
    card.appendChild(cCard);
  }
}

function machingTest(arr) {
  return arr[0] === arr[1] ? true : false;
}


const main = async () => {

  stopWatch();

  const dataZone = document.querySelector(`.dataZone`);
  const playzone = document.querySelector(`.playzone`);
  const wrongDisplay = document.querySelector(`.wrong`);
  const wrightDisplay = document.querySelector(`.wright`);


  let selected = [];
  let wrong = 0;
  let wright = 0;

  const shuffleCards = shuffle([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);

  makeBasicCards(shuffleCards, playzone);

  const listener = document.querySelectorAll(`.card`);
  listener.forEach(card => {
    card.addEventListener("click", () => {
      card.firstChild.style.opacity = "1";
      card.firstChild.style.transform = "rotateY(180deg)";
      if (selected.length < 2) {
        selected.push(card.firstChild);
        console.log(selected);
        if (selected[0].className !== selected[1].className) {
          console.log("wrong");
          wrong += 1;
          wrongDisplay.innerHTML = `${wrong}`;
          setTimeout(() => {
            selected[0].style.opacity = "0";
            selected[1].style.opacity = "0";
          }, 500);
        }
        else {
          card.firstChild.style.transform = "rotateY(180deg)";
          console.log("correct!");
          wright += 1;
          wrightDisplay.innerHTML = `${wright}`;
        }
      }
      else {
        selected = [card.firstChild];
      }

      if (wright === 6) {
        dataZone.innerHTML = "<h2>Well Played!</h2>";
        playzone.innerHTML =``;
        playzone.style.background = `url(../img/youWan.gif)`;

      }
    });
  })
}

main();