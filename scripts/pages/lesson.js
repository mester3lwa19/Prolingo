// DOM elements
const questions = [
  {
    contentType: "explanation",
    explanation:
      "Not all HTML tags require a closing tag. Tags like <br> and <img> are self-closing.",
  },
  {
    contentType: "question",
    type: "truefalse",
    question: "All HTML tags must have a closing tag.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False — some tags like br and img are self-closing.",
  },
  {
    contentType: "coding",
    practice: `<!-- Create a self-closing image tag that displays an image from "image" -->
<img src="https://placehold.co/600x400" alt="image" />`,
  },
  {
    contentType: "explanation",

    explanation:
      'To open a link in a new tab, you must add target="_blank" inside the <a> tag.',
  },
  {
    contentType: "question",
    type: "multiple",
    question:
      'Complete the code to open a link in a new tab: a href="https://placehold.co/" ______Visit Prolingo!',
    options: ["newtab", 'target="_blank"', 'open="new"', 'window="new"'],
    correct: 1,
    explanation: 'target="_blank" opens the link in a new browser tab.',
  },
  {
    contentType: "coding",
    practice: `<!-- Create a link that opens in a new tab -->
<a href="https://example.com" target="_blank">Visit Example</a>`,
  },
  {
    contentType: "explanation",

    explanation: "The <br> tag is used to insert a line break in HTML.",
  },
  {
    contentType: "question",
    type: "multiple",
    question: "What is the correct HTML element for inserting a line break?",
    options: ["lb", "break", "br", "newline"],
    correct: 2,
    explanation: "br is the correct HTML tag for a line break.",
  },
  {
    contentType: "coding",
    practice: `<!-- Insert a line break between two paragraphs -->
<p>First paragraph.</p>
<br>
<p>Second paragraph.</p>`,
  },
  {
    contentType: "explanation",

    explanation: "The src attribute in the img tag specifies the image path.",
  },
  {
    contentType: "question",
    type: "fill",
    question: "The ______ attribute in the img tag specifies the image path.",
    options: ["href", "src", "link", "url"],
    correct: 1,
    explanation: "The src attribute is used to specify the image path.",
  },
  {
    contentType: "coding",
    practice: `<!-- Correct usage of src in an image -->
<img src="photo.jpg" alt="Sample Photo">`,
  },
  {
    contentType: "explanation",

    explanation: "HTML is a markup language, not a programming language.",
  },
  {
    contentType: "question",
    type: "truefalse",
    question:
      'HTML stands for "HyperText Markup Language" and is a programming language.',
    options: ["True", "False"],
    correct: 1,
    explanation:
      "False — HTML is a markup language, not a programming language.",
  },
  {
    contentType: "coding",
    practice: `<!-- Basic structure of an HTML document -->
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
  },
  {
    contentType: "explanation",

    explanation: "The <ul> tag defines an unordered list in HTML.",
  },
  {
    contentType: "question",
    type: "multiple",
    question: "Which tag defines an unordered list?",
    options: ["ol", "ul", "li", "list"],
    correct: 1,
    explanation: "ul is used to define an unordered list.",
  },
  {
    contentType: "coding",
    practice: `<!-- Create an unordered list with three items -->
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>`,
  },
  {
    contentType: "explanation",

    explanation: "h1 is the largest heading tag used for main headings.",
  },
  {
    contentType: "question",
    type: "fill",
    question: "The ______ tag is used for the main heading (largest size).",
    options: ["h6", "head", "h1", "header"],
    correct: 2,
    explanation: "h1 is the largest heading tag in HTML.",
  },
  {
    contentType: "coding",
    practice: `<!-- Main heading example -->
<h1>Welcome to My Website</h1>`,
  },
  {
    contentType: "explanation",

    explanation:
      "Meta tags should be placed inside the head section, not the body.",
  },
  {
    contentType: "question",
    type: "truefalse",
    question: "The meta tag belongs inside the body section.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False — the meta tag should be placed in the head section.",
  },
  {
    contentType: "coding",
    practice: `<!-- Meta tag example inside head -->
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>`,
  },
  {
    contentType: "explanation",

    explanation: "The <a> tag creates hyperlinks to other pages or sections.",
  },
  {
    contentType: "question",
    type: "multiple",
    question: "Which tag creates a hyperlink?",
    options: ["link", "a", "href", "hyperlink"],
    correct: 1,
    explanation: "a is the anchor tag used to create hyperlinks.",
  },
  {
    contentType: "coding",
    practice: `<!-- Basic hyperlink example -->
<a href="https://openai.com">Visit OpenAI</a>`,
  },
  {
    contentType: "explanation",
    explanation: "Use strong or b tags to make text bold.",
  },
  {
    contentType: "question",
    type: "fill",
    question: "To make text bold, use the ______ tag.",
    options: ["strong or b", "bold", "em", "big"],
    correct: 0,
    explanation: "Both strong and b can be used to make text bold.",
  },
  {
    contentType: "coding",
    practice: `<!-- Bold text examples -->
<p><strong>Important</strong> information.</p>
<p><b>Another</b> way to bold text.</p>`,
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector(".answer-button");
const explanationElement = document.querySelector("#explanation");
const nextBtn = document.querySelector(".next-btn");
const questionCounter = document.querySelector(".question-counter");
const progressBar = document.querySelector(".progress-bar");
const progressBarContainer = document.querySelector(".progress-bar-container");
const quiz_header = document.querySelector(".quiz-header");
const coding_area = document.getElementsByClassName("coding-area");
console.log(coding_area);
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
  // Check if the current question is an explanation
  if (currentQuestion.contentType === "explanation") {
    coding_area[0].style.display = "none";
    questionElement.textContent = currentQuestion.explanation;
    questionElement.classList.add("pure_explanation");

    nextBtn.style.display = "block";
  } else if (currentQuestion.contentType === "question") {
    coding_area[0].style.display = "none";

    questionElement.classList.remove("pure_explanation");
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("btn", "option-button");
      button.dataset.index = index;
      answerButtons.appendChild(button);
      nextBtn.style.display = "block";
    });
  } else if (
    currentQuestion.contentType === "question" &&
    currentQuestion.type === "truefalse"
  ) {
    nextBtn.disabled = true;
    questionElement.classList.remove("pure_explanation");
    coding_area[0].style.display = "none";
    questionElement.textContent = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("btn", "option-button");
      button.dataset.index = index;
      answerButtons.appendChild(button);
    });
    nextBtn.disabled = false;

    nextBtn.style.display = "block";
  } else if (currentQuestion.contentType === "coding") {
    questionElement.classList.remove("pure_explanation");
    questionElement.textContent = currentQuestion.practice;
    coding_area[0].style.display = "flex";
    // Get the textarea and iframe elements
    const codeInput = document.getElementById("codeInput");
    const outputFrame = document.getElementById("outputFrame");

    if (codeInput && outputFrame) {
      // Listen for changes in the textarea
      codeInput.addEventListener("input", () => {
        const code = codeInput.value;
        const iframeDocument =
          outputFrame.contentDocument || outputFrame.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(code);
        iframeDocument.close();
      });
    } else {
      console.warn("Could not find codeInput or outputFrame element.");
    }
    nextBtn.style.display = "block";
  }
  // Update question counter
  updateProgress();
}

function updateProgress() {
  // Update question counter text
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length
    }`;

  // Update progress bar width
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function resetState() {
  coding_area[0].style.display = "none";
  questionElement.classList.remove("pure_explanation");
  questionElement.textContent = "";
  explanationElement.textContent = "";
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  explanationElement.textContent = "";
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
  questionElement.textContent = `Quiz Completed! want to take it again?`;

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
