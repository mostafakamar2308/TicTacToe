const pvp = document.querySelector("#PVP");
const choosePlayer = document.querySelector(".pp");
const x = document.querySelector("#x");
const o = document.querySelector("#o");
let playerX;
let playerO;
const play = document.querySelector(".play");
let place1, place2, place3, place4, place5, place6, place7, place8, place9;
let array = [
  place1,
  place2,
  place3,
  place4,
  place5,
  place6,
  place7,
  place8,
  place9,
];

const modeBtns = document.querySelectorAll(".mode-btn");
const modebtnsitems = [].slice.call(modeBtns);
console.log(modebtnsitems);

modebtnsitems.forEach(function (item) {
  item.addEventListener("click", function () {
    modebtnsitems.forEach((item) => {
      item.classList.remove("mode-selected");
    });
    item.classList.toggle("mode-selected");
    let i = modebtnsitems.indexOf(item);
    switch (i) {
      case 0:
        choosePlayer.style.display = "grid";
        play.style.display = "block";
        break;
      case 1:
        console.log("You pressed on PVA");
        break;
      case 2:
        console.log("you pressed on AVA");
        break;
      default:
        choosePlayer.style.display = "grid";
    }
  });
});

pvp.addEventListener("click", function () {});

play.addEventListener("click", function () {
  playerX = x.value;
  playerO = o.value;
  document.querySelector(".player-x").textContent = x.value + "   X";
  document.querySelector(".player-o").textContent = o.value + "   O";

  choosePlayer.style.display = "none";
  play.style.display = "none";
  modebtnsitems.forEach((item) => (item.style.display = "none"));

  let playground = document.createElement("section");
  playground.classList.add("playground");
  document.querySelector("body").appendChild(playground);

  for (let i = 0; i < array.length; i++) {
    array[i] = document.createElement("div");
    array[i].classList.add("box");
    array[i].id = `box${i + 1}`;
    playground.appendChild(array[i]);
  }
});
