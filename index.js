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
let turn = 1,
  winner = "";
let box = (id) => {
  //created the element
  let create = document
    .querySelector(".game-board")
    .appendChild(document.createElement("div"));
  create.classList.add("box");
  create.id = `box-${id}`;

  //what will happen when you click on the box
  let clicking = create.addEventListener("click", function () {
    console.log(turn);
    if (turn < 9) {
      //check if it was previosly clicked
      if (!create.classList.contains("played")) {
        //check what turn so if odd => "X", else "O"
        if (turn % 2 == 1) {
          create.textContent = "X";
        } else {
          create.textContent = "O";
        }
        turn++;
        //add "played" to classlist
        create.classList.add("played");
      }
      Win(row, columnIdentifier());
    } else {
      console.log("draw");
    }
  });

  //Identifiy the Row of the cell

  let row = Math.ceil(id / 3);

  //Identifiy the Column of the cell
  let arr = [1, 2, 3];
  let column = id;
  let columnIdentifier = function () {
    if (!arr.includes(column)) {
      column -= 3;
      columnIdentifier();
    }
    return column;
  };

  return { clicking, row, columnIdentifier };
};

//factory for players
let player = function (name, score) {
  return {
    name,
    score,
  };
};

//Get the name of players
let x = xPVPInput.value;
let o = oPVPInput.value;

let player1 = player(x, 0);
let player2 = player(o, 0);

//See if the game started or not
let started = 0;
//Start game
play.addEventListener("click", function () {
  if (started == 0) {
    //Get the name of players
    x = xPVPInput.value;
    o = oPVPInput.value;

    player1 = player(x, player1.score);
    player2 = player(o, player2.score);

    if (x.trim() !== "" || o.trim() !== "") {
      document.querySelector(
        ".player-x"
      ).textContent = `${player1.name} > ${player1.score}`;
      document.querySelector(
        ".player-o"
      ).textContent = `${player2.name} > ${player2.score}`;

      //remove the play and name sections
      play.style.display = "none";
      pvpSection.style.display = "none";
      document.querySelector(".game-mode").style.display = "none";

      //make the game board
      for (let i = 1; i < 10; i++) {
        box(i);
      }
      started++;
    } else {
      console.log("Put names");
    }
  } else {
    turn = 3;
    for (let i = 0; i < 9; i++) {
      document.querySelectorAll(".box")[i].textContent = "";
      document.querySelectorAll(".box")[i].classList.remove("played");
    }
    play.style.display = "none";
  }
});

//Function For checking winning
function Win(row, column) {
  //(even,even)
  if (row % 2 == 0 && column % 2 == 0) {
    if (areEqual(check(2), check(8), check(5))) {
      winnerName();
    } else if (areEqual(check(4), check(5), check(6))) {
      winnerName();
    } else if (areEqual(check(3), check(5), check(7))) {
      winnerName();
    } else if (areEqual(check(1), check(5), check(9))) {
      winnerName();
    }
  }
  //(even,odd)
  else if (row % 2 == 1 && column % 2 == 0) {
    if (areEqual(check(2), check(1), check(3))) {
      winnerName();
    } else if (areEqual(check(8), check(7), check(9))) {
      winnerName();
    } else if (areEqual(check(2), check(5), check(8))) {
      winnerName();
    }
  }
  //(odd,even)
  else if (row % 2 == 0 && column % 2 == 1) {
    if (areEqual(check(4), check(1), check(7))) {
      winnerName();
    } else if (areEqual(check(6), check(3), check(9))) {
      winnerName();
    } else if (areEqual(check(4), check(5), check(6))) {
      winnerName();
    }
  }
  //(odd,odd)
  else if (row % 2 == 1 && column % 2 == 1) {
    if (areEqual(check(1), check(2), check(3))) {
      winnerName();
    } else if (areEqual(check(1), check(4), check(7))) {
      winnerName();
    } else if (areEqual(check(1), check(5), check(9))) {
      winnerName();
    } else if (areEqual(check(3), check(6), check(9))) {
      winnerName();
    } else if (areEqual(check(9), check(8), check(7))) {
      winnerName();
    } else if (areEqual(check(7), check(5), check(3))) {
      winnerName();
    }
  }
}

//Determine the text in the box

function check(id) {
  if (document.querySelector(`#box-${id}`).textContent == "") {
    return;
  }
  return document.querySelector(`#box-${id}`).textContent;
}

//check if multiple variables are equal
function areEqual() {
  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    if (arguments[i] === null || arguments[i] !== arguments[i - 1]) {
      return false;
    } else if (
      arguments[i] === undefined ||
      arguments[i] !== arguments[i - 1]
    ) {
      return false;
    }
  }
  return true;
}

//see who won
function winnerName() {
  if (turn % 2 == 0) {
    winner = player1.name;
    player1.score++;
    document.querySelector(
      ".player-x"
    ).textContent = `${player1.name} > ${player1.score}`;
    document.querySelector(
      ".player-o"
    ).textContent = `${player2.name} > ${player2.score}`;
  } else {
    winner = player2.name;
    player2.score++;
    document.querySelector(
      ".player-x"
    ).textContent = `${player1.name} > ${player1.score}`;
    document.querySelector(
      ".player-o"
    ).textContent = `${player2.name} > ${player2.score}`;
  }
  console.log(`${winner} has Won`);
  play.style.display = "block";
  play.textContent = "Restart";
}
