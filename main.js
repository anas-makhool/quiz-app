const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const timerSec = document.querySelector(".timer-sec");
const progress = document.querySelector(".progress");

let currentIndex = 0;
let score = 0;
let startProg = 0;
let interval;

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

startBtn.onclick = () => addRem_show(true, infoBox);

infoBox.querySelector(".quit").onclick = () => addRem_show(false, infoBox);

const startQue = function () {
  addRem_show(false, infoBox);
  addRem_show(false, nextBtn);
  addRem_show(true, quizBox);

  let currentQue = questions[currentIndex];
  let rightAnswer = currentQue.right_answer;

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
    // Create rightEffect
    const rightEffect = document.createElement("div");
    rightEffect.innerHTML = `<div class="icon tick"><i class="fas fa-check"></i></div>`;

    // Create wrongEffect
    const wrongEffect = rightEffect.cloneNode(false);
    wrongEffect.innerHTML = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

    ele.onclick = () => {
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

infoBox.querySelector(".restart").onclick = () => startQue();

nextBtn.onclick = () => {
  if (currentIndex === questions.length - 1) return;
  currentIndex++;
  console.log("currentIndex: " + currentIndex);
  console.log(`score: ` + score);
  startQue();
  addRem_show(false, nextBtn);
};
