// Mobile menu toggle

const menuToggle = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// const questions = [
//   {
//     type: "truefalse",
//     question: "All HTML tags must have a closing tag.",
//     options: ["True", "False"],
//     correct: 1,
//     explanation: "False — some tags like br and img are self-closing.",
//   }
// ];
const questions = [
  {
    type: "truefalse",
    question: "All HTML tags must have a closing tag.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False — some tags like br and img are self-closing.",
  },
  {
    type: "multiple",
    question:
      'Complete the code to open a link in a new tab: a href="https://prolingo.com" ______Visit Prolingo!',
    options: ["newtab", 'target="_blank"', 'open="new"', 'window="new"'],
    correct: 1,
    explanation: 'target="_blank" opens the link in a new browser tab.',
  },
  {
    type: "multiple",
    question: "What is the correct HTML element for inserting a line break?",
    options: ["lb", "break", "br", "newline"],
    correct: 2,
    explanation: "br is the correct HTML tag for a line break.",
  },
  {
    type: "fill",
    question:
      "The ______ attribute in the img tag specifies the image path.",
    options: ["href", "src", "link", "url"],
    correct: 1,
    explanation: "The src attribute is used to specify the image path.",
  },
  {
    type: "truefalse",
    question:
      'HTML stands for "HyperText Markup Language" and is a programming language.',
    options: ["True", "False"],
    correct: 1,
    explanation:
      "False — HTML is a markup language, not a programming language.",
  },
  {
    type: "multiple",
    question: "Which tag defines an unordered list?",
    options: ["ol", "ul", "li", "list"],
    correct: 1,
    explanation: "ul is used to define an unordered list.",
  },
  {
    type: "fill",
    question: "The ______ tag is used for the main heading (largest size).",
    options: ["h6", "head", "h1", "header"],
    correct: 2,
    explanation: "h1 is the largest heading tag in HTML.",
  },
  {
    type: "truefalse",
    question: "The meta tag belongs inside the body section.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False — the meta tag should be placed in the head section.",
  },
  {
    type: "multiple",
    question: "Which tag creates a hyperlink?",
    options: ["link", "a", "href", "hyperlink"],
    correct: 1,
    explanation: "&lt;a&gt; is the anchor tag used to create hyperlinks.",
  },
  {
    type: "fill",
    question: "To make text bold, use the ______ tag.",
    options: ["strong or b", "bold ", "em", "big"],
    correct: 0,
    explanation: "Both strong and b can be used to make text bold.",
  },
];

// DOM elements
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector(".answer-button");
const explanationElement = document.querySelector("#explanation");
const nextBtn = document.querySelector(".next-btn");
const questionCounter = document.querySelector(".question-counter");
const progressBar = document.querySelector(".progress-bar");
const progressBarContainer = document.querySelector(".progress-bar-container");
const quiz_header = document.querySelector(".quiz-header");
// Quiz state
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.textContent = "Next";
  nextBtn.style.display = "none";

  // Make sure progress elements are visible when restarting
  questionCounter.style.display = "block";
  progressBar.style.display = "block";
  quiz_header.style.display = "block";
  updateProgress();
  loadQuestion();
}

function loadQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("btn", "option-button");
    button.dataset.index = index;
    answerButtons.appendChild(button);
  });

  // Update question counter
  updateProgress();
}

function updateProgress() {
  // Update question counter text
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;

  // Update progress bar width
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function resetState() {
  explanationElement.textContent = "";
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  if (!e.target.classList.contains("option-button")) return;

  const selectedButton = e.target;
  const selectedIndex = parseInt(selectedButton.dataset.index);
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.correct;

  selectedButton.classList.add(isCorrect ? "correct" : "incorrect");

  if (!isCorrect) {
    const correctButton = answerButtons.querySelector(
      `button[data-index="${currentQuestion.correct}"]`
    );
    correctButton.classList.add("correct");
  }

  if (isCorrect) score++;
  explanationElement.textContent = currentQuestion.explanation;
  explanationElement.classList.add("explanation");
  // explanationElement.style.display = "block";
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });

  nextBtn.style.display = "block";
  
}

function showResults() {
  resetState();
  questionElement.textContent = `Quiz Completed! Your score: ${score} out of ${questions.length}`;

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.classList.add("btn", "restart-btn");
  restartBtn.addEventListener("click", startQuiz);
  answerButtons.appendChild(restartBtn);
  quiz_header.style.display = "none";
  // Hide progress elements when quiz is complete
  questionCounter.style.display = "none";
  progressBarContainer.style.display = "none";
}

// Event Listeners
answerButtons.addEventListener("click", selectAnswer);

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  explanationElement.classList.remove("explanation");
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Initialize quiz
document.addEventListener("DOMContentLoaded", startQuiz);
