// Character options
const CHAR_OPTIONS = [
    {
        description: "SPECIAL characters?",
        charSet: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    },
    {
        description: "NUMBERS?",
        charSet: "0123456789"
    },
    {
        description: "LOWERCASE characters?",
        charSet: "abcdefghijklmnopqrstuvwxyz"
    },
    {
        description: "UPPERCASE characters?",
        charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    },
];

// These are temporary elements grabbed by Id from the HTML page
var txtPasswordEl = document.getElementById("password");
var btnGenerateEl = document.getElementById("generate");
var btnCopyEl = document.getElementById("copy");

// VARs that are changed by input from userPrompts
var pwLength = -1;
var pwChars = "";

// This button will generate password as long as userPrompts is returned true
btnGenerateEl.addEventListener("click", function () {
    if (pwChars !== "" || userPrompts()) {
        var password = createPassword(pwChars, pwLength);
        updatePage(password);
    }
});

// This button will copy generated password on HTML page to clipboard
btnCopyEl.addEventListener("click", function () {
    txtPasswordEl.select();
    txtPasswordEl.setSelectionRange(0, 128);
    document.execCommand("copy");
});

// This will test if length is 8 thru 128
function userPrompts() {
    pwLength = getLength();
    if (pwLength < 0) {
        alert("INVALID INPUT - Length must be an integer between 8 and 128!");
        return false;
    }

    // This will test if at least 1 character set is chosen
    pwChars = getChars();
    if (pwChars === "") {
        alert("INVALID INPUT - You must select at least 1 character set to use");
        return false;
    }
    return true;
}

// Prompts user for integer 8 thru 128
function getLength() {
    var lengthInput = prompt("Please choose an integer from 8 to 128 for characters)");
    var length = parseFloat(lengthInput);

    // This will test if integer is less than 7 or greater than 128
    if (!Number.isInteger(length)) {
        return -1;
    } else if (length < 8) {
        return -1;
    } else if (length > 128) {
        return -1;
    }
    return length;
}

// Prompts user for 1 to 4 character sets
function getChars() {
    var chars = "";
    for (var index = 0; index < CHAR_OPTIONS.length; index++) {
        var fullCharSetEl = CHAR_OPTIONS[index];
        if (confirm("Do you want " + fullCharSetEl.description)) {
            chars += fullCharSetEl.charSet;
        }
    }
    return chars;
}

// Creates a password from input from prompts
function createPassword(availableChars, length) {
    var result = "";
    for (var index = 0; index < length; index++) {
        result += getRandomChar(availableChars);
    }
    return result;
}

// Displays generated password to HTML page
function updatePage(password) {
    document.getElementById("password").textContent = password;
}

// Math.floor rounds math.random
function getRandomChar(availableChars) {
    var index = Math.floor(Math.random() * availableChars.length);
    return availableChars[index];
}