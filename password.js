/* Constants and character options */
const MIN_CHARS = 8;
const MAX_CHARS = 128;
const CHAR_OPTIONS = [
    {
        description: "SPECIAL characters",
        charSet: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    },
    {
        description: "NUMBERS",
        charSet: "0123456789"
    },
    {
        description: "LOWERCASE characters",
        charSet: "abcdefghijklmnopqrstuvwxyz"
    },
    {
        description: "UPPERCASE characters",
        charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    },
];


/* These are temporary elements grabbed by Id from the HTML page */
var txtPasswordEl = document.getElementById("password");
var btnGenerateEl = document.getElementById("generate");
var btnCopyEl = document.getElementById("copy");


/* Globals */
var pwLength = -1;
var pwChars = "";

// When clicked, this button will generate password as long as 
btnGenerateEl.addEventListener("click", function () {
    if (pwChars !== "" || userPrompts()) {
        var password = createPassword(pwChars, pwLength);
        updatePage(password);
    }
});

// When clicked, this button will copy generated password to clipboard
btnCopyEl.addEventListener("click", function () {
    txtPasswordEl.select();
    txtPasswordEl.setSelectionRange(0, 128);
    document.execCommand("copy");
});


//*********************************
// SUPPORT FUNCTIONS
//*********************************

/*
 *  Prompt the user for a password length
 *  Validate the input.
 *  Returns true on success, false otherwise 
 * 
 */
function userPrompts() {
    pwLength = getLength();
    if (pwLength < 0) {
        alert("INVALID INPUT - Length must be an integer between " + MIN_CHARS + " and " + MAX_CHARS + "!");
        return false;
    }

    pwChars = getChars();
    if (pwChars === "") {
        alert("INVALID INPUT - You must select at least 1 character set to use");
        return false;
    }
    return true;
}

/*
 * Prompt the user for a Password Length and validate the input
 */
function getLength() {
    var lengthInput = prompt("How long should the password be? (" + MIN_CHARS + " - " + MAX_CHARS + " characters)");
    var length = parseFloat(lengthInput);

    if (!Number.isInteger(length)) {
        return -1;
    } else if (length < MIN_CHARS) {
        return -1;
    } else if (length > MAX_CHARS) {
        return -1;
    }
    return length;
}

/*
 * Give the user a series of prompt to determine which characters to use
 * Returns a string of characters that can be used in the password
 */
function getChars() {
    var chars = "";

    for (var index = 0; index < CHAR_OPTIONS.length; index++) {
        var option = CHAR_OPTIONS[index];
        if (confirm("Use " + option.description + "?")) {
            chars += option.charSet;
        }
    }
    return chars;
}

/*
 *  Create a random password string of a specified length from the available characters string
 *  Returns randomly generated string
 */
function createPassword(availableChars, length) {
    var result = "";
    for (var index = 0; index < length; index++) {
        result += getRandomChar(availableChars);
    }
    return result;
}

/*
 *  Update Page HTML with newly Generated Password and Enable Copy button
 */
function updatePage(password) {
    document.getElementById("password").textContent = password;
    btnCopyEl.disabled = false;
}

/*
 *  Return a single random character from a string of available characters
 */
function getRandomChar(availableChars) {
    var index = Math.floor(Math.random() * availableChars.length);
    return availableChars[index];
}