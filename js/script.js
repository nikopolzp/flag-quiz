"use strict";
// //==========================================
const $ = document.querySelector.bind(document);

const quiz = $(".quiz");
const warning = $(".warning");
const btnNext = $(".quiz__next-btn");

let count = 0;
let userScore = 0;

if (typeof questions !== "undefined" && questions.length > 0) {
  quiz.classList.remove("hidden");
  showQuestions(count);
} else {
  warning.classList.remove("hidden");
}

btnNext.addEventListener("click", nextQuestion);

function showQuestions(index) {
  const title = document.querySelector(".quiz__title");
  const image = document.querySelector(".quiz__image");
  const list = document.querySelector(".quiz__list");
  const total = document.querySelector(".quiz__total");
  const progres = document.querySelector(".quiz__progress-inner");

  image.src = questions[index].flag;
  image.alt = `${questions[index].question}`;
  image.innerHTML = questions[index].flag;
  title.innerHTML = `${questions[index].question}`;
  list.innerHTML = "";
  questions[index].options.forEach((item) => {
    const text = `<li class="quiz__option">${item}</li>`;
    list.insertAdjacentHTML("beforeend", text);
  });
  const options = list.querySelectorAll(".quiz__option");
  options.forEach((item) =>
    item.setAttribute("onclick", "optionSelected(this)")
  );
  total.innerHTML = `${index + 1} з ${questions.length}`;
  progres.style.width = `${Math.round(
    ((index + 1) / questions.length) * 100
  )}%`;
}

function optionSelected(answer) {
  const userAnswer = answer.textContent;
  const correctAnswer = questions[count].answer;
  const options = document.querySelectorAll(".quiz__option");
  const iconCorrect = "<span>&#10004;</span>";
  const iconInCorrect = "<span>&#9940;</span>";
  if (userAnswer == correctAnswer) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", iconCorrect);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", iconInCorrect);

    options.forEach((item) => {
      if (item.textContent == correctAnswer) {
        setTimeout(() => {
          item.classList.add("correct");
          item.insertAdjacentHTML("beforeend", iconCorrect);
        }, 100);
      }
    });
  }
  options.forEach((item) => item.classList.add("disabled"));
}

function nextQuestion() {
  const option = $(".quiz__option");
  const result = $(".result");
  const resultText = $(".result__text");
  if (count + 1 == questions.length && option.classList.contains("disabled")) {
    result.classList.remove("hidden");
    quiz.classList.add("hidden");
    resultText.innerHTML = `Кількість правильних відповідей: ${userScore} з ${questions.length}`;
    return;
  }

  if (option.classList.contains("disabled")) {
    count += 1;
    showQuestions(count);
  } else {
    alert("Обери один з варіантівб а потім переходь до слідуючого питання");
  }
}
