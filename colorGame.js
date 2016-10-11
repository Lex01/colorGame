var numSquares = 6;
var colors = [];
var goalColor;
var squares = document.querySelectorAll(".square");
var goalDisplay = document.getElementById("goalDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var reset = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	newGame();
}

function setupModeButtons(){
	// mode buttons event listeners
	for (var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		
		//if button is easy, numSquares is 3, else numSquares is 6
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		newGame();
	});
	}
}

function setupSquares(){
		// assign colors and click behavior to all squares
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.background;
			if(clickedColor === goalColor){
				message.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				reset.textContent = "Play Again?";
			} else {
				this.style.background = "#232323";
				message.textContent = "Try Again";
			}
	});
	}
}


function newGame(){
	colors = generateRandomColors(numSquares); // generate new colors
	goalColor = pickColor(); // pick a new goal color
	goalDisplay.textContent = goalColor;
	reset.textContent = "New Colors";
	message.textContent = "";

	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

goalDisplay.textContent = goalColor;

// reset the game
reset.addEventListener("click",function() {
	newGame();
})


// To fade out wrong pick
function changeColors(color) {
	for(var i = 0; i < colors.length; i++) {
		squares[i].style.background = color;
	}
}
// to pick a goal color to win
function pickColor() {
	var random = Math.floor((Math.random() * colors.length));
	return colors[random];
}
// generate random colors at game start
function generateRandomColors(num) {
	var arr = [];
	for(var i = 0; i < num; i++) {
		arr.push(randomColor());
	}

	return arr;
}

function randomColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}