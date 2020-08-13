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
    let countDown = 5;
    const beginButton = document.getElementById("begin-button");
    const carousel = document.getElementById("people");
    const card = document.getElementsByClassName("card");
    const cardTitle = document.getElementsByClassName("card-title");
    let countText = document.createElement("h1");
    const cardText = document.getElementsByClassName("card-text");
    let modal = document.getElementsByClassName("modal-body");
    let personImg = document.createElement("img");
    let modalTitle = document.getElementsByClassName("modal-title");
    let questionIndex = 0;
    
    console.log(quotes);
    console.log(quotesKeys);  
    
    function pauseTimer(event) {
        clearInterval(interval);
    }

    function randomizeChoices (answer, index) {
        console.log(answer, index);
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
        console.log(randomChoices);

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
        console.dir(event.target);
        personImg.removeAttribute("src");
        personImg.setAttribute("src", quotes[event.target.id].imgSrc);
        personImg.setAttribute("class", "img-fluid");
        console.dir(modalTitle);
        modalTitle[0].innerHTML = "";
        modalTitle[0].append("You selected: " + quotes[event.target.id].name);
        modal[0].appendChild(personImg);
        pauseTimer();
    }
    
    function setCard(event) {
        let answer = quotes[quotesKeys[questionIndex]];
        // console.log(answer);
        carousel.remove();
        beginButton.remove();
        countText.setAttribute("class", "questionMark");
        countText.innerHTML = countDown;                  // Insert text
        card[0].prepend(countText);
        cardTitle[0].innerHTML = "Who Said: ";
        cardText[0].innerHTML = "\"" + quotes[quotesKeys[questionIndex]].quote + "\"";
        console.log(questionIndex);
        randomizeChoices(answer,questionIndex);
        questionIndex++;
    }

    function startTimer(event) {
        event.preventDefault();
        interval = setInterval(function(){
            countDown--;
            countText.innerHTML = countDown;                  // Insert text
            card[0].prepend(countText);
            if(countDown <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    }


    beginButton.addEventListener("click", setCard);
    beginButton.addEventListener("click", startTimer);
    

    // choices.addEventListener("click", function(event) {
    //     event.preventDefault();
    //     console.dir(event.target);
    //   });
    
    
 
});