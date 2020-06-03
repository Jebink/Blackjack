/*=====================BLACKJACK=======================*/

//variables
var blackjackName = {
    "you": {"scorespan": "#your-blackjack-result", "div": ".your-box", "score": 0 },
    "Dealer": {"scorespan": "#dealer-blackjack-result", "div": ".dealer-box", "score": 0 },
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "K", "Q"],
    "cardsMap": {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "A": [1, 11], "J": 10, "K": 10, "Q": 10},
    "wins": 0,
    "losses": 0,
    "draws":0,
    "isStand": false,
    "turnsOver": false,
    "turns":0,
}
//constants
const you = blackjackName["you"];
const dealer = blackjackName["Dealer"];
const cards = blackjackName["cards"];
const hit_sound = new Audio("./sounds/swish.m4a");
const win_sound = new Audio("./sounds/cash.mp3")
const loss_sound = new Audio("./sounds/aww.mp3")


document.querySelector("#blckjack_hit").addEventListener("click", blackjackhit);
document.querySelector("#blckjack_stand").addEventListener("click", blackjackstand);
document.querySelector("#blckjack_deal").addEventListener("click", blackjackdeal);


//button calls
function blackjackhit() {
  if(blackjackName["isStand"] === false ){
    let card = randomcardpicker()
    showcard(you, card);
    updateScore(you, card);
    showScore(you)
    if(you["score"] > 21){
        blackjackName["turnsOver"] = true;
        showresult(computewinner())
    }
  }
  
}
function blackjackstand() {
    if (blackjackName["turnsOver"] === false){
        dealerlogic()
    }
    
}
function blackjackdeal() {
    removecard()
}


//functions
function showcard(activeplayer, card) {
    if(activeplayer["score"] <= 21) {
        let card_img = document.createElement("img");
        card_img.src = "./images/"+ card +".jpg";
        document.querySelector(activeplayer["div"]).appendChild(card_img);
        hit_sound.play();
    }
    
}
function removecard(){
    if(blackjackName["turnsOver"] === true) {
        let yourImages = document.querySelector(you["div"]).querySelectorAll("img");
        let dealerImages = document.querySelector(dealer["div"]).querySelectorAll("img");
        for( i=0; i<yourImages.length; i++) {
            yourImages[i].remove()
        }
        for( i=0; i<dealerImages.length; i++) {
            dealerImages[i].remove()
        }
        you["score"] = 0;
        dealer["score"] = 0
        //change score back to 0
        document.querySelector(you["scorespan"]).textContent = 0
        document.querySelector(dealer["scorespan"]).textContent = 0

        //changing color back to white
        document.querySelector(you["scorespan"]).style.color = "white"
        document.querySelector(dealer["scorespan"]).style.color = "white"

        document.querySelector("#Blackjack_result").textContent = "Let's play"
        document.querySelector("#Blackjack_result").style.color = "black"

        blackjackName["isStand"] = false;
        blackjackName["turnsOver"] = false;

        }
}
function randomcardpicker() {
    let card_num = Math.floor( Math.random()*13 )
    return cards[card_num]
}
function updateScore(activeplayer, card) {
    //if adding 11 keeps you below 21 add 11 else add 1
    if(card === "A"){
        if(activeplayer["score"] + blackjackName["cardsMap"][card][1] <= 21) {
            activeplayer["score"] += blackjackName["cardsMap"][card][1]
        }
        else{
            activeplayer["score"] += blackjackName["cardsMap"][card][0]
        }
    }
    else{
        activeplayer["score"] += blackjackName["cardsMap"][card]
    }
    
}
function showScore(activeplayer){
    if(activeplayer["score"] > 21){
        document.querySelector(activeplayer["scorespan"]).textContent = "BUST!"
        document.querySelector(activeplayer["scorespan"]).style.color = "red"
    }
    else{
        document.querySelector(activeplayer["scorespan"]).textContent = activeplayer["score"]
    }
}

function sleep(ms) {
    return new Promise( resolve => setTimeout(resolve, 500))
}
//dealer logic
async function dealerlogic () {

    blackjackName["isStand"] = true;

    while(  (dealer["score"] < 16 && blackjackName["isStand"] === true) ){
        let card = randomcardpicker();
        showcard(dealer, card);
        updateScore(dealer, card);
        showScore(dealer)
        await sleep()
        if(dealer["score"] > you["score"]){
            blackjackName["turnsOver"] = true;
            showresult(computewinner())
            return
        }
    }

    blackjackName["turnsOver"] = true;
    showresult(computewinner())
    
}

//compute winner
function computewinner() {
    let winner;
    blackjackName["turn"]++
    if(you["score"] <= 21){
        //higher score than dealer or the the dealer bust
        if( (you["score"] > dealer["score"]) || (dealer["score"] > 21) ){
            blackjackName["wins"]++
            winner = you
        }
        else if (you["score"] < dealer["score"]) {

            blackjackName["losses"]++
            winner = dealer
        }
        else if (you["score"] === dealer["score"]){
            blackjackName["draws"]++

        }
    // condetion when user bust dealer doesn't
    }
    else if (you["score"] > 21 && dealer["score"] <= 21){
        blackjackName["losses"]++
        winner = dealer   
    }
    else if (you["score"] > 21 && dealer["score"] > 21) {
        blackjackName["draws"]++
        
    }
    return winner
}

function showresult(winner) {
    let message, messageColor;
    if(blackjackName["turnsOver"] === true ){
        if(winner === you){
            document.querySelector("#wins").textContent = blackjackName["wins"]
            message = "You Won";
            messageColor = "green";
            win_sound.play()
    
        }
        else if (winner === dealer){
            document.querySelector("#losses").textContent = blackjackName["losses"]
            message = "You Lost!";
            messageColor = "red";
            loss_sound.play()
        }
        else{
            document.querySelector("#draws").textContent = blackjackName["draws"]
            message = "You Drew";
            messageColor = "black"
        }
        document.querySelector("#Blackjack_result").textContent = message
        document.querySelector("#Blackjack_result").style.color = messageColor
    
    }
    
}

//automating the bot
