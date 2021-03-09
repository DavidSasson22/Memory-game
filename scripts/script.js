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
  const reset = document.querySelector(".reset");

  reset.addEventListener("click", () => {
    condition = true;
    milis = 1;
    sec = 0;
    min = 0;
    hou = 0;
    timer.textContent = `${min}:${sec}`;
    condition = false;
  })


  let milis = 1;
  let sec = 0;
  let min = 0;
  let hou = 0;

  let condition = false;

  if (!condition) {
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
  }
  condition = true;
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


const main = async () => {

  stopWatch();

  const play = document.querySelector(".play");
  const pause = document.querySelector(".pause");
  const reset = document.querySelector(".reset");

  reset.addEventListener("click", () => {
    playzone.innerHTML = ``;
    selected = [];
    wrong = 0;
    wright = 0;
    wrongDisplay.innerHTML = `${wrong}`;
    wrightDisplay.innerHTML = `${wright}`;
    playzone.style.background = "#9dfce3";
    dataZone.removeChild(dataZone.lastElementChild);
    main();
  });


  var x = document.querySelector("#myAudio");
  function playAudio() {
    x.play();
  }

  function pauseAudio() {
    x.pause();
  }

  play.addEventListener("click", playAudio);
  pause.addEventListener("click", pauseAudio);


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
    card.addEventListener("click", async () => {
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
            selected[0].style.transform = "rotateY(-90deg)";
            selected[1].style.transform = "rotateY(-deg)";
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
        // dataZone.innerHTML += "<h2>Well Played!</h2>";
        won = document.createElement("h2");
        won.textContent = `Well Played!`;
        playzone.innerHTML = ``;
        playzone.style.background = `url(../img/youWan.gif)`;
        dataZone.appendChild(won);
      }
    });
  })
}

main();