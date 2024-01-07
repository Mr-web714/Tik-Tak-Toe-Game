let btns = document.querySelectorAll(".btn");
let resetBtn = document.querySelector(".reset");
let msg = document.querySelector(".msg");
let line = document.querySelector(".line");
let aud = new Audio("ting.mp3");
let turn0 = true;
let count = 0;

const winPattern = [
  [0, 1, 2, 0, -23, 0],
  [0, 3, 6, -20, -3, 90],
  [0, 4, 8, -2, -5, 45],
  [1, 4, 7, 0, -3, 90],
  [2, 5, 8, 19, -3, 90],
  [2, 4, 6, 1, -4, 135],
  [3, 4, 5, 0, -3, 0],
  [6, 7, 8, 0, 17, 0],
];

// btns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     if (turn0) {
//       btn.innerText = "0";
//       turn0 = false;
//     } else {
//       btn.innerText = "X";
//       turn0 = true;
//     }
//   });
// });

for (let btn of btns) {
  btn.addEventListener("click", () => {
    if (turn0) {
      msg.innerText = `Player X Turn`;
      btn.innerText = "0";
      turn0 = false;
    } else {
      msg.innerText = `Player 0 Turn`;
      btn.innerText = "X";
      turn0 = true;
    }
    count++;
    btn.disabled = true;
    checkWinner();
    checkCount();
    aud.play();
  });
}

function checkCount() {
  let check = checkWinner();
  if (count === 9 && !check) {
    msg.innerText = "Oops! its Draw";
  }
}

function drawLine(pat) {
  console.log(pat);
  console.log(pat[3]);
  console.log(pat[4]);
  console.log(pat[5]);

  line.style.width = "56vw";
  line.style.transform = `translate(${pat[3]}vw, ${pat[4]}vw) rotate(${pat[5]}deg)`;
}

function disableBtns(pat) {
  for (let btn of btns) {
    btn.disabled = true;
  }
}
function showMsg(val) {
  msg.innerText = `Congragulation! Winner-PLayer ${val}`;
}

function checkWinner() {
  for (let pattern of winPattern) {
    let val1 = btns[pattern[0]].innerText;
    let val2 = btns[pattern[1]].innerText;
    let val3 = btns[pattern[2]].innerText;
    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 == val2 && val2 == val3) {
        disableBtns();
        drawLine(pattern);
        showMsg(val1);
        return true;
      }
    }
  }
}

resetBtn.addEventListener("click", () => {
  for (let btn of btns) {
    btn.innerText = "";
  }
  count = 0;
  enableBtns();
  msg.innerText = "";
  line.style.width = "0vw";
});

function enableBtns() {
  for (let btn of btns) {
    btn.disabled = false;
  }
}
