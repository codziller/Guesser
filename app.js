const questionsArr = [
  { "highest grammy winner?": "Burnaboy" },
  { "President of Nigeria?": "Buhari" },
  { "What is the name of this game": "Guesser" },
  { "Question 4": "Answer 4" },
  { "Question 5": "Answer 5" },
  { "Question 6": "Answer 6" },
  { "Question 7": "Answer 7" },
  { "Question 8": "Answer 8" },
  { "Question 9": "Answer 9" },
  { "Question 10": "Answer 10" },
  { "Question 11": "Answer 11" },
  { "Question 12": "Answer 12" },
  { "Question 13": "Answer 13" },
  { "Question 14": "Answer 14" },
  { "Question 15": "Answer 15" },
  { "Question 16": "Answer 16" },
  { "Question 17": "Answer 17" },
  { "Question 18": "Answer 18" },
  { "Question 19": "Answer 19" },
  { "Question 20": "Answer 20" },
  { "Question 21": "Answer 21" },
  { "Question 22": "Answer 22" },
  { "Question 23": "Answer 23" },
  { "Question 24": "Answer 24" },
  { "Question 25": "Answer 25" },
  { "Question 26": "Answer 26" },
  { "Question 27": "Answer 27" },
  { "Question 28": "Answer 28" },
  { "Question 29": "Answer 29" },
  { "Question 30": "Answer 30" },
];

const game = {
  header: document.getElementById("header"),
  difficulty: document.getElementById("difficulty"),
  header: document.getElementById("header"),
  sound: document.getElementById("sound"),
  about: document.getElementById("about"),
  menuButton: document.getElementById("menu_button"),
  rightCaretOne: document.getElementById("fa-angle-right-one"),
  rightCaretTwo: document.getElementById("fa-angle-right-two"),
  logoText: document.getElementById("logo_text"),
  home: document.getElementById("home_page"),
  begin: document.getElementById("begin_button"),
  ready_view: document.getElementById("ready_view"),
  start: document.getElementById("play_button"),
  gameView: document.getElementById("game_view"),
  pauseButton: document.getElementById("pause_button"),
  gamePausedContainer: document.getElementById("game_paused_container"),
  pauseScore: document.getElementById("pause_score"),
  resumeGameButton: document.getElementById("resume_game_button"),
  score: document.getElementById("score_button"),
  questionIndex: document.getElementById("question_index"),
  question: document.getElementById("question"),
  answer: document.getElementById("answer"),
  gameTime: document.getElementById("gameTime"),
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

  timerStarted: false,
  gamePaused: false,
  answerIsCorrect: false,
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

  //\___________________Set Timer__________________//\

  displayMenuList() {
    this.menuButton.addEventListener("click", () => {
      this.difficulty.classList.toggle("active_difficulty"),
        this.sound.classList.toggle("active_sound"),
        this.about.classList.toggle("active_about"),
        this.rightCaretOne.classList.toggle("fa-angle-right_inactive"),
        this.rightCaretTwo.classList.toggle("fa-angle-right_inactive");
    });
  },
  displayReadyView() {
    this.begin.addEventListener("click", () => {
      this.hide(this.home), this.show(this.ready_view), console.log("im here");
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
        this.userInput.blur();
      }
    }, 1000);
  },
  handleTimerStop() {
    clearInterval(timer);
    this.timerStarted = false;
    console.log("timer stopped");
  },
  getTimeLimit(text, answer) {
    time = Math.round(0.15 * text.join().length * answer.join().length);

    timeCheck = time;
    this.gameTime.innerText = time + "s";
    console.log(text.join());
  },
  generateQuestions() {
    if (!this.gamePaused) {
      this.gameTime.innerText = "---";
      this.question.innerText = "loading...";
      this.userInput.disabled = true;

      //\___________________To generate random questions from the question array__________________//\

      setTimeout(() => {
        this.userInput.disabled = false;
        this.userInput.focus();
        this.answerIsCorrect == false;
        questionIndex = Math.floor(
          Math.random() * this.allQuestions("all").length
        );
        this.question.innerText = this.allQuestions(questionIndex);
        this.answer.innerText = Object.values(questionsArr[questionIndex])
          .join()
          .toLowerCase();
        this.getTimeLimit(
          this.allQuestions(questionIndex),
          Object.values(questionsArr[questionIndex])
        ); //\___________________get time limit__________________//\

        this.gameTime.style.color = "#22d389";
        this.questionIndex.innerText++;

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
    });
  },
  handleAnswerSubmit() {
    //\___________________confirm user input__________________//\

    //\___________________remove white spaces and convert to lowercase__________________//\
    this.userInput.value = this.userInput.value.trim();
    this.userInput.value = this.userInput.value.toLowerCase();
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
      this.errorText.innerText = "Incorrect! try again";
      this.errorText.style.color = "red";
      this.errorText.style.opacity = "1";
      this.confirm.style.backgroundColor = "red";
      this.userInput.blur();

      setTimeout(() => {
        this.errorText.style.opacity = "0";
        this.userInput.focus();
        this.confirm.style.backgroundColor = "#22d389";
        this.userInput.value = "";
      }, 1000);
    }
    //\___________________ If Input is correct __________________//\
    else if (this.userInput.value == this.answer.innerText) {
      this.handleTimerStop();
      this.answerIsCorrect = true;
      this.errorText.innerText = "Correct";
      this.errorText.style.color = "#22d389";
      this.errorText.style.opacity = "1";
      this.confirm.style.backgroundColor = "#22d389";
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

        this.confirm.style.backgroundColor = "#22d389";
        this.userInput.value = "";
      }, 1500);
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
    this.questionIndex.innerText = "";
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
    } else if (
      (this.timerStarted = true && this.gameTime.innerText == "Time up")
    ) {
      this.handleTimerStop();
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
        this.userInput.innerText = "";
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
    });
  },
  //\___________________Handle exit click__________________//\
  handleExitClick() {
    this.exitButton.addEventListener("click", () => {
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
        this.userInput.innerText = "";
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
    });
  },

  //\___________________Launch Game functions__________________//\
  launchGame() {
    console.log(this.allQuestions("all").splice(7, 1), this.allQuestions(1));
    this.displayMenuList();
    this.displayReadyView();
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
