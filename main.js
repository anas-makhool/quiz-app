const startButton = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const continueButton = infoBox.querySelector(".restart");
const resultBox = document.querySelector(".result-box");
const nextButton = document.querySelector(".next-btn");
const resultText = document.querySelector(".score-text");
const resultTitle = resultText.children[0].children[0];
const resultScore = resultText.children[0].children[1];
const resultTotalQuestions = resultText.children[0].children[2];
const timeCount = document.querySelector(".timer-sec");
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
let widthValue = 0;
let score = 0;
let timeValue = 15;

// Intervals
let counter;
let counterLine;

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

startButton.onclick = () => {
  addRem_show(true, infoBox);
  score = 0;
  currentIndex = 0;
};

infoBox.querySelector(".quit").onclick = () => addRem_show(false, infoBox);

const startQue = function () {
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(0);

  addRem_show(false, infoBox);
  addRem_show(false, nextButton);
  addRem_show(true, quizBox);

  // bring the questions in random order
  questions = questions.slice().sort(() => Math.random() - 0.5);

  let currentQue = questions[currentIndex];
  let rightAnswer = currentQue.right_answer;
  console.log(rightAnswer);

  // bring the options in random order
  let options = [
    currentQue.answer_1,
    currentQue.answer_2,
    currentQue.answer_3,
    currentQue.answer_4,
  ].sort(() => Math.random() - 0.5);

  let quizBlock = `
  <div class="que-text">
      <span>${currentQue.title}</span>
  </div>
  <div class="option-list">
      ${options.map((opt) => `<div class="option"><span>${opt}</span></div>`).join("")}
  </div>
`;

  quizBox.querySelector("section").innerHTML = quizBlock;

  quizBox.querySelectorAll(".option").forEach((ele) => {
    ele.onclick = () => {
      clearInterval(counter);
      clearInterval(counterLine);

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

      addRem_show(true, nextButton);
    };
  });
};

continueButton.onclick = () => {
  startQue();
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

nextButton.onclick = function () {
  if (currentIndex === questions.length - 1) {
    console.log(`score: ` + score);
    addRem_show(false, quizBox);
    addRem_show(true, resultBox);
    let result = checkResultTitle(score, questions.length);
    resultTitle.innerHTML = result.text;
    resultTitle.style.color = result.color;
    resultScore.innerHTML = score;
    resultTotalQuestions.innerHTML = questions.length;
    return;
  }
  currentIndex++;
  console.log("currentIndex: " + currentIndex);
  totalP1.innerHTML = currentIndex + 1;
  totalP2.innerHTML = questions.length;

  startQue();
  addRem_show(false, nextButton);
};

replayQuiz.onclick = () => {
  console.log(`replay`);
  score = 0;
  currentIndex = 0;
  addRem_show(false, resultBox);
  addRem_show(true, quizBox);
  totalP1.innerHTML = 1;
  let result = checkResultTitle(score, questions.length);
  resultTitle.innerHTML = result.text;
  resultTitle.style.color = result.color;
  startQue();
};

quitQuiz.onclick = () => {
  totalP1.innerHTML = 1;
  addRem_show(false, resultBox);
};

closeIcon.onclick = () => {
  totalP1.innerHTML = 1;
  clearInterval(counter);
  clearInterval(counterLine);
  setTimeout(() => {
    timeCount.innerHTML = timeValue;
  }, 300);
  addRem_show(false, quizBox);
};

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time.toString().padStart(2, "0");
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

function startTimerLine(time) {
  const maxWidth = 550;

  // to be line progress dynamic with timer count
  let intervalDuration = (timeValue * 1000) / maxWidth;
  counterLine = setInterval(timer, intervalDuration + 2);

  function timer() {
    time += 1;
    progress.style.width = `${(time / maxWidth) * 100}%`;
    if (time >= maxWidth) {
      clearInterval(counterLine);
    }
  }
}
