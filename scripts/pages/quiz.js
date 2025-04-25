// Quiz Module Pattern
const QuizApp = (function () {
    // Private variables
    const state = {
        quizData: [],
        currentQuestion: 0,
        userAnswers: [],
        score: 0,
        animationInProgress: false,
    };

    // DOM Elements
    const elements = {
        questionText: document.getElementById("questionText"),
        answerOptions: document.getElementById("answerOptions"),
        answerSection: document.getElementById("answerSection"),
        answerResult: document.getElementById("answerResult"),
        answerExplanation: document.getElementById("answerExplanation"),
        message: document.getElementById("message"),
        progressText: document.getElementById("progressText"),
        progressFill: document.getElementById("progressFill"),
        questionNumber: document.getElementById("questionNumber"),
        pagination: document.getElementById("pagination"),
        prevBtn: document.getElementById("prevBtn"),
        nextBtn: document.getElementById("nextBtn"),
        checkBtn: document.getElementById("checkBtn"),
        resultsModal: document.getElementById("resultsModal"),
        resultsTitle: document.getElementById("resultsTitle"),
        resultsMessage: document.getElementById("resultsMessage"),
        retryQuizBtn: document.getElementById("retryQuiz"),
        closeModalBtn: document.getElementById("closeModal"),
    };

    // Utility Functions
    function formatQuestionText(text) {
        let formattedText = text.replace(/`([^`]+)`/g, "<code>$1</code>");
        formattedText = formattedText.replace(
            /```([^`]+)```/g,
            "<pre><code>$1</code></pre>"
        );
        return formattedText;
    }

    function updateButtonStates() {
        elements.prevBtn.disabled = state.currentQuestion === 0;
        elements.nextBtn.disabled = false;

        if (state.currentQuestion === state.quizData.length - 1) {
            elements.nextBtn.textContent = "Finish Quiz";
        } else {
            elements.nextBtn.textContent = "Next";
        }
    }

    function updateProgress() {
        const progress = ((state.currentQuestion + 1) / state.quizData.length) * 100;
        elements.progressFill.style.width = `${progress}%`;
        elements.progressText.textContent = `Question ${state.currentQuestion + 1} of ${state.quizData.length}`;
        elements.questionNumber.textContent = `${state.currentQuestion + 1}/${state.quizData.length}`;
        
        // Update pagination
        elements.pagination.innerHTML = state.quizData
            .map((_, i) => `<span class="${i === state.currentQuestion ? 'active' : ''}" 
                             onclick="QuizApp.goToQuestion(${i})"></span>`)
            .join('');
    }

    // Core Quiz Functions
    function loadQuiz() {
        fetch("../html_quiz_questions.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // Get the raw text first
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); // Then parse it
                    console.log("Successfully parsed quiz data:", data);
                    state.quizData = [...data];
                    state.userAnswers = new Array(state.quizData.length).fill(null);
                    loadQuestion();
                } catch (parseError) {
                    console.error("Error parsing JSON:", parseError);
                    console.error("Raw JSON text:", text);
                    elements.questionText.innerHTML = `<h2>Error parsing quiz data</h2>`;
                }
            })
            .catch(error => {
                console.error("Error loading quiz questions:", error);
                elements.questionText.innerHTML = `
                    <h2>Error loading questions</h2>
                    <p>${error.message}</p>
                `;
                elements.checkBtn.disabled = true;
                elements.nextBtn.disabled = true;
            });
    }

    async function loadQuestion() {
        if (state.quizData.length === 0 || state.animationInProgress) return;
        state.animationInProgress = true;

        try {
            const q = state.quizData[state.currentQuestion];

            // Update progress
            updateProgress();

            // Add fade-out animation
            elements.questionText.classList.add("fade-out");
            await new Promise((resolve) => setTimeout(resolve, 300));
            elements.questionText.innerHTML = `<h2>${formatQuestionText(q.question)}</h2>`;
            elements.questionText.classList.remove("fade-out");
            elements.questionText.classList.add("fade-in");

            // Generate answer options
            const optionsHTML = q.options
                .map(
                    (opt, idx) => `
                <label>
                    <input type="radio" name="answer" value="${idx}" 
                        ${state.userAnswers[state.currentQuestion] === idx ? "checked" : ""} />
                    ${opt}
                </label>`
                )
                .join("");

            elements.answerOptions.innerHTML = optionsHTML;
            elements.answerSection.style.display = "none";
            elements.message.textContent = "";

            updateButtonStates();
        } catch (error) {
            console.error("Error loading question:", error);
            elements.questionText.innerHTML = `<h2>Error loading question</h2>`;
            elements.message.textContent = "There was an error loading the question.";
        } finally {
            state.animationInProgress = false;
        }
    }

    // Navigation Functions
    function goToQuestion(index) {
        if (index >= 0 && index < state.quizData.length) {
            state.currentQuestion = index;
            loadQuestion();
        }
    }

    function goPrevious() {
        if (state.currentQuestion > 0) {
            state.currentQuestion--;
            loadQuestion();
        }
    }

    function goNext() {
        if (state.currentQuestion < state.quizData.length - 1) {
            state.currentQuestion++;
            loadQuestion();
        } else {
            showResults();
        }
    }

    // Answer Checking
    function checkAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');

        if (!selected) {
            elements.message.textContent = "Please select an answer first!";
            elements.message.style.color = "var(--primary-color)";
            return;
        }

        const q = state.quizData[state.currentQuestion];
        const userAnswer = parseInt(selected.value);
        state.userAnswers[state.currentQuestion] = userAnswer;

        const isCorrect = userAnswer === q.correct;
        const correctAnswer = q.options[q.correct];

        if (isCorrect) {
            state.score++;
        }

        elements.answerResult.innerHTML = isCorrect
            ? "✅ Correct! Well done!"
            : `❌ Incorrect. The correct answer is: <strong>${correctAnswer}</strong>`;

        elements.answerResult.style.color = isCorrect ? "#6bcb77" : "#ff6b6b";
        elements.answerExplanation.textContent = q.explanation;
        elements.answerSection.style.display = "block";
    }

    // Results Modal
    function showResults() {
        const correctCount = calculateScore();
        const percentage = Math.round((correctCount / state.quizData.length) * 100);

        elements.resultsTitle.textContent = "Quiz Completed!";
        elements.resultsMessage.innerHTML = `
        You scored <strong>${correctCount} out of ${state.quizData.length}</strong> 
        (${percentage}%)<br><br>
        ${getResultMessage(percentage)}
    `;

        elements.resultsModal.classList.add("active");
    }

    function calculateScore() {
        return state.quizData.reduce((count, q, i) => {
            const userAnswer = state.userAnswers[i];
            if (userAnswer === null) return count;
            return userAnswer === q.correct ? count + 1 : count;
        }, 0);
    }

    function getResultMessage(percentage) {
        if (percentage >= 90) return "Excellent work! You've mastered these concepts!";
        if (percentage >= 70) return "Great job! You have a good understanding.";
        if (percentage >= 50) return "Not bad! Review the questions you missed to improve.";
        return "Keep practicing! Review the lessons and try again.";
    }

    function resetQuiz() {
        state.currentQuestion = 0;
        state.userAnswers = new Array(state.quizData.length).fill(null);
        state.score = 0;
        loadQuestion();
        elements.resultsModal.classList.remove("active");
    }

    // Initialize
    function init() {
        elements.prevBtn.addEventListener("click", goPrevious);
        elements.nextBtn.addEventListener("click", goNext);
        elements.checkBtn.addEventListener("click", checkAnswer);
        elements.retryQuizBtn.addEventListener("click", resetQuiz);
        elements.closeModalBtn.addEventListener("click", () => {
            elements.resultsModal.classList.remove("active");
            window.location.href = "/pages/lessons.html";
        });

        loadQuiz();
    }

    // Public API
    return {
        init,
        goToQuestion,
        goPrevious,
        goNext,
        checkAnswer,
    };
})();

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", QuizApp.init);