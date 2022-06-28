const trys = document.getElementById("try");
document.getElementById(`difficult-button1`).disabled = true;
document.getElementById(`try-button1`).disabled = true;

let secretNumber = parseInt(Math.random() * 11);
let tryTimes = 3;
let difficult = 1;

function numberText() {
    if(difficult === 1) {
        return "10";
    } else if(difficult === 2) {
        return "50";
    } else if(difficult === 3) {
        return "100";
    };
};

function enableOrDisableButtons(value, qtd) {
    if(qtd === 1) {
        for(let i = 1; i <= 3; i++) {
            let difficultButton = document.getElementById(`difficult-button${i}`);
            difficultButton.disabled = value;
        };
    } else if(qtd === 2) {
        for(let i = 1; i <= 3; i++) {
            let tryButton = document.getElementById(`try-button${i}`);
            tryButton.disabled = value;
        };
    } else if(qtd === 3) {
        for(let i = 1; i <= 3; i++) {
            let difficultButton = document.getElementById(`difficult-button${i}`);
            difficultButton.disabled = value;
        };
        for(let i = 1; i <= 3; i++) {
            let tryButton = document.getElementById(`try-button${i}`);
            tryButton.disabled = value;
        };
    };
};

function Difficult(value) {
    enableOrDisableButtons(true, 1);
    const number = document.getElementById("number");
    if(value === "1") {
        difficult = 1;
        secretNumber = parseInt(Math.random() * 11);
        number.innerHTML = "Digite um número de 0 a 10";
    } else if(value === "2") {
        difficult = 2;
        secretNumber = parseInt(Math.random() * 51);
        number.innerHTML = "Digite um número de 0 a 50";
    } else if(value === "3") {
        difficult = 3;
        secretNumber = parseInt(Math.random() * 101);
        number.innerHTML = "Digite um número de 0 a 100";
    };
};

function Try(value) {
    enableOrDisableButtons(true, 2);
    if(value === "3") {
        tryTimes = 3;
        trys.innerHTML = "Você tem 3 tentativas";
    } else if(value === "6") {
        tryTimes = 6;
        trys.innerHTML = "Você tem 6 tentativas";
    } else if(value === "9") {
        tryTimes = 9;
        trys.innerHTML = "Você tem 9 tentativas";
    };
};

function Guess() {
    if(document.getElementById(`difficult-button2`).disabled === false || document.getElementById(`try-button2`).disabled === false) {
        enableOrDisableButtons(true, 3);
    };
    console.log(secretNumber);
    const result = document.getElementById("result");
    const tip = document.getElementById("tip");
    let number = parseInt(document.getElementById("value").value);
    if(number === secretNumber) {
        enableOrDisableButtons(false, 3);
        document.getElementById("value").value = "";
        trys.innerHTML = `Você é um ótimo mentalista!`;
        result.innerHTML = `Você acertou o número secreto! O número secreto era ${secretNumber}.`;
        tip.innerHTML = "";
    } else if(number > numberText() || number < 0) {
        result.innerHTML = `Você deve digitar um número de 0 a ${numberText()}.`
    } else {
        tryTimes -= 1;
        if (tryTimes === 0) {
            enableOrDisableButtons(false, 3);
            document.getElementById("value").value = "";
            trys.innerHTML = `Você tem 0 tentativas!`;
            result.innerHTML = `Suas tentativas acabaram! O número secreto era ${secretNumber}.`;
            tip.innerHTML = "";
        } else {
            if (number > secretNumber) {
                document.getElementById("value").value = "";
                trys.innerHTML = `Você tem ${tryTimes} tentativas!`;
                result.innerHTML = `Você errou! Agora você tem ${tryTimes} tentativas!`;
                tip.innerHTML = `O número secreto é menor que ${number}.`;
            } else if (number < secretNumber) {
                document.getElementById("value").value = "";
                trys.innerHTML = `Você tem ${tryTimes} tentativas!`;
                result.innerHTML = `Você errou! Agora você tem ${tryTimes} tentativas!`;
                tip.innerHTML = `O número secreto é maior que ${number}.`;
            };
        };
    };
};