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
const START_ZOOM_LEVEL = 20;
const MIN_ZOOM = 1;
const QUESTION_RETRY_AMOUNT = 3;
const PAGE_CHANGE_DELAY = 3000;

let zoomLevel = START_ZOOM_LEVEL;
if (image) {
  image.style.transform = `scale(${zoomLevel})`;
  image.style.transition = 'transform 0.5s ease';
}

let guessCount = 0;
let zoomCount = 0;


const QUESTION_1_EASY_ANSWER = '2';
const QUESTION_1_MEDIUM_ANSWER = '3';
const QUESTION_1_HARD_ANSWER = '2';

const QUESTION_2_EASY_ANSWER = 'giraffe';
const QUESTION_2_MEDIUM_ANSWER = 'jackrabbit';
const QUESTION_2_HARD_ANSWER = 'hedgehog';


const QUESTION_3_EASY_ANSWER = 'meow';
const QUESTION_3_MEDIUM_ANSWER = 'hiss';
const QUESTION_3_HARD_ANSWER = 'hoannk';

const QUESTION_4_EASY_ANSWER = 'rabbit';
const QUESTION_4_MEDIUM_ANSWER = 'moose';
const QUESTION_4_HARD_ANSWER = 'worm';

const QUESTION_5_EASY_ANSWER = 'sharkyle';
const QUESTION_5_MEDIUM_ANSWER = 'ladyrachnocrab';
const QUESTION_5_HARD_ANSWER = 'gipelibatguin';

const QUESTION_5_EASY_COMBO = {
  shark: "shark",
  crocodile: "yle",
};

const QUESTION_5_MEDI_COMBO = {
  ladybug: "lady",
  scorpion: "rachno",
  crab: "crab",
};
const QUESTION_5_HARD_COMBO = {
  giraffe: "gi",
  pelican: "peli",
  bat: "bat",
  penguin: "guin"
};
let QUESTION_5_EASY_COMBO_ANSWER = Object.keys(QUESTION_5_EASY_COMBO)
let QUESTION_5_MEDI_COMBO_ANSWER = Object.keys(QUESTION_5_MEDI_COMBO)
let QUESTION_5_HARD_COMBO_ANSWER = Object.keys(QUESTION_5_HARD_COMBO)

let revealedLettersHard = Array(QUESTION_5_HARD_ANSWER.length).fill("_");
let revealedLettersMedium = Array(QUESTION_5_MEDIUM_ANSWER.length).fill("_");
let revealedLettersEasy = Array(QUESTION_5_EASY_ANSWER.length).fill("_");
/******************************** */


(function (window, document) {
  playSound();

  disableButton();


  const guessButton = document.getElementById("submit-guess");
  if (guessButton) {
    guessButton.addEventListener("click", () => {
      onSubmitGuess();
    });
  }


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

function revealLastAnimal(guessedAnimal, fullAnswer, comboMap, revealedLetters) {
  const guess = guessedAnimal.toLowerCase();
  const part = comboMap[guess];
  if (!part) {
    return;
  }
  const matchIndex = fullAnswer.indexOf(part);
  if (matchIndex === -1) {
    return;
  }
  for (let i = 0; i < part.length; i++) {
    revealedLetters[matchIndex + i] = fullAnswer[matchIndex + i];
  }
  const displayString = revealedLetters.join("");
  document.getElementById("revealed-animals").textContent = displayString;
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
    input.value = ""
    disableButton()
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
      zoomOut(QUESTION_2_EASY_ANSWER)
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
    const answer = userAnswer.toLowerCase();
    const index = QUESTION_5_HARD_COMBO_ANSWER.indexOf(answer);
    if (index !== -1) {
      QUESTION_5_HARD_COMBO_ANSWER.splice(index, 1);
      revealLastAnimal(answer, QUESTION_5_HARD_ANSWER, QUESTION_5_HARD_COMBO, revealedLettersHard);
      successMessage();

      if (QUESTION_5_HARD_COMBO_ANSWER.length === 0) {
        revealAnimal(QUESTION_5_HARD_ANSWER);
        captchaSuccess();
      }
    } else {
      checkGuessCount(QUESTION_5_HARD_ANSWER);
    }
  }


  if (filename.includes("question-5-medi")) {
    const answer = userAnswer.toLowerCase();
    const index = QUESTION_5_MEDI_COMBO_ANSWER.indexOf(answer);
    if (index !== -1) {
      QUESTION_5_MEDI_COMBO_ANSWER.splice(index, 1);
      revealLastAnimal(answer, QUESTION_5_MEDIUM_ANSWER, QUESTION_5_MEDI_COMBO, revealedLettersMedium);
      successMessage();
      if (QUESTION_5_MEDI_COMBO_ANSWER.length === 0) {
        revealAnimal(QUESTION_5_MEDIUM_ANSWER);
        captchaSuccess();
      }
    } else {
      checkGuessCount(QUESTION_5_MEDIUM_ANSWER);
    }
  }


  if (filename.includes("question-5-easy")) {
    const answer = userAnswer.toLowerCase();
    const index = QUESTION_5_EASY_COMBO_ANSWER.indexOf(answer);
    if (index !== -1) {
      QUESTION_5_EASY_COMBO_ANSWER.splice(index, 1);
      revealLastAnimal(answer, QUESTION_5_EASY_ANSWER, QUESTION_5_EASY_COMBO, revealedLettersEasy);
      successMessage();
      if (QUESTION_5_EASY_COMBO_ANSWER.length === 0) {
        revealAnimal(QUESTION_5_EASY_ANSWER);
        captchaSuccess();
      }
    } else {
      checkGuessCount(QUESTION_5_EASY_ANSWER);
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
  zoomCount++;
  if (guessCount < (QUESTION_RETRY_AMOUNT - 1)) {
    const t = zoomCount / (QUESTION_RETRY_AMOUNT - 1);
    zoomLevel = START_ZOOM_LEVEL * Math.pow(MIN_ZOOM / START_ZOOM_LEVEL, t);
    image.style.transform = `scale(${zoomLevel})`;
  }
  checkGuessCount(message);
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
function disableButton() {
  const input = document.getElementById("user-answer");
  const button = document.getElementById("submit-guess");
  if (input && button) {
    button.disabled = input.value.trim() === "";
    input.addEventListener("input", () => {
      button.disabled = input.value.trim() === "";
    });
  }

}

