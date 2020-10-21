let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");


function toWord(letter) {
	const map = {"r": "Rock", "p": "Paper", "s": "Scissors"};
	return map[letter];
}


function win(userChoice, computerChoice) {
	++userScore;
	userScore_span.innerHTML = userScore;
	result_p.innerHTML = `${toWord(userChoice)} beats ${toWord(computerChoice)}. You won! 🔥`;
	const userChoice_div = document.getElementById(userChoice);
	/* show glow */
	userChoice_div.classList.add("green-glow");	// no period char because it's already a class
	/* un-show glow after timeout (500ms) */
	setTimeout(() => userChoice_div.classList.remove("green-glow"), 500);
}


function lose(userChoice, computerChoice) {
	++computerScore;
	computerScore_span.innerHTML = computerScore;
	result_p.innerHTML = `${toWord(userChoice)} loses to ${toWord(computerChoice)}. You lost. 💩`;
	const userChoice_div = document.getElementById(userChoice);
	userChoice_div.classList.add("red-glow");
	setTimeout(() => userChoice_div.classList.remove("red-glow"), 500);
}


function draw(userChoice, computerChoice) {
	result_p.innerHTML = `${toWord(userChoice)} equals ${toWord(computerChoice)}. It's a draw! 👀`;
	const userChoice_div = document.getElementById(userChoice);
	userChoice_div.classList.add("grey-glow");
	setTimeout(() => userChoice_div.classList.remove("grey-glow"), 500);
}


function getComputerChoice() {
	const choices = ["r", "p", "s"];
	const choiceIdx = Math.floor(Math.random() * 3);
	return choices[choiceIdx];
}


function game(userChoice) {
	const computerChoice = getComputerChoice();
	/* basic logic */
	switch (userChoice + computerChoice) {
		case "rs":
		case "pr":
		case "sp":
			win(userChoice, computerChoice);
			break;
		case "rp":
		case "ps":
		case "sr":
			lose(userChoice, computerChoice);
			break;
		default:
			draw(userChoice, computerChoice);
			break;
	}
}


function main() {
	rock_div.addEventListener('click', () => game("r"));

	paper_div.addEventListener('click', () => game("p"));

	scissors_div.addEventListener('click', () => game("s"));
}


main();
