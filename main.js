const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;
let score = 0;

const showOrHide = function (check, ele) {
  if (check) {
    ele.classList.add("show");
  } else {
    ele.classList.remove("show");
  }
};

startBtn.onclick = () => showOrHide(true, infoBox);

infoBox.querySelector(".quit").onclick = () => showOrHide(false, infoBox);

infoBox.querySelector(".restart").onclick = () => {
  showOrHide(false, infoBox);
  showOrHide(false, nextBtn);
  showOrHide(true, quizBox);

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
      const chosenAnswer = ele.querySelector(".option span").innerText;

      if (chosenAnswer == rightAnswer) {
        ele.insertAdjacentElement("beforeend", rightEffect);
        score++;
      } else {
        quizBox.querySelectorAll(".option").forEach((e) => {
          if (e.querySelector(".option span").innerText === rightAnswer) {
            e.insertAdjacentElement("beforeend", rightEffect);
          }
        });
        ele.insertAdjacentElement("beforeend", wrongEffect);
      }

      showOrHide(true, nextBtn);
      nextBtn.onclick = () => {
        showOrHide(true, infoBox);
      };
    };
  });
};

// for (let i = 0; i < questions.length; i++) {
//   const ele = questions[i];
//   console.log(ele);
// }
