
// Variables
const dealer = document.getElementById("dealer");
const player = document.getElementById("player");
const playAgain = document.getElementById('play-again');
const hitBtn = document.getElementById("hit-btn");
const stayBtn = document.getElementById("stay-btn");
let dealer_score = document.getElementById("dealer-score");
let player_score = document.getElementById("player-score");
let selectedCard = 0;

// Draw card
function draw_card() {
    const deck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 'J', 'J', 'J', 'J', 'Q', 'Q', 'Q', 'Q', 'K', 'K', 'K', 'K'];
    selectedCard = deck[Math.floor(Math.random() * deck.length)];
    const card = document.createElement("div");
    const cardNumber = document.createElement("p");
    cardNumber.innerText = selectedCard;
    card.classList.add("playing-card");
    card.appendChild(cardNumber);
    if (selectedCard == 'J' || selectedCard == 'Q' || selectedCard == 'K') {
        selectedCard = 10;
    }
    return card;
}


// Game initialize
window.onload = function game_init() {

    // Play again button
    playAgain.addEventListener("click", function () {
        window.location.reload();
    });


    // Dealer starting cards
    for (let i = 0; i < 2; i++) {
        dealer.appendChild(draw_card());
        dealer_score.innerHTML = parseInt(dealer_score.innerHTML) + selectedCard;
    }

    // Player starting cards
    for (let i = 0; i < 2; i++) {
        player.appendChild(draw_card());
        player_score.innerHTML = parseInt(player_score.innerHTML) + selectedCard;
    }

    // Hit button
    hitBtn.addEventListener("click", function () {
        player.appendChild(draw_card());
        player_score.innerHTML = parseInt(player_score.innerHTML) + selectedCard;
        if (parseInt(player_score.innerHTML) > 21) {
            player_score.style.color = "red";
            dealer_score.style.color = "gold";
            setTimeout(() => {
                alert("You lose");
            }, 500);
        }
        // player scores 21
        if (player_score.innerHTML == 21) {
            player_score.style.color = "gold";
            setTimeout(() => {
                alert("You win");
            }, 500);
        }
    });

    // Stay button
    stayBtn.addEventListener("click", function () {
        hitBtn.disabled = true;
        while (dealer_score.innerHTML < 18) {
            dealer.appendChild(draw_card());
            dealer_score.innerHTML = parseInt(dealer_score.innerHTML) + selectedCard;
        }

        // Dealer scores 21
        if (dealer_score.innerHTML == 21) {
            dealer_score.style.color = "gold";
            setTimeout(() => {
                alert("Dealer wins");
            }, 500);
        }

        // Dealer stay
        if (dealer_score.innerHTML >= 18 && dealer_score.innerHTML < 21) {
            console.log("dealer stay");
            if (dealer_score.innerHTML > player_score.innerHTML) {
                dealer_score.style.color = "gold";
                setTimeout(() => {
                    alert("Dealer wins");
                }, 500);
            } else if (dealer_score.innerHTML < player_score.innerHTML) {
                player_score.style.color = "gold";
                setTimeout(() => {
                    alert("You win");
                }, 500);
            }
        }

        // Both score 21
        if (player_score.innerHTML == 21 && dealer_score.innerHTML == 21) {
            dealer_score.style.color = "gold";
            player_score.style.color = "gold";
            setTimeout(() => {
                alert("Draw");
            }, 500);
        }

        // Draw
        if (player_score.innerHTML == dealer_score.innerHTML) {
            setTimeout(() => {
                alert("Draw");
            }, 500);
        }

        // Dealer loses
        if (dealer_score.innerHTML > 21) {
            dealer_score.style.color = "red";
            player_score.style.color = "gold";
            setTimeout(() => {
                alert("Dealer loses");
            }, 500);
        }

        // Both lose
        if (player_score.innerHTML > 21 && dealer_score.innerHTML > 21) {
            setTimeout(() => {
                alert("Both player lose");
            }, 500);
        }
    })
};
// cursor
var rjs_cursor = document.getElementById("rjs_cursor"); //Getting the cursor
var body = document.querySelector("body"); //Get the body element

//Functions for showing and hiding the cursor
//They are referenced the 
function rjs_show_cursor(e) { //Function to show/hide the cursor
    if (rjs_cursor.classList.contains('rjs_cursor_hidden')) {
        rjs_cursor.classList.remove('rjs_cursor_hidden');
    }
    rjs_cursor.classList.add('rjs_cursor_visible');
}

function rjs_hide_cursor(e) {
    if (rjs_cursor.classList.contains('rjs_cursor_visible')) {
        rjs_cursor.classList.remove('rjs_cursor_visible');
    }
    rjs_cursor.classList.add('rjs_cursor_hidden');
}


function rjs_mousemove(e) { //Function to correctly position the cursor
    rjs_show_cursor(); //Toggle show/hide

    var rjs_cursor_width = rjs_cursor.offsetWidth * 0.5;
    var rjs_cursor_height = rjs_cursor.offsetHeight * 0.5;

    var rjs_cursor_x = e.clientX - rjs_cursor_width; //x-coordinate
    var rjs_cursor_y = e.clientY - rjs_cursor_height; //y-coordinate
    var rjs_cursor_pos = `translate(${rjs_cursor_x}px, ${rjs_cursor_y}px)`;
    rjs_cursor.style.transform = rjs_cursor_pos;
}


//Eventlisteners

window.addEventListener('mousemove', rjs_mousemove); //Attach an event listener
body.addEventListener('mouseleave', rjs_hide_cursor);
