// To do: 
// 1. When game ends fix display of # of wins before starting a new game

//-------------------------------------------------------------
//--------Global Variables--------------------------------

var secret_word_list = ["hawking","curie","fermi","plank","tesla"];
let j = 0; // found letters counter
let i = 0; // incorrect letters counter
let k = 0; // # of wins counter
let found_letters = [];
let incorrect_letters = [];
let wins_counter = 0;
let attempts_remaining_counter = 10;
let secret_word_list_index = 0;

//-------------------------------------------------------------
//--------Capture and Display User Input-----------------------

var userText = document.getElementById("chosen_letter");
var incorrectLetters = document.getElementById("incorrect_letters");
//var correctLetters = document.getElementById("correct_letters");
var attemptsRemaining = document.getElementById("attempts_remaining");
var wins = document.getElementById("wins");

drawPlaceholder(secret_word_list,secret_word_list_index);


//-------------------------------------------------------------
//--------Game Loop -------------------------------------------

document.onkeyup = function(event) {
    userText.textContent = event.key; 
    chosen_letter = event.key;
    find(chosen_letter,secret_word_list,secret_word_list_index);
    let win = winGame(found_letters,secret_word_list, secret_word_list_index);
    
    
    if ((win)&&(secret_word_list_index < secret_word_list.length)){
        
        found_letters = [];
        incorrect_letters = [];
        j = 0; // reset found letters counter
        i = 0; // reset incorrect letters counter
        k++; // increase wins counter
        secret_word_list_index++; // increase secrect word list index
        wins.textContent = k;
        attempts_remaining_counter = 10;
        attemptsRemaining.textContent = attempts_remaining_counter;
        console.log("You Win! You have won: " + k + " times");
        console.log("Secret Word List Index: " + secret_word_list_index + " legth :" + secret_word_list.length);
        deletePlaceholder();
        if (secret_word_list_index < secret_word_list.length){
        drawPlaceholder(secret_word_list,secret_word_list_index)};
        incorrectLetters.textContent = "";
        //correctLetters.textContent = "";
    };

    //Reset the counter and loop throught the word list array again
    if (secret_word_list_index === secret_word_list.length){ 
        alert("Well done! You guessed all their " + secret_word_list.length + " last names! The game will restart!");
        //alert("Secret Word List Index: " + secret_word_list_index + " legth :" + secret_word_list.length);
        secret_word_list_index = 0;
        k=0;
        userText.textContent = "";
        incorrectLetters.textContent = "";
        //correctLetters.textContent = "";
        wins.textContent = "";  
        attemptsRemaining.textContent = attempts_remaining_counter;
        drawPlaceholder(secret_word_list,secret_word_list_index);
    }

};

//-------------------------------------------------------------
//--Checks if Char is ontained in String-----------------------

function find(chosen_letter, secret_word_list, secret_word_list_index){
    
       //Select secret word and split it into a character array
       a = secret_word_list[secret_word_list_index].split("");
       
       // if guess is correct store it in found_letters
       if ((a.includes(chosen_letter))&&(!found_letters.includes(chosen_letter))){
            found_letters[j]=chosen_letter;
            console.log("Found Letters: " + found_letters);
            //correctLetters.textContent = found_letters;
            drawLetter(found_letters,j,secret_word_list,secret_word_list_index);
            j++;
       } else{
            // if guess is NOT correct store it in incorrect_letters
            if ((!incorrect_letters.includes(chosen_letter))&&(!found_letters.includes(chosen_letter))){
                incorrect_letters[i]=chosen_letter;
                console.log("Incorrect Letters :" + incorrect_letters);
                incorrectLetters.textContent = incorrect_letters;
                attempts_remaining_counter--;
                attemptsRemaining.textContent = attempts_remaining_counter;
                i++;
            }
       };
}

//------------------------------------------------------------------------------------------------------
//--Checks if WIN GAME when all the chosen Chars are contained in the secret word-----------------------

function winGame(found_letters,secret_word_list, secret_word_list_index){
    
    d = secret_word_list[secret_word_list_index].split("").sort().toString();
    var x = d.localeCompare(found_letters.sort())
    
    if (x===0){
        return true;
    }
        
}

//-------------------------------------------------------------
//--------Draw Placeholder-------------------------------------

function drawPlaceholder(secret_word_list,secret_word_list_index){
    
    let j = 0;
    secret_word_list[secret_word_list_index].split("").forEach(element => {
        document.getElementById('paint_row').innerHTML += ' <span class="input-group-text" id="inputGroup-sizing-lg-'+j+'"></span> ';
        j++;
    });

    drawImage(secret_word_list_index);

}

//-------------------------------------------------------------------------
//--------Draw Letters in Placeholders-------------------------------------

function drawLetter(found_letters,found_letters_index,secret_word_list,secret_word_list_index){
        console.log("DRALETTER() : Secret Word List Index: " + secret_word_list_index + " legth :" + secret_word_list.length);
        var letter = found_letters[found_letters_index];
        var word = secret_word_list[secret_word_list_index];
        var letter_location = word.indexOf(letter); 
        console.log("Drawing letter in location :"+ letter_location);



        target = 'inputGroup-sizing-lg-'+letter_location+'';
        document.getElementById(target).innerHTML += ' <span class="inserted_letter" id='+found_letters[found_letters_index]+' > '+found_letters[found_letters_index]+' </span> ';
       
}

//-------------------------------------------------------------------------
//--------Delete Placeholder-------------------------------------

function deletePlaceholder(){

    // Removing all children from an element
    var element = document.getElementById("paint_row");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    

};

//-------------------------------------------------------------------------
//--------Draw Image-------------------------------------------------------

function drawImage(secret_word_list_index){
    
    switch (secret_word_list_index) {
        case 0:
            document.getElementById("picture_holder").innerHTML = '<img src="./assets/images/hawking.jpeg" id="picture">';
            break;
        case 1:
            document.getElementById("picture_holder").innerHTML = '<img src="./assets/images/curie.jpeg" id="picture">';
            break;
        case 2:
            document.getElementById("picture_holder").innerHTML = '<img src="./assets/images/fermi.jpeg" id="picture">';
            break;
        case 3:
            document.getElementById("picture_holder").innerHTML = '<img src="./assets/images/plank.jpeg" id="picture">';
            break;
        case 4:
            document.getElementById("picture_holder").innerHTML = '<img src="./assets/images/tesla.jpeg" id="picture">';
            break;
    }

}