const questionsArr = [
  { SEENTPITR: "PINTEREST" },
  { NILE: "LINE" },
  { XMI: "MIX" },
  { WITCHT: "TWITCH" },
  { LOUNDCSUOD: "SOUNDCLOUD" },
  { RATNAMSGI: "INSTAGRAM" },
  { IDTDRE: "REDDIT" },
  { CEBOFAOK: "FACEBOOK" },
  { EITWTRT: "TWITTER" },
  { AKCSL: "SLACK" },
  { PWPHTASA: "WHATSAPP" },
  { QQ: "QQ" },
  { YEPSK: "SKYPE" },
  { ERTAHSYOUTP: "HOUSEPARTY" },
  { CHSTNAAP: "SNAPCHAT" },
  { INNLKDEI: "LINKEDIN" },
  { GRAMTEEL: "TELEGRAM" },
  { ODOBA: "BADOO" },
  { KOKITT: "TIKTOK" },
  { OXENODTR: "NEXTDOOR" },
  { BEYOUUT: "YOUTUBE" },
  { MOZO: "ZOOM" },
  { DIEORFUNNY: "FUNNYORDIE" },
  { CRKLIF: "FLICKR" },
  { AQRUO: "QUORA" },
  { RILLETR: "TRILLER" },
  { OMVIE: "VIMEO" },
  { UMIDEM: "MEDIUM" },
  { TRIEB: "TRIBE" },
  { HATEWC: "WECHAT" },
  { PCAHPSA: "CASHAPP" },
  { LYFANSNO: "ONLYFANS" },
];

const game = {
  header: document.getElementById("header"),
  difficulty: document.getElementById("difficulty"),
  header: document.getElementById("header"),
  sound: document.getElementById("sound"),
  about: document.getElementById("about"),
  about_button: document.getElementById("about_button"),
  sound_button: document.getElementById("sound_button"),
  close_button: document.getElementById("close_button"),
  menuButton: document.getElementById("menu_button"),
  rightCaretOne: document.getElementById("fa-angle-right-one"),
  rightCaretTwo: document.getElementById("fa-angle-right-two"),
  logoText: document.getElementById("logo_text"),
  home: document.getElementById("home_page"),
  begin: document.getElementById("begin_button"),
  ready_view: document.getElementById("ready_view"),
  about_view: document.getElementById("about_view"),
  difficultySelect: document.getElementById("difficulty_select"),
  novice: document.getElementById("novice"),
  pro: document.getElementById("pro"),
  gee: document.getElementById("gee"),
  start: document.getElementById("play_button"),
  gameView: document.getElementById("game_view"),
  pauseButton: document.getElementById("pause_button"),
  gamePausedContainer: document.getElementById("game_paused_container"),
  pauseScore: document.getElementById("pause_score"),
  resumeGameButton: document.getElementById("resume_game_button"),
  score: document.getElementById("score_button"),
  questionNumber: document.getElementById("question_index"),
  question: document.getElementById("question"),
  answer: document.getElementById("answer"),
  answerContainer: document.getElementById("answer_container"),
  gameTime: document.getElementById("gameTime"),
  correctSound: document.getElementById("correct_sound"),
  wrongSound: document.getElementById("wrong_sound"),
  timeupSound: document.getElementById("timeup_sound"),
  gameoverSound: document.getElementById("gameover_sound"),

  restartButton: document.getElementById("restart_button"),
  restartNo: document.getElementById("restart_no"),
  restartYes: document.getElementById("restart_yes"),

  gameRestartContainer: document.getElementById("game_restart_container"),
  exitButton: document.getElementById("exit_button"),
  exitNo: document.getElementById("exit_no"),
  exitYes: document.getElementById("exit_yes"),
  gameExitContainer: document.getElementById("game_exit_container"),
  userInput: document.getElementById("user_input"),
  errorText: document.getElementById("error_text"),
  confirm: document.getElementById("confirm_button"),
  gameOverContainer: document.getElementById("game_over_container"),
  Playagain: document.getElementById("play_again"),
  finalScore: document.getElementById("final_score"),
  nosFailed: document.getElementById("nos_failed"),

  timerStarted: false,
  gamePaused: false,
  answerIsCorrect: false,
  Answered: 0,
  failedToAnswer: 0,
  letter: 0,
  splitText: document.getElementById("logo_text").textContent.split(""),
  allQuestions: (index) => {
    if (index == "all") {
      return Object.keys(questionsArr);
    } else {
      return Object.keys(questionsArr[index]);
    }
  },
  // allQuestions: Object.keys(questionsArr[index]).map((quest, index) => {
  //   return quest[index];
  // }),

  show(element) {
    element.style.display = "block";
  },
  hide(element) {
    element.style.display = "none";
  },
  questionText: () => {},
  answerText: () => {},

  //\___________________Show menu list__________________//\

  displayMenuList() {
    this.menuButton.addEventListener("click", () => {
      this.sound_button.classList.toggle("active_sound"),
        setTimeout(() => {
          this.about_button.classList.toggle("active_about");
        }, 100);

      this.rightCaretOne.classList.toggle("fa-angle-right_inactive"),
        this.rightCaretTwo.classList.toggle("fa-angle-right_inactive");
    });
  },
  displayDifficulty() {
    this.difficultySelect.addEventListener("click", () => {
      this.novice.classList.toggle("active_novice");
      this.pro.classList.toggle("active_pro");
      this.gee.classList.toggle("active_gee");
      this.difficultySelect.classList.toggle("difficulty_select_active");
    });
  },
  //\___________________Style logo text__________________//\
  styleLogoText() {
    this.logoText.textContent = "";
    for (i = 0; i < this.splitText.length; i++) {
      this.logoText.innerHTML += "<span>" + this.splitText[i] + "</span>";
    }
  },
  styleTimer() {
    logoTimer = setInterval(() => {
      this.styledLetter();
    }, 300);
  },
  styledLetter() {
    const span = this.logoText.querySelectorAll("span")[this.letter];
    setTimeout(() => {
      span.classList.add("flow");
    }, 10);
    setTimeout(() => {
      span.classList.add("col_span");
    }, 4000);
    this.letter++;
    if (this.letter === this.splitText.length) {
      this.styleComplete();
      return;
    }
  },
  styleComplete() {
    clearInterval(logoTimer);
    logoTimer = null;
  },
  displayAboutView() {
    this.about_button.addEventListener("click", () => {
      this.about_view.classList.toggle("active_about_view")
    });
    this.close_button.addEventListener("click", () => {
      this.about_view.classList.toggle("active_about_view")
    });
  },
  displayReadyView() {
    this.begin.addEventListener("click", () => {
      this.hide(this.home), this.show(this.ready_view);
    });
  },

  displayGameView() {
    this.hide(this.header),
      this.hide(this.home),
      this.hide(this.ready_view),
      this.show(this.gameView);
  },
  handleTimerStart() {
    timer = setInterval(() => {
      if (time <= 0.5 * timeCheck && time >= 0.3 * timeCheck) {
        this.gameTime.style.color = "#fff200";
      } else if (time <= 0.3 * timeCheck) {
        this.gameTime.style.color = "red";
      }
      this.gameTime.innerText = time + "s";
      time--;
      if (time < 0) {
        this.handleTimerStop();
        this.gameTime.innerText = "Time up";
        this.timeupSound.play();
        this.userInput.blur();
        this.failedToAnswer++;
        this.nosFailed.innerText = this.failedToAnswer;
        if (this.failedToAnswer > 2) {
          this.displayGameOver();
        } else {
          this.invalidateUserInput();
        }
      }
    }, 1000);
  },
  handleTimerStop() {
    clearInterval(timer);
    this.timerStarted = false;
    console.log("timer stopped");
  },

  getTimeLimit(text, answer) {
    time = Math.round(0.3 * text.join().length * answer.join().length);

    timeCheck = time;
    this.gameTime.innerText = time + "s";
  },
  generateQuestions() {
    if (!this.gamePaused) {
      this.gameTime.innerText = "---";
      this.question.innerText = "loading...";
      this.userInput.disabled = true;
      this.userInput.innerText = "";

      //\___________________To generate random questions from the question array__________________//\

      setTimeout(() => {
        this.userInput.innerText = "";

        this.userInput.disabled = false;
        this.userInput.focus();
        this.answerIsCorrect == false;
        questionIndex = Math.floor(
          Math.random() * this.allQuestions("all").length
        );
        this.question.innerText = this.allQuestions(questionIndex);
        this.answer.innerText = Object.values(questionsArr[questionIndex])
          .join()
          .toUpperCase();
        this.getTimeLimit(
          this.allQuestions(questionIndex),
          Object.values(questionsArr[questionIndex])
        ); //\___________________get time limit__________________//\

        this.gameTime.style.color = " #1fc07d";
        this.questionNumber.innerText++;

        //\___________________stop timer from double starting__________________//\

        if (!this.timerStarted) {
          this.handleTimerStart();
          this.timerStarted = true;
          console.log("timer started");
        }
      }, 1500);
    }
  },

  //\___________________handle user Inputs__________________//\
  validateUserInput() {
    this.correctSound.play();
    this.handleTimerStop();
    this.answerIsCorrect = true;
    this.errorText.innerText = "Correct";
    this.errorText.style.color = " #1fc07d";
    this.errorText.style.opacity = "1";
    this.confirm.style.backgroundColor = " #1fc07d";
    this.score.innerText = Number(this.score.innerText);
    this.score.innerText = Number(this.score.innerText) + Number(5);
    this.userInput.blur();
    //prevent a text from appearing twice
    // this.allQuestions("all").splice(
    //   this.allQuestions("all").indexOf(this.allQuestions(this.questionIndex)),
    //   1
    // );

    setTimeout(() => {
      this.answerIsCorrect = false;
      this.errorText.style.opacity = "0";
      this.generateQuestions();
      this.userInput.focus();

      this.confirm.style.backgroundColor = " #1fc07d";
      this.userInput.value = "";
    }, 1500);
  },
  invalidateUserInput() {
    this.handleTimerStop();
    this.answerIsCorrect = true;
    this.errorText.innerText = "Time Up!";
    this.errorText.style.color = "red";
    this.errorText.style.opacity = "1";
    this.confirm.style.backgroundColor = "red";
    this.score.innerText = Number(this.score.innerText);
    this.score.innerText = Number(this.score.innerText) + Number(0);
    this.userInput.blur();

    this.show(this.answerContainer);

    //prevent a text from appearing twice
    // this.allQuestions("all").splice(
    //   this.allQuestions("all").indexOf(this.allQuestions(this.questionIndex)),
    //   1
    // );

    setTimeout(() => {
      this.answerIsCorrect = false;
      this.errorText.style.opacity = "0";
      this.hide(this.answerContainer);
      this.generateQuestions();
      this.userInput.focus();

      this.confirm.style.backgroundColor = " #1fc07d";
      this.userInput.value = "";
    }, 2000);
  },

  handleUserInput() {
    //\___________________prevent user from deleting correct input__________________//\
    /*document.addEventListener("keydown", (e) => {
      if (
        e.key === "Backspace" &&
        this.answer.innerText.startsWith(this.userInput.value)
      ) {
        e.preventDefault();
      }
    });*/

    //\___________________handle wrong input__________________//\
    //\___________________remove white space from wrong texts__________________//\
    this.userInput.addEventListener("input", () => {
      if (!this.answer.innerText.startsWith(this.userInput.value)) {
        if (this.userInput.value.endsWith("  ")) {
          this.userInput.value = this.userInput.value.trim();
        }
      }
      if (!this.answer.innerText.startsWith(this.userInput.value)) {
        this.userInput.style.color = "blue";
      }
      if (
        this.userInput.value == this.answer.innerText ||
        this.userInput.value.toLowerCase() == this.answer.innerText ||
        this.userInput.value.toUpperCase() == this.answer.innerText
      ) {
        this.validateUserInput();
      }
    });
  },

  handleAnswerSubmit() {
    //\___________________confirm user input__________________//\

    //\___________________remove white spaces and convert to lowercase__________________//\
    this.userInput.value = this.userInput.value.trim();
    this.userInput.value = this.userInput.value.toUpperCase();
    //\___________________if user input no value__________________//\
    if (this.userInput.value === "") {
      this.errorText.innerText = "Type your answer";
      this.errorText.style.color = "#fff200";
      this.errorText.style.opacity = "1";
      setTimeout(() => {
        this.errorText.style.opacity = "0";
        this.userInput.focus();
      }, 1500);
    }
    //\___________________if input is wrong__________________//\
    else if (this.userInput.value != this.answer.innerText) {
      this.wrongSound.play();
      this.errorText.innerText = "Incorrect! try again";
      this.errorText.style.color = "red";
      this.errorText.style.opacity = "1";
      this.confirm.style.backgroundColor = "red";
      this.userInput.blur();

      setTimeout(() => {
        this.errorText.style.opacity = "0";
        this.userInput.focus();
        this.confirm.style.backgroundColor = " #1fc07d";
        this.userInput.value = "";
      }, 1000);
    }
    //\___________________ If Input is correct __________________//\
    else if (this.userInput.value == this.answer.innerText) {
      this.validateUserInput();
    }
  },

  //\___________________To let enter key submit answer__________________//\
  handleAnswerEnter() {
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleAnswerSubmit();
      }
    });
  },

  //\___________________Handle game reset__________________//\
  resetGame() {
    this.score.innerText = 0;
    this.questionNumber.innerText = 0;
    this.userInput.value = "";
    //reset failed questions
    this.failedToAnswer = 0;
    this.nosFailed.innerText = 0;
    this.userInput.disabled = false;
    this.confirm.disabled = false;
    this.pauseButton.disabled = false;
    this.exitButton.disabled = false;
    this.restartButton.disabled = false;
    //text backup
    this.allQuestions = (index) => {
      if (index == "all") {
        return Object.keys(questionsArr);
      } else {
        return Object.keys(questionsArr[index]);
      }
    };
  },
  //\___________________stop timer from restarting__________________//\
  stopTimerRestart() {
    if (!this.timerStarted) {
      this.handleTimerStart();
      this.timerStarted = true;
      console.log("timer resumed");
    }
  },
  //\___________________Handle pause click__________________//\
  handlePauseClick() {
    this.pauseButton.addEventListener("click", () => {
      if (
        this.question.innerText == "loading..." ||
        this.answerIsCorrect == true
      ) {
        console.log("Can't pause");
      } else {
        this.gamePaused = true;
        this.handleTimerStop();
        this.show(this.gamePausedContainer);
        time = Number(this.gameTime.innerText.replace("s", ""));
        this.userInput.blur();
        this.userInput.disabled = true;
        this.confirm.disabled = true;
        this.pauseButton.disabled = true;
        this.pauseScore.innerText = this.score.innerText;
        //when resume button is clicked
        this.resumeGameButton.addEventListener("click", () => {
          this.hide(this.gamePausedContainer);
          this.gamePaused = false;
          this.userInput.disabled = false;
          this.confirm.disabled = false;
          this.pauseButton.disabled = false;
          this.userInput.focus();
          //\___________________stop timer from restarting__________________//\
          this.stopTimerRestart();
        });
      }
    });
  },
  //\___________________Handle restart click__________________//\
  handleRestartClick() {
    this.restartButton.addEventListener("click", () => {
      if (
        this.question.innerText == "loading..." ||
        this.answerIsCorrect == true
      ) {
        console.log("Can't pause");
      } else {
        this.handleTimerStop();
        this.show(this.gameRestartContainer);
        time = Number(this.gameTime.innerText.replace("s", ""));
        this.userInput.blur();
        this.userInput.disabled = true;
        this.confirm.disabled = true;
        this.pauseButton.disabled = true;
        this.pauseScore.innerText = this.score.innerText;
        //\___________________Restart declined__________________//\
        this.restartNo.addEventListener("click", () => {
          this.hide(this.gameRestartContainer);

          this.stopTimerRestart();
          this.userInput.focus();
          this.userInput.disabled = false;
          this.confirm.disabled = false;
          this.pauseButton.disabled = false;
        });
        //\___________________Restart confirmed__________________//\
        this.restartYes.addEventListener("click", () => {
          this.userInput.value = "";
          this.hide(this.gameRestartContainer);
          this.hide(this.gameView);
          this.resetGame();
          this.show(this.ready_view);
          this.show(this.header);

          this.userInput.focus();
          this.userInput.disabled = false;
          this.confirm.disabled = false;
          this.pauseButton.disabled = false;
        });
      }
    });
  },
  //\___________________Handle exit click__________________//\
  handleExitClick() {
    this.exitButton.addEventListener("click", () => {
      if (
        this.question.innerText == "loading..." ||
        this.answerIsCorrect == true
      ) {
        console.log("Can't pause");
      } else {
        this.handleTimerStop();
        this.show(this.gameExitContainer);
        time = Number(this.gameTime.innerText.replace("s", ""));
        this.userInput.blur();
        this.userInput.disabled = true;
        this.confirm.disabled = true;
        this.pauseButton.disabled = true;
        //\___________________Exit declined__________________//\
        this.exitNo.addEventListener("click", () => {
          this.hide(this.gameExitContainer);

          this.stopTimerRestart();
          this.userInput.focus();
          this.userInput.disabled = false;
          this.confirm.disabled = false;
          this.pauseButton.disabled = false;
        });
        //\___________________Restart confirmed__________________//\
        this.exitYes.addEventListener("click", () => {
          this.userInput.value = "";
          this.hide(this.gameExitContainer);
          this.hide(this.gameView);
          this.resetGame();
          this.show(this.home);
          this.show(this.header);

          this.userInput.focus();
          this.userInput.disabled = false;
          this.confirm.disabled = false;
          this.pauseButton.disabled = false;
        });
      }
    });
  },
  displayGameOver() {
    this.gameoverSound.play();
    this.show(this.gameOverContainer);
    this.gameTime.innerText = "time up";

    this.userInput.blur();
    this.finalScore.innerText = this.score.innerText;
    this.userInput.disabled = true;
    this.confirm.disabled = true;
    this.exitButton.disabled = true;
    this.restartButton.disabled = true;
    this.pauseButton.disabled = true;

    this.Playagain.addEventListener("click", () => {
      this.hide(this.gameOverContainer);

      //reset game
      this.resetGame();

      this.generateQuestions();
    });
  },

  //\___________________Launch Game functions__________________//\
  launchGame() {
    this.styleLogoText();
    this.styleTimer();
    this.styledLetter();
    this.displayMenuList();
    this.displayAboutView();
    this.displayReadyView();
    this.displayDifficulty();
    this.start.addEventListener("click", () => {
      this.displayGameView();
      this.generateQuestions();
    });
    this.handlePauseClick();
    this.handleRestartClick();

    this.handleExitClick();
    this.handleUserInput();

    this.confirm.addEventListener("click", () => {
      this.handleAnswerSubmit();
    });
    this.handleAnswerEnter();
  },
};

game.launchGame();
