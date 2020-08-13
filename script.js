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
            imgSrc: "./Assets/img/nelsonMandela.jpg"
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
    let questionIndex = 0;
    
    console.log(quotes);
    console.log(quotesKeys);  
    
    function pauseTimer(event) {
        clearInterval(interval);
    }
    
    function setCard(event) {
        carousel.remove();
        beginButton.remove();
        countText.setAttribute("class", "questionMark");
        countText.innerHTML = countDown;                  // Insert text
        card[0].prepend(countText);
        cardTitle[0].innerHTML = "Who Said: ";
        cardText[0].innerHTML = "\"" + quotes[quotesKeys[questionIndex]].quote + "\"";
        for(i = 0; i < 4; i++) {
            let choiceButton = document.createElement("button");
            let choiceText = Math.floor(Math.random() * (quotesKeys.length) + 1);
            choiceButton.innerHTML = quotes[quotesKeys[choiceText]].name;
            choiceButton.setAttribute("class", "btn btn-primary choices");
            // console.dir(cardText);
            card[0].appendChild(choiceButton);
        }
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
 
});