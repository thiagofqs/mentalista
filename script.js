const input = document.getElementById("input-number");
const btnGuess = document.getElementById("guess");
btnGuess.addEventListener("click", guess, false);

const txtNumber = document.getElementById("txt-number");
const txtResult = document.getElementById("txt-result");
const txtTip = document.getElementById("txt-tip");
const txtTry = document.getElementById("txt-try");

const btnEasy = document.getElementById("easy");
const btnMedium = document.getElementById("medium");
const btnHard = document.getElementById("hard");
btnEasy.addEventListener("click", () => {compareDifficulty(btnEasy)}, false);
btnMedium.addEventListener("click", () => {compareDifficulty(btnMedium)}, false);
btnHard.addEventListener("click", () => {compareDifficulty(btnHard)}, false);

const btnTry3 = document.getElementById("try-3");
const btnTry6 = document.getElementById("try-6");
const btnTry9 = document.getElementById("try-9");
btnTry3.addEventListener("click", () => {assignTrys(btnTry3)}, false);
btnTry6.addEventListener("click", () => {assignTrys(btnTry6)}, false);
btnTry9.addEventListener("click", () => {assignTrys(btnTry9)}, false);

btnTry3.disabled = true;
btnEasy.disabled = true;

let secretNumber;
let trys = 3;
let difficulty = 1;
let gameStarted = false;
let elementsAux = [btnEasy, btnTry3];

function drawNumber() {
    maxNumber = assignMaxNumber();
    secretNumber = Math.floor(Math.random() * (maxNumber+1));
};

function assignMaxNumber() {
    if(difficulty === 1) { //easy
        return 10;
    } else if(difficulty === 2) { //medium
        return 50;
    } else if(difficulty === 3) { //hard
        return 100;
    };
}

function assignTrys(element) {
    if(gameStarted === false) {
        const value = parseInt(element.value);
        if(value === 3) {
            trys = 3;
            txtTry.innerHTML = "Você tem 3 tentativas";
        } else if(value === 6) {
            trys = 6;
            txtTry.innerHTML = "Você tem 6 tentativas";
        } else if(value === 9) {
            trys = 9;
            txtTry.innerHTML = "Você tem 9 tentativas";
        };
        enableOrDisableButton(element, "try");
    } else {
        txtResult.innerHTML = "Você só pode mudar as tentativas quando perder ou ganhar essa partida!";
    };
};

function compareDifficulty(element) {
    if(gameStarted === false) {
        const value = parseInt(element.value);
        if(value === 1) { //easy
            difficulty = 1;
            txtNumber.innerHTML = "Digite um número de 1 a 10";
            drawNumber();
        } else if(value === 2) { //medium
            difficulty = 2;
            txtNumber.innerHTML = "Digite um número de 1 a 50";
            drawNumber();
        } else if(value === 3) { //hard
            difficulty = 3;
            txtNumber.innerHTML = "Digite um número de 1 a 100";
            drawNumber();
        };
        enableOrDisableButton(element, "dif");
    } else {
        txtResult.innerHTML = "Você só pode mudar a dificuldade quando perder ou ganhar essa partida!";
    };
};

function enableOrDisableButton(element, button) {
    if(button === "dif") {
        elementsAux[0].disabled = false;
        elementsAux[0] = element;
    } else if(button === "try") {
        elementsAux[1].disabled = false;
        elementsAux[1] = element;
    };
    element.disabled = true;
};

function returnMaxNumberOfDifficulty() {
    if(difficulty === 1) { //easy
        return 10;
    } else if(difficulty === 2) { //normal
        return 50;
    } else if(difficulty === 3) { //hard
        return 100;
    };
};

function guess() {
    let number = input.value;
    const maxNumber = returnMaxNumberOfDifficulty();
    if(number === "") {
        txtResult.innerHTML = `Você deve digitar um número de 1 a ${maxNumber}.`;
    } else {
        gameStarted = true;
        number = parseInt(number);
        if(number === secretNumber) {
            input.value = "";
            txtTry.innerHTML = "Você é um ótimo mentalista!";
            txtResult.innerHTML = `Você acertou o número secreto! O número secreto era ${secretNumber}.`;
            txtTip.innerHTML = "";
            gameStarted = false;
        } else if(number > maxNumber || number < 1) {
            txtResult.innerHTML = `Você deve digitar um número de 1 a ${maxNumber}.`;
        } else {
            trys -= 1;
            if(trys <= 0) {
                input.value = "";
                txtTry.innerHTML = `Você tem 0 tentativas!`;
                txtResult.innerHTML = `Suas tentativas acabaram! O número secreto era ${secretNumber}.`;
                txtTip.innerHTML = "";
                gameStarted = false;
            } else {
                if(number > secretNumber) {
                    input.value = "";
                    txtTry.innerHTML = `Você tem ${trys} tentativas!`;
                    txtResult.innerHTML = `Você errou! Agora você tem ${trys} tentativas!`;
                    txtTip.innerHTML = `O número secreto é menor que ${number}.`;
                } else if(number < secretNumber) {
                    input.value = "";
                    txtTry.innerHTML = `Você tem ${trys} tentativas!`;
                    txtResult.innerHTML = `Você errou! Agora você tem ${trys} tentativas!`;
                    txtTip.innerHTML = `O número secreto é maior que ${number}.`;
                };
            };
        };
    };
};

drawNumber();