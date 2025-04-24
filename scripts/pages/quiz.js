let quizData = [];
let currentQuestion = 0;

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function loadQuizData() {
  const response = await fetch('html_quiz_questions');
  quizData = await response.json();
  loadQuestion();
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  const questionText = document.getElementById('question-text');
  const answersDiv = document.getElementById('answers');
  const feedback = document.getElementById('feedback');
  const progressText = document.getElementById('progress-text');

  if (!q || !q.question || !q.options || q.options.length === 0) {
    questionText.innerHTML = "⚠️ Error loading this question.";
    answersDiv.innerHTML = "<p>No answer options available.</p>";
    return;
  }

  questionText.innerHTML = escapeHTML(q.question);
  answersDiv.innerHTML = '';

  if (q.type === "fill") {
    const select = document.createElement('select');
    select.id = "fill-answer";

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select an answer";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    q.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = escapeHTML(option);
      select.appendChild(opt);
    });

    answersDiv.appendChild(select);
  } else {
    q.options.forEach((option, i) => {
      const label = document.createElement('label');
      const escapedOption = escapeHTML(option);
      label.innerHTML = `<input type="radio" name="option" value="${i}"> ${escapedOption}`;
      answersDiv.appendChild(label);
    });
  }

  feedback.style.display = 'none';
  progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function checkAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  const fillAnswer = document.getElementById('fill-answer');

  if (fillAnswer) {
    // Handle 'fill' questions with dropdown selection
    const userAnswer = fillAnswer.value.trim();
    const isCorrect = userAnswer === quizData[currentQuestion].correct;

    // Removed the showFeedback function call
  } else if (!selected) {
    // Handle error if no option is selected
    return alert("Please select an option!");
  } else {
    // Handle multiple choice or true/false questions
    const isCorrect = parseInt(selected.value) === quizData[currentQuestion].correct;

    // Removed the showFeedback function call
    displaySimpleFeedback(isCorrect);
  }
}


function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

document.addEventListener("DOMContentLoaded", loadQuizData);
