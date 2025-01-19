const inputSlider = document.querySelector("[length-slider]");
const length = document.querySelector("[data-length]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckbox = document.querySelector("input[type = checkbox]");
const symbols = '~`&@#$%^*(){[}]-_",<.>?/:;=+\|!';

let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();
setIndicator();

function handleSlider() {
    inputSlider.value = passwordLength;
    length.innerText = passwordLength;

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "1px 2px 20px black";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInt(0, 9);
}

function generateLowercase(){
   return String.fromCharCode(getRandomInt(97, 123));
}

function generateLowercase(){
    return String.fromCharCode(getRandomInt(65, 91));
}

function generateSymbols(){
    const randomNum = getRandomInt(0, symbols.length);
    return symbols.charAt(randomNum)
}

function calcStrength() {
    let hasUpper =false;
    let hasLower =false;
    let hasNum =false;
    let hasSym =false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyClick() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied"
    } catch (error) {
        copyMsg.innerText = "Failed"
    }
    copyMsg.classList,add('active')
   
}