(function (window, document) {

  changeAndHideQuestion();


  onSolveClick();

})(window, document);

function onSolveClick() {
  document.getElementById('solve')
      .addEventListener('click', () => captchaSuccess());
}


function captchaSuccess() {
  window.top.postMessage("success", '*');
}


function changeAndHideQuestion() {
  let questions = document.querySelectorAll('.question-container, .question-container-hidden');
  let currentQuestion = 0;
  questions.forEach((question, index) => {
    const buttons = question.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        //CHANGES CLASS ON CLICK
        question.classList.remove('question-container');
        question.classList.add('question-container-hidden');
        currentQuestion++;

        if (currentQuestion < questions.length) {
          questions[currentQuestion].classList.remove('question-container-hidden');
          questions[currentQuestion].classList.add('question-container');
        } else {
          document.getElementById('solve').style.display = 'block';
        }
      });
    });
  });
}
