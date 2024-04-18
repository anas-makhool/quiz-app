const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const nextBtn = document.querySelector(".next-btn");
const resultText = document.querySelector(".score-text");
const resultP1 = resultText.children[0].children[0];
const resultP2 = resultText.children[0].children[1];
const resultP3 = resultText.children[0].children[2];
const timerSec = document.querySelector(".timer-sec");
const progress = document.querySelector(".progress");
const total = document.querySelector(".total-que");
const totalP1 = total.children[0].firstElementChild;
const totalP2 = total.children[0].lastElementChild;
const replayQuiz = document.querySelector(".result-box .restart");
const quitQuiz = document.querySelector(".result-box .quit");
const parentFooter = document.querySelector(".parent");
const rightEffect = document.createElement("div");
const closeIcon = document.querySelector(".x");
rightEffect.innerHTML = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
const wrongEffect = rightEffect.cloneNode(false);
wrongEffect.innerHTML = `<div class="icon cross"><i class="fas fa-times"></i></div>`;
let currentIndex = 0;
let score = 0;
let timeValue = 15;
// let startProg = 0;
let counter;

const addRem_show = function (check, ele) {
  if (check) {
    ele.classList.add("show");
  } else {
    ele.classList.remove("show");
  }
};

const addRem_event = function (check, ele) {
  if (check) {
    ele.classList.add("event-none");
  } else {
    ele.classList.remove("event-none");
  }
};

startBtn.onclick = () => {
  addRem_show(true, infoBox);
  score = 0;
  currentIndex = 0;
};

infoBox.querySelector(".quit").onclick = () => addRem_show(false, infoBox);

const startQue = function () {
  addRem_show(false, infoBox);
  addRem_show(false, nextBtn);
  addRem_show(true, quizBox);

  let currentQue = questions[currentIndex];
  let rightAnswer = currentQue.right_answer;
  console.log(rightAnswer);

  let quizBlock = `
  <div class="que-text">
          <span>${currentQue.title}</span>
        </div>
        <div class="option-list">
          <div class="option">
            <span>${currentQue.answer_1}</span>
          </div>
          <div class="option">
            <span>${currentQue.answer_2}</span>
          </div>
          <div class="option">
            <span>${currentQue.answer_3}</span>
          </div>
          <div class="option">
            <span>${currentQue.answer_4}</span>
          </div>
        </div>
  `;

  quizBox.querySelector("section").innerHTML = quizBlock;

  quizBox.querySelectorAll(".option").forEach((ele) => {
    ele.onclick = () => {
      clearInterval(counter);
      addRem_event(true, ele.parentElement);
      const chosenAnswer = ele.querySelector(".option span").innerHTML;

      if (chosenAnswer == rightAnswer) {
        ele.insertAdjacentElement("beforeend", rightEffect);
        score++;
      } else {
        quizBox.querySelectorAll(".option").forEach((e) => {
          if (e.querySelector(".option span").innerHTML === rightAnswer) {
            e.insertAdjacentElement("beforeend", rightEffect);
          }
        });
        ele.insertAdjacentElement("beforeend", wrongEffect);
      }

      addRem_show(true, nextBtn);
    };
  });
};

infoBox.querySelector(".restart").onclick = () => {
  startQue();
  startTimer(timeValue);
};

function checkResultTitle(score, questions) {
  if (score === questions) {
    return { text: "Perfect", color: "#007bff" };
  } else if (score > questions / 2) {
    return { text: "Good", color: "#23903c" };
  } else if (score < questions / 2 && score > 0) {
    return { text: "Sorry", color: "#a42834" };
  } else if (score === 0) {
    return { text: "Sorry 😥", color: "#a42834" };
  }
}

nextBtn.onclick = function () {
  if (currentIndex === questions.length - 1) {
    console.log(`score: ` + score);
    addRem_show(false, quizBox);
    addRem_show(true, resultBox);
    let result = checkResultTitle(score, questions.length);
    resultP1.innerHTML = result.text;
    resultP1.style.color = result.color;

    resultP2.innerHTML = score;
    resultP3.innerHTML = questions.length;
    return;
  }
  currentIndex++;
  console.log("currentIndex: " + currentIndex);
  totalP1.innerHTML = currentIndex + 1;
  totalP2.innerHTML = questions.length;
  startQue();
  clearInterval(counter);
  startTimer(timeValue);
  addRem_show(false, nextBtn);
};

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timerSec.textContent = time;
    time--;

    if (time < 0) {
      quizBox.querySelectorAll(".option").forEach((ele) => {
        if (
          ele.querySelector(".option span").innerHTML ===
          questions[currentIndex].right_answer
        ) {
          score--;
          ele.click();
        }
      });
    }
  }
}

replayQuiz.onclick = () => {
  console.log(`replay`);
  score = 0;
  currentIndex = 0;
  addRem_show(false, resultBox);
  addRem_show(true, quizBox);
  totalP1.innerHTML = 1;
  let result = checkResultTitle(score, questions.length);
  startQue();
  resultP1.innerHTML = result.text;
  resultP1.style.color = result.color;
};

quitQuiz.onclick = () => {
  totalP1.innerHTML = 1;
  addRem_show(false, resultBox);
};

closeIcon.onclick = () => {
  console.log(`oww`);
  totalP1.innerHTML = 1;
  clearInterval(counter);
  setTimeout(() => {
    timerSec.innerHTML = timeValue;
  }, 300);
  addRem_show(false, quizBox);
};
