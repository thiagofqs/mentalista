const input = document.querySelector("#input-number");
const btnGuess = document.querySelector("#guess");
btnGuess.addEventListener("click", guess);

const txtNumbersMode = document.querySelector("#txt-number");
const txtResult = document.querySelector("#txt-result");
const txtTip = document.querySelector("#txt-tip");
const txtTrys = document.querySelector("#txt-try");

const btnEasy = document.querySelector("#easy");
const btnMedium = document.querySelector("#medium");
const btnHard = document.querySelector("#hard");
btnEasy.addEventListener("click", () => compareDifficulty(btnEasy));
btnMedium.addEventListener("click", () => compareDifficulty(btnMedium));
btnHard.addEventListener("click", () => compareDifficulty(btnHard));

const btnTry3 = document.querySelector("#try-3");
const btnTry6 = document.querySelector("#try-6");
const btnTry9 = document.querySelector("#try-9");
btnTry3.addEventListener("click", () => assignTrys(btnTry3));
btnTry6.addEventListener("click", () => assignTrys(btnTry6));
btnTry9.addEventListener("click", () => assignTrys(btnTry9));

btnTry3.disabled = true;
btnEasy.disabled = true;

let maxNumber;
let secretNumber;
let trys = 3;
let difficulty = 1;
let gameStarted = false;
let elementsAux = [btnEasy, btnTry3];

function drawNumber() {
    maxNumber = assignMaxNumber();
    secretNumber = Math.floor(Math.random() * (maxNumber + 1));
}

function assignMaxNumber() {
    if (difficulty === 1) {
        //easy
        return 10;
    } else if (difficulty === 2) {
        //medium
        return 50;
    } else if (difficulty === 3) {
        //hard
        return 100;
    }
}

function assignTrys(el) {
    if (!gameStarted) {
        const value = parseInt(el.value, 10);
        if (value === 3) {
            trys = 3;
            txtTrys.innerHTML = "Você tem 3 tentativas!";
        } else if (value === 6) {
            trys = 6;
            txtTrys.innerHTML = "Você tem 6 tentativas!";
        } else if (value === 9) {
            trys = 9;
            txtTrys.innerHTML = "Você tem 9 tentativas!";
        }
        enableOrDisableButton(el, "try");
    } else {
        txtResult.innerHTML =
            "Você só pode mudar as tentativas quando perder ou ganhar essa partida!";
    }
}

function compareDifficulty(el) {
    if (gameStarted === false) {
        const value = parseInt(el.value, 10);
        if (value === 1) {
            //easy
            difficulty = 1;
            txtNumbersMode.innerHTML = "Digite um número de 1 a 10";
            drawNumber();
        } else if (value === 2) {
            //medium
            difficulty = 2;
            txtNumbersMode.innerHTML = "Digite um número de 1 a 50";
            drawNumber();
        } else if (value === 3) {
            //hard
            difficulty = 3;
            txtNumbersMode.innerHTML = "Digite um número de 1 a 100";
            drawNumber();
        }
        enableOrDisableButton(el, "dif");
    } else {
        txtResult.innerHTML =
            "Você só pode mudar a dificuldade quando perder ou ganhar essa partida!";
    }
}

function enableOrDisableButton(el, type) {
    if (type === "dif") {
        elementsAux[0].disabled = false;
        elementsAux[0] = el;
    } else if (type === "try") {
        elementsAux[1].disabled = false;
        elementsAux[1] = el;
    }
    el.disabled = true;
}

function returnMaxNumberOfDifficulty() {
    if (difficulty === 1) {
        //easy
        return 10;
    } else if (difficulty === 2) {
        //normal
        return 50;
    } else if (difficulty === 3) {
        //hard
        return 100;
    }
}

function guess() {
    let number = input.value;
    const maxNumber = returnMaxNumberOfDifficulty();
    if (number === "") {
        txtResult.innerHTML = `Você deve digitar um número de 1 a ${maxNumber}.`;
    } else {
        gameStarted = true;
        number = parseInt(number, 10);
        if (number === secretNumber) {
            input.value = "";
            txtTrys.innerHTML = "Você é um ótimo mentalista!";
            txtResult.innerHTML = `Você acertou o número secreto! O número secreto era ${secretNumber}.`;
            txtTip.innerHTML = "";
            gameStarted = false;
        } else if (number > maxNumber || number < 1) {
            txtResult.innerHTML = `Você deve digitar um número de 1 a ${maxNumber}.`;
        } else {
            trys -= 1;
            if (trys <= 0) {
                input.value = "";
                txtTrys.innerHTML = `Você tem 0 tentativas!`;
                txtResult.innerHTML = `Suas tentativas acabaram! O número secreto era ${secretNumber}.`;
                txtTip.innerHTML = "";
                gameStarted = false;
            } else {
                if (number > secretNumber) {
                    input.value = "";
                    txtTrys.innerHTML = `Você tem ${trys} tentativas!`;
                    txtResult.innerHTML = `Você errou! Agora você tem ${trys} tentativas!`;
                    txtTip.innerHTML = `O número secreto é menor que ${number}.`;
                } else if (number < secretNumber) {
                    input.value = "";
                    txtTrys.innerHTML = `Você tem ${trys} tentativas!`;
                    txtResult.innerHTML = `Você errou! Agora você tem ${trys} tentativas!`;
                    txtTip.innerHTML = `O número secreto é maior que ${number}.`;
                }
            }
        }
    }
}

drawNumber();
