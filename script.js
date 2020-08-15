$( document ).ready(function() {
    
    const quotes = {
        gandolf: {
            name: "Gandolf",
            quote: "YOU SHALL NOT PASS!",
            imgSrc: "./Assets/img/gandolf.jpg"
        },
        leonardoDaVinci: {
            name: "Leonardo da Vinci",
            quote: "Simplicity is the ultimate sophistication.",
            imgSrc: "./Assets/img/leonardoDaVinci.jpg"
        },
        jfk: {
            name: "John F. Kennedy",
            quote: "If not us, who? If not now, when?",
            imgSrc: "./Assets/img/jfk.jpg"
        },
        gandhi: {
            name: "Mahatma Gandhi",
            quote: "An eye for eye only ends up making the whole world blind.",
            imgSrc: "./Assets/img/gandhi.jpg"
        },
        uncleIroh: {
            name: "Uncle Iroh",
            quote: "While it is always best to believe in oneself, a little help from others can be a great blessing.",
            imgSrc: "./Assets/img/uncleIroh.jpg"
        },
        nelsonMandela: {
            name: "Nelson Mandela",
            quote: "Education is the most powerful weapon which you can use to change the world.",
            imgSrc: "./Assets/img/neslonMandela.jpg"
        },
        pippin: {
            name: "Pippin",
            quote: "We've had one, yes. What about second breakfast?",
            imgSrc: "./Assets/img/pippin.jpg"
        },
        shakespeare: {
            name: "William Shakespeare",
            quote: "Now is the winter of our discontent.",
            imgSrc: "./Assets/img/shakespeare.jpg"
        },
        bellaAbzug: {
            name: "Bella Abzug",
            quote: "The test for whether or not you can hold a job should not be the arrangement of your chromosomes.",
            imgSrc: "./Assets/img/bellaAbzug.jpg"
        },
        mlk: {
            name: "Martin Luther King Jr.",
            quote: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
            imgSrc: "./Assets/img/mlk.jpg"
        },
        v: {
            name: "V",
            quote: "Beneath this mask there is an idea. And ideas are bulletproof.",
            imgSrc: "./Assets/img/v.jpg"
        },
        plato: {
            name: "Plato",
            quote: "The greatest wealth is to live content with little.",
            imgSrc: "./Assets/img/plato.jpg"
        },
        fdr: {
            name: "Franklin D. Roosevelt",
            quote: "The only thing we have to fear is fear itself.",
            imgSrc: "./Assets/img/fdr.jpg"
        },
        tylerDurden: {
            name: "Tyler Durden",
            quote: "The things you own end up owning you.",
            imgSrc: "./Assets/img/tylerDurden.jpg"
        },
        margaretThatcher: {
            name: "Margaret Thatcher",
            quote: "If you want something said, ask a man; if you want something done, ask a woman.",
            imgSrc: "./Assets/img/margaretThatcher.jpg"
        },
        socrates: {
            name: "Socrates",
            quote: "One thing only I know, and that is that I know nothing.",
            imgSrc: "./Assets/img/socrates.jpg"
        },
    }

    const quotesKeys = Object.keys(quotes);
    let interval;
    let countDown = 120;
    let detraction = 5;
    const highscoresLink = document.getElementById("highscores-link");
    const beginButton = document.getElementById("begin-button");
    const carousel = document.getElementById("people");
    const card = document.getElementsByClassName("card");
    const cardTitle = document.getElementsByClassName("card-title");
    let countText = document.createElement("h1");
    const cardText = document.getElementsByClassName("card-text");
    let modal = document.getElementsByClassName("modal-body");
    let personImg = document.createElement("img");
    let modalTitle = document.getElementsByClassName("modal-title");
    const checkAnswer = document.getElementById("check-answer");
    const closeModal = document.getElementById("close-modal");
    const xButton = document.getElementById("x-button");
    const initialsForm = document.createElement("form");
        initialsForm.setAttribute("id", "initials-form");

    const formGroup = document.createElement("div");
        formGroup.setAttribute("class", "form-group");

    const initialsText = document.createElement("input");
        initialsText.setAttribute("type", "text");
        initialsText.setAttribute("class", "form-control");
        initialsText.setAttribute("id", "initials-text");

    const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "btn btn-primary");
        submitButton.setAttribute("id", "submit-button");
        submitButton.textContent = "SAVE";

    let questionIndex = 0;
    let answer;
    let userAnswer;

    // console.log(quotes);
    
    function pauseTimer(event) {
        clearInterval(interval);
    }

    function clearChoices() {
        let choices = document.querySelectorAll(".choices");
        for(i = 0; i < choices.length; i++) {
            choices[i].remove();
        }
    }

    function randomizeChoices (answer, index) {
        // console.log(answer, index);
        let randomChoices = [];
        for(i = 0; i < 3; i++) {
            let randomChoice = Math.floor(Math.random() * quotesKeys.length);
            while(randomChoices.includes(randomChoice) || randomChoice === index) {

                randomChoice = Math.floor(Math.random() * quotesKeys.length);
            }
            randomChoices.push(randomChoice);
        }
        let randomSplice = Math.floor(Math.random() * (randomChoices.length + 1));
        randomChoices.splice(randomSplice, 0, index);
        // console.log(randomChoices);

        randomChoices.forEach(element => {
            let choiceButton = document.createElement("button");
            choiceButton.innerHTML = quotes[quotesKeys[element]].name;
            choiceButton.setAttribute("class", "btn btn-primary choices");
            choiceButton.setAttribute("id", quotesKeys[element]);
            choiceButton.setAttribute("type", "button");
            choiceButton.setAttribute("data-toggle", "modal");
            choiceButton.setAttribute("data-target", "#staticBackdrop");
            card[0].appendChild(choiceButton);
            choiceButton.addEventListener("click", triggerModal);
        });
    }

    function triggerModal(event) {
        // console.dir(event.target);
        // console.dir(closeModal,xButton);
        closeModal.style.display = "none";
        xButton.style.display = "none";
        userAnswer = quotes[event.target.id];
        personImg.removeAttribute("src");
        personImg.setAttribute("src", quotes[event.target.id].imgSrc);
        personImg.setAttribute("class", "img-fluid");
        // console.dir(modalTitle);
        modalTitle[0].innerHTML = "";
        modalTitle[0].append("You selected: " + quotes[event.target.id].name);
        modal[0].appendChild(personImg);
        pauseTimer();
    }
    
    function setCard(event) {
        if(questionIndex === quotesKeys.length) {
            pauseTimer();
            endGame();
        } else {
            // console.log(quotesKeys.length);
            answer = quotes[quotesKeys[questionIndex]];
            // console.log(answer);
            carousel.remove();
            beginButton.remove();
            countText.setAttribute("class", "questionMark");
            countText.innerHTML = countDown;
            card[0].prepend(countText);
            cardTitle[0].innerHTML = "Who Said: ";
            cardText[0].innerHTML = "\"" + quotes[quotesKeys[questionIndex]].quote + "\"";
            // console.log(questionIndex);
            randomizeChoices(answer,questionIndex);
            questionIndex++;
            startTimer();
        }
    }

    function startTimer(event) {      
        if(countDown > 0) {
            interval = setInterval(function(){
                countDown--;
                countText.innerHTML = countDown;
                card[0].prepend(countText);
                if(countDown <= 0) {
                    pauseTimer();
                }
            }, 1000);
        } else {
            endGame();
        }
    }

    function answerModal(event) {
        if(userAnswer.name === answer.name) {
            modalTitle[0].innerHTML = "You answered correct!";
        } else {
            modalTitle[0].innerHTML = "You answered incorrect!" + "<hr>" + answer.name + " said that.";
            personImg.removeAttribute("src");
            personImg.setAttribute("src", answer.imgSrc);
            personImg.setAttribute("class", "img-fluid");
            modal[0].appendChild(personImg);
            pauseTimer();
            if(countDown - detraction <= 0) {
                countDown = 0;
            } else {
                countDown = countDown - detraction;
            }
        }
    }

    function endGame(event) {
        countText.style.fontSize = "300px"
        countText.innerHTML = "GAME OVER";
        clearChoices();
        cardTitle[0].innerHTML = "ENTER HIGHSCORE"
        cardTitle[0].style.textAlign = "center";
        cardText[0].style.display = "none";
        card[0].append(initialsForm);
        card[0].lastChild.append(formGroup);
        // console.dir(card[0]);
        card[0].lastChild.lastChild.append(initialsText);
        card[0].lastChild.append(submitButton);
    }

    function saveInitials(event) {

        event.preventDefault();
        // console.dir(initialsForm.elements);
        // console.log(initialsForm.elements[0].value);
        let initials = initialsForm.elements[0].value;
        initials = initials.toUpperCase();
        // Get the existing data
        let highscores = localStorage.getItem('highscores');
        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        highscores = highscores ? JSON.parse(highscores) : {};
        // Add new data to localStorage Array
        highscores[initials] = countDown;
        // Save back to localStorage
        localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href="./quotes-quiz.html";
    }

    function viewHighscores(event) {
        carousel.remove();
        beginButton.remove();
        pauseTimer();
        clearChoices();
        countText.innerHTML = "";
        cardTitle[0].innerHTML = "HIGHSCORES";
        cardTitle[0].style.textAlign = "center";
        cardText[0].innerHTML = "";
        let scores = JSON.parse(localStorage.getItem("highscores"));
        if(!scores) {
            cardText[0].innerHTML = "No highscores have been saved. Play the game and save your score!";
            return;
        }

        let results = Object.entries(scores);
        let scoresList = document.createElement("ol");
        cardText[0].appendChild(scoresList);
        let orderedList = cardText[0].lastChild;

        for(i = 0; i < results.length; i++) {
            let listItem = document.createElement("li");
            listItem.textContent = results[i][0] + " - Score: " + results[i][1];
            orderedList.appendChild(listItem);
        }
    }

    beginButton.addEventListener("click", setCard);
    checkAnswer.addEventListener("click", answerModal);
    checkAnswer.addEventListener("click", function() {
        closeModal.style.display = "inline-block";
        xButton.style.display = "inline-block";
    });
    closeModal.addEventListener("click", clearChoices);
    closeModal.addEventListener("click", pauseTimer);
    closeModal.addEventListener("click",setCard);
    xButton.addEventListener("click", clearChoices);
    xButton.addEventListener("click", pauseTimer);
    xButton.addEventListener("click",setCard);
    initialsForm.addEventListener("submit", saveInitials);
    highscoresLink.addEventListener("click", viewHighscores);
});