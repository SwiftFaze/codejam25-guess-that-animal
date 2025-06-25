/**********************************
 * KITBOGA STUFF, DONT TOUCH
 */

function captchaSuccess() {
  window.top.postMessage("success", '*');
}

/******************************** */

/**
 *
 * GLOBAL VARIABLES
 */
const image = document.getElementById("zoom-image");
let zoomLevel = 4;

if (image) {
  image.style.transform = `scale(${zoomLevel})`;
  image.style.transition = 'transform 0.5s ease';
}
guessCount = 0

const PAGE_CHANGE_DELAY = 2000;
const QUESTION_RETRY_AMOUNT = 3;


const QUESTION_1_EASY_ANSWER = '2';
const QUESTION_1_MEDIUM_ANSWER = '3';
const QUESTION_1_HARD_ANSWER = '2';

const QUESTION_2_EASY_ANSWER = 'dog';
const QUESTION_2_MEDIUM_ANSWER = 'dog';
const QUESTION_2_HARD_ANSWER = 'dog';


const QUESTION_3_EASY_ANSWER = 'meow';
const QUESTION_3_MEDIUM_ANSWER = 'hiss';
const QUESTION_3_HARD_ANSWER = 'honk';

const QUESTION_4_EASY_ANSWER = 'rabbit';
const QUESTION_4_MEDIUM_ANSWER = 'moose';
const QUESTION_4_HARD_ANSWER = 'worm';

const QUESTION_5_EASY_ANSWER = 'sharkyle';
const QUESTION_5_MEDIUM_ANSWER = 'ladyrachnocrab';
const QUESTION_5_HARD_ANSWER = 'gipelibatguin';


/******************************** */


(function (window, document) {
  playSound();


  const soundButtons = document.querySelectorAll('.sound-button');

  soundButtons.forEach(button => {
    button.addEventListener('click', () => {
      const audio = new Audio(button.dataset.sound);
      audio.play();
    });
  });


  document.getElementById("submit-guess").addEventListener("click", () => {
    onSubmitGuess()
  })


})(window, document);


function nextPage() {
  incorrectMessage()
  let filename = window.location.pathname;
  filename = filename.replace('-medi.html', '-easy.html');
  filename = filename.replace('-hard.html', '-medi.html');
  setTimeout(() => {
    window.location.href = filename;
  }, PAGE_CHANGE_DELAY);
}

function revealAnimal(message) {

  const revealImage = document.getElementById("question-reveal-image");

  if (revealImage) {
    revealImage.src = revealImage.src.replace(".png", "-reveal.png")
  }

  const msg = document.getElementById("revealed-animals");
  if (msg) {
    msg.textContent = message;
    msg.style.fontWeight = "bold";
  }
}


function incorrectMessage() {
  const msg = document.getElementById("guess-message");
  msg.textContent = "Incorrect!";
  msg.style.color = "#d93025";
  setTimeout(() => {
    msg.textContent = "";
  }, PAGE_CHANGE_DELAY);
}

function successMessage() {
  const msg = document.getElementById("guess-message");
  msg.textContent = "Correct!";
  msg.style.color = "#188038";
}


function isLastQuestion() {
  let filename = window.location.pathname;
  return filename.includes('-easy.html');
}


function isCorrectAnswer() {
  let filename = window.location.pathname;
  let userAnswer;

  const input = document.getElementById("user-answer");
  if (input) {
    userAnswer = input.value.trim().toLowerCase();
  } else {
    userAnswer = document.querySelector('input[name="answer"]:checked').value;
  }


  if (filename.includes("question-1-hard")) {
    if (userAnswer.toLowerCase() === QUESTION_1_HARD_ANSWER) {
      nextQuestion();
    } else {
      nextPage()
    }
  }
  if (filename.includes("question-1-medi")) {
    if (userAnswer.toLowerCase() === QUESTION_1_MEDIUM_ANSWER) {
      nextQuestion();
    } else {
      nextPage()
    }
  }
  if (filename.includes("question-1-easy")) {
    if (userAnswer.toLowerCase() === QUESTION_1_EASY_ANSWER) {
      nextQuestion();
    } else {
      incorrectMessage()
    }
  }


  if (filename.includes("question-2-hard")) {
    if (userAnswer.toLowerCase() === QUESTION_2_HARD_ANSWER) {
      resetZoom()
      revealAnimal(QUESTION_2_HARD_ANSWER)
      nextQuestion();
    } else {
      zoomOut(QUESTION_2_HARD_ANSWER)
    }
  }

  if (filename.includes("question-2-medi")) {
    if (userAnswer.toLowerCase() === QUESTION_2_MEDIUM_ANSWER) {
      resetZoom()
      revealAnimal(QUESTION_2_MEDIUM_ANSWER)
      nextQuestion();
    } else {
      zoomOut(QUESTION_2_MEDIUM_ANSWER)
    }
  }

  if (filename.includes("question-2-easy")) {
    if (userAnswer.toLowerCase() === QUESTION_2_EASY_ANSWER) {
      resetZoom()
      revealAnimal(QUESTION_2_EASY_ANSWER)
      nextQuestion();
    } else {
      incorrectMessage()
    }
  }


  if (filename.includes("question-3-hard")) {
    if (userAnswer.toLowerCase() === QUESTION_3_HARD_ANSWER) {
      revealAnimal(QUESTION_3_HARD_ANSWER)
      nextQuestion();
    } else {
      checkGuessCount(QUESTION_3_HARD_ANSWER)
    }
  }

  if (filename.includes("question-3-medi")) {
    if (userAnswer.toLowerCase() === QUESTION_3_MEDIUM_ANSWER) {
      revealAnimal(QUESTION_3_MEDIUM_ANSWER)
      nextQuestion();
    } else {
      checkGuessCount(QUESTION_3_MEDIUM_ANSWER)
    }
  }

  if (filename.includes("question-3-easy")) {
    if (userAnswer.toLowerCase() === QUESTION_3_EASY_ANSWER) {
      revealAnimal(QUESTION_3_EASY_ANSWER)
      nextQuestion();
    } else {
      incorrectMessage()
    }
  }


  if (filename.includes("question-4-hard")) {
    if (userAnswer.toLowerCase() === QUESTION_4_HARD_ANSWER) {
      revealAnimal(QUESTION_4_HARD_ANSWER)
      nextQuestion();
    } else {
      checkGuessCount(QUESTION_4_HARD_ANSWER)
    }
  }

  if (filename.includes("question-4-medi")) {
    if (userAnswer.toLowerCase() === QUESTION_4_MEDIUM_ANSWER) {
      revealAnimal(QUESTION_4_MEDIUM_ANSWER)
      nextQuestion();
    } else {
      checkGuessCount(QUESTION_4_MEDIUM_ANSWER)
    }
  }

  if (filename.includes("question-4-easy")) {
    if (userAnswer.toLowerCase() === QUESTION_4_EASY_ANSWER) {
      revealAnimal(QUESTION_4_EASY_ANSWER)
      nextQuestion();
    } else {
      incorrectMessage()
    }
  }


  if (filename.includes("question-5-hard")) {
    if (userAnswer.toLowerCase() === QUESTION_5_HARD_ANSWER) {
      revealAnimal(QUESTION_5_HARD_ANSWER)
      captchaSuccess()
    } else {
      checkGuessCount(QUESTION_5_HARD_ANSWER)
    }
  }
  if (filename.includes("question-5-medi")) {
    if (userAnswer.toLowerCase() === QUESTION_5_MEDIUM_ANSWER) {
      revealAnimal(QUESTION_5_MEDIUM_ANSWER)
      captchaSuccess()
    } else {
      checkGuessCount(QUESTION_5_MEDIUM_ANSWER)
    }
  }

  if (filename.includes("question-5-easy")) {
    if (userAnswer.toLowerCase() === QUESTION_5_EASY_ANSWER) {
      revealAnimal(QUESTION_5_EASY_ANSWER)
      captchaSuccess()
    } else {
      incorrectMessage()
    }
  }

}

function onSubmitGuess() {
  isCorrectAnswer()
}


function nextQuestion() {
  successMessage()
  const filename = window.location.pathname;
  const cutPath = filename.slice(0, filename.length - 11)
  const questionNumber = parseInt(filename.slice(filename.length - 11, filename.length - 10)) + 1
  const fullPath = cutPath + questionNumber + '-0.html'
  setTimeout(() => {
    window.location.href = fullPath;
  }, PAGE_CHANGE_DELAY);
}


function playSound() {
  document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', () => {
      const soundFile = button.getAttribute('data-sound');
      const audio = new Audio(soundFile);
      audio.play();
    });
  });
  document.querySelectorAll('.question-image-sound').forEach(button => {
    button.addEventListener('click', () => {
      const soundFile = button.getAttribute('data-sound');
      const audio = new Audio(soundFile);
      audio.play();
    });
  });

}

function resetZoom() {
  image.style.transform = `scale(1)`;
}

function zoomOut(message) {
  // ZOOM OUT
  if (zoomLevel > 1) {
    zoomLevel -= 1;
    image.style.transform = `scale(${zoomLevel})`;
  }
  checkGuessCount(message)
}

function checkGuessCount(message) {
  guessCount++;
  // AFTER 3 GUESSES, CHANGES PAGE, IF NOT LAST QUESTION PAGE
  if (guessCount === QUESTION_RETRY_AMOUNT && !isLastQuestion()) {
    nextPage();
    revealAnimal(message);
    guessCount = 0;
  } else {
    incorrectMessage()
  }

}





