/*=====================BLACKJACK=======================*/

//variables
var blackjackName = {
    "you": {"scorespan": "#your-blackjack-result", "div": ".your-box", "score": 0 },
    "Dealer": {"scorespan": "#dealer-blackjack-result", "div": ".dealer-box", "score": 0 },
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "K", "Q"],
    "cardsMap": {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "A": [1, 11], "J": 10, "K": 10, "Q": 10}
}


//constants
const you = blackjackName["you"];
const dealer = blackjackName["Dealer"];
const cards = blackjackName["cards"];
const hit_sound = new Audio("./sounds/swish.m4a");


document.querySelector("#blckjack_hit").addEventListener("click", blackjackhit);
document.querySelector("#blckjack_deal").addEventListener("click", blackjackdeal);


//button calls
function blackjackhit() {
  let card = randomcardpicker()
  showcard(you, card);
  updateScore(card, you);
  showScore(you)
}
function blackjackdeal() {
    removecard(you)
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
}
function randomcardpicker() {
    let card_num = Math.floor( Math.random()*13 )
    return cards[card_num]
}
function updateScore(card, activeplayer) {
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
