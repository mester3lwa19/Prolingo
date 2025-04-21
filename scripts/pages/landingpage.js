function toggleAnswer(buttonElement) {
    const answerDiv = buttonElement.nextElementSibling;
    const iconSpan = buttonElement.querySelector('.icon');

    if (!answerDiv.classList.contains('show')) {
        answerDiv.classList.add('show');
        iconSpan.textContent = '-';
    } else {
        answerDiv.classList.remove('show');
        iconSpan.textContent = '+';
    }
}