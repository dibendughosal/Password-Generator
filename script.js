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
const generateBtn = document.querySelector(".generatedBtn");
const allCheckbox = document.querySelectorAll("input[type='checkbox']");
const symbols = '~`&@#$%^*(){[}]-_",<.>?/:;=+\|!';

let password = "";
let passwordLength = 10;
let checkCount = 0;

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

function generateUppercase(){
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

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach( (checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}


async function copyClick() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied"
    } catch (error) {
        copyMsg.innerText = "Failed"
    }
    copyMsg.classList.add('active');
    setTimeout(() => {
        copyMsg.classList.remove('active');
    },2000);
}

// allCheckbox.forEach( (checkbox) => {
//     checkbox.addEventListener('change', handleCheckBoxChange);
// })

allCheckbox.forEach(checkbox => { 
    checkbox.addEventListener('change', handleCheckBoxChange);
});


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value.length > 0) {
        copyClick();
    }
})

generateBtn.addEventListener('click', () => {
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUppercase();
    // } 
    // if(lowercaseCheck.checked){
    //     password += generateLowercase();
    // } 
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // } 
    // if(symbolsCheck.checked){
    //     password += generateSymbols();
    // } 
    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbols);
    }
    // compulsory
    for (let i = 0; i < funcArr.length; i++) {
         password += funcArr[i]();
    }
    // remaining addition
    for (let i = 0; i< passwordLength - funcArr.length; i++) {
        let randomIndex = getRandomInt(0, funcArr.length);
        password += funcArr[randomIndex]();
    }
    // shuffle the password
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calcStrength();
});

function shufflePassword(array){
    for (let i = array.length - 1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;    
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str; 
}