//Defining the game mode buttons
let pvp = document.querySelector("#PVP");
let pva = document.querySelector("#PVA");

//Defining the player names in game modes
let pvpSection = document.querySelector(".pp");
let xPVPInput = document.querySelector("#x");
let oPVPInput = document.querySelector("#o");

let pvaSection = document.querySelector(".pa");

//Defining the play button
let play = document.querySelector(".play");

//Defining the gameboard
let gameBoard = document.querySelector(".game-board");

//Choose game mode
pvp.addEventListener("click", function () {
  //sections of each button appear
  pvpSection.style.display = "grid";
  pvaSection.style.display = "none";

  //give the selected button its visuals
  pvp.classList.add("mode-selected");
  pva.classList.remove("mode-selected");
});
pva.addEventListener("click", function () {
  //sections of each button appear
  pvpSection.style.display = "none";
  pvaSection.style.display = "block";

  //give the selected button its visuals
  pvp.classList.remove("mode-selected");
  pva.classList.add("mode-selected");
});

//Factrory for the gameboard
let turn = 3;
let box = (id) => {
  //created the element
  let create = document
    .querySelector(".game-board")
    .appendChild(document.createElement("div"));
  create.classList.add("box");
  create.id = `box-${id}`;

  //what will happen when you click on the box
  let clicking = create.addEventListener("click", function () {
    //check if it was previosly clicked
    if (!create.classList.contains("played")) {
      //check what turn so if odd => "X", else "O"
      if (turn % 2 == 1) {
        create.textContent = "X";
        turn++;
      } else {
        create.textContent = "O";
        turn++;
      }
      //add "played" to classlist
      create.classList.add("played");
    }
  });

  //Identifiy the Row of the cell

  let row = Math.ceil(id / 3);

  //Identifiy the Column of the cell
  let arr = [1, 2, 3];
  let column = id;
  let columnIdentifier = function () {
    if (arr.includes(column)) {
      console.log(columnIdentifier);
    } else {
      column -= 3;
      columnIdentifier();
    }
    return column;
  };

  return { clicking, row, columnIdentifier };
};

//Start game
play.addEventListener("click", function () {
  //Get the name of players
  let x = xPVPInput.value;
  let o = oPVPInput.value;

  if (x.trim() !== "" || o.trim() !== "") {
    document.querySelector(".player-x").textContent = x;
    document.querySelector(".player-o").textContent = o;

    //remove the play and name sections
    play.style.display = "none";
    pvpSection.style.display = "none";
    document.querySelector(".game-mode").style.display = "none";

    //make the game board
    for (let i = 1; i < 10; i++) {
      box(i);
    }
  } else {
    console.log("Put names");
  }
});
