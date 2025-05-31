(function (window, document) {




  onSolveClick();


  playSound();





  const soundButtons = document.querySelectorAll('.sound-button');
  const validateButton = document.getElementById('validate-button');
  const feedback = document.getElementById('feedback');

  soundButtons.forEach(button => {
    button.addEventListener('click', () => {
      const audio = new Audio(button.dataset.sound);
      audio.play();
    });
  });

  validateButton.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
      feedback.textContent = "Please select an answer.";
      feedback.style.color = "orange";
      return;
    }



    if (selected.value === "true") {
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
      nextQuestion()
    } else {
      feedback.textContent = "Incorrect!";
      feedback.style.color = "red";
      nextPage();

    }
  });



})(window, document);


function nextPage() {
  let filename = window.location.pathname;
  filename = filename.replace('-medi.html', '-easy.html');
  filename = filename.replace('-hard.html', '-medi.html');
  setTimeout(() => {
    window.location.href = filename;
  }, 1500);
}


function nextQuestion() {
  const filename = window.location.pathname;
  const cutPath = filename.slice(0, filename.length - 11)
  const questionNumber = parseInt(filename.slice(filename.length - 11, filename.length - 10)) +1
  const fullPath = cutPath + questionNumber + '-0.html'
  setTimeout(() => {
    window.location.href = fullPath;
  }, 1500);
}

function onSolveClick() {
  document.getElementById('solve')
      .addEventListener('click', () => captchaSuccess());
}


function captchaSuccess() {
  window.top.postMessage("success", '*');
}





function playSound() {
  document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', () => {
      const soundFile = button.getAttribute('data-sound');
      const audio = new Audio(soundFile);
      audio.play();
    });
  });
}
