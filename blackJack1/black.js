const play = document.getElementById('play');
const playAgain =document.getElementById('playAgain');
const hits = document.getElementById('stay')
console.log(hits)



hits.style.display = 'none'


playAgain.classList.add('hidden')


function random(number){
    return Math.round(Math.random() * number);
} 

playAgain.addEventListener('click', function(e) {
    playAgain.style.backgroundColor = `rgba(${random(255)}, ${random(255)}, ${random(255)})`

})

    

var dealerSum ;
var yourSum ;

var dealerAceCount;
var yourAceCount; 

var hidden;
var deck;

var canHit; //allows the player (you) to draw while yourSum <= 21


function init(){
    dealerSum = 0;
    yourSum = 0;

    dealerAceCount = 0;
    yourAceCount = 0; 

    hidden;
    deck;

    canHit = true; 

}
init()




play.addEventListener("click",  ()=>{
    buildDeck();
    shuffleDeck();
    startGame();
    play.classList.add("hidden");
    hits.style.display = 'block'
    

})




function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let j = 0; j < values.length; j++) {
            for (let i = 0; i < types.length; i++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    console.log(hidden);
    
    while (dealerSum < 17) {
       
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./img/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./img/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    play.classList.add("hidden");
    
}

function deal() {
    if (!canHit) {
        return;
    }
    
    let cardImg = document.createElement("img");
    let card = deck.pop();
    console.log(card)
    cardImg.src = "./img/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
    play.classList.add("hidden");
    
    console.log(yourSum, yourAceCount);
    
    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }
    
}

function hit() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    
    canHit = false;
    document.getElementById("hidden").src = "./img/" + hidden + ".png";
    
    let message = "";
    if ( yourSum > 21) {
        message = "you lose 😒";
        document.getElementById("results").style.backgroundColor = "rgba(7, 7, 7, 0.758)"
    }
    else if (dealerSum> 21) {
        message = "You win😁";
        document.getElementById("results").style.backgroundColor = "rgba(21, 255, 0, 0.404)"
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "draw 😩";
    }
    else if (yourSum > dealerSum ) {
        message = "You Win 😁";
        document.getElementById("results").style.backgroundColor = "rgba(21, 255, 0, 0.404)"
    }
    else if (yourSum < dealerSum ) {
        message = "Dealer Wins 😒";
        document.getElementById("results").style.backgroundColor = "rgba(7, 7, 7, 0.758)"
    }
    
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
    play.classList.add("hidden");
    playAgain.classList.remove("hidden");
}

document.getElementById("hit").addEventListener("click",deal);
document.getElementById("stay").addEventListener("click", hit);

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return Number(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }

    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        console.log(playerSum, playerAceCount, 's');
        playerSum -= 10;
        playerAceCount -= 1;
        console.log(playerSum, playerAceCount, 'd')
    }
    return playerSum;
}

