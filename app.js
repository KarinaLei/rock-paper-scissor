let userScore = 0;
let computerScore = 0;
let finished = false;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");


function restart() {
	userScore = 0;
	computerScore = 0;
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	finished = false;
	result_p.innerHTML = "Who is the best player here? 😏";
}

function endGame(winner) {
	result_p.innerHTML = `${winner} won! Click restart to continue. 🤖`
}


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
	if (userScore >= 12) {
		finished = true;
	}
}


function lose(userChoice, computerChoice) {
	++computerScore;
	computerScore_span.innerHTML = computerScore;
	result_p.innerHTML = `${toWord(userChoice)} loses to ${toWord(computerChoice)}. You lost. 💩`;
	const userChoice_div = document.getElementById(userChoice);
	userChoice_div.classList.add("red-glow");
	setTimeout(() => userChoice_div.classList.remove("red-glow"), 500);
	if (computerScore >= 12) {
		finished = true;
	}
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
	if (!finished) {
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
	else {
		const winner = (userScore >= 12) ? "You" : "The computer";
		endGame(winner);
	}
}


function main() {
	rock_div.addEventListener('click', () => game("r"));
	paper_div.addEventListener('click', () => game("p"));
	scissors_div.addEventListener('click', () => game("s"));
}


main();
