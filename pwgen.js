/* Globals */
var pwLength = -1;
var pwChars = "";
var txtPasswordEl = document.getElementById("password");
var btnGenerateEl = document.getElementById("generate");
var btnCopyEl = document.getElementById("copy");


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
    txtPasswordEl.setSelectionRange(0, 99999);
    document.execCommand("copy");
});

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


    //Prompts user for preferences. This is stored so the password characters go up to pwCharsEl.

    var pwCharsEl =
        prompt("Password character limit? Pick between 8 and 128 characters.");
    if (pwCharsEl > 128 || pwCharsEl < 8) {
        pwCharsEl = prompt("Not valid. Must be between 8 and 128.");
    }
    if (pwCharsEl > 128 || pwCharsEl < 8) {
        pwCharsEl = prompt("Not valid, AGAIN. Must be between 8 and 128. Last chance, buddy!");
    }
    if (pwCharsEl > 128 || pwCharsEl < 8) {
        location.reload();
    }
    else {
        var specialCharacters = confirm("Special Characters?")
        //include specialCharacters. if false/else, do not include specialCharacters in var charList in function.

        var numberCharacters = confirm("Numbers?")
        //include numberCharacters. if false/else, do not include numbers in var charList in function.

        var upperCharacters = confirm("Uppercase letters?")
        //include upperCharacters. if false/else, do not include uppercase in var charList in function.

        var lowerCharacters = confirm("Lowercase letters?")
        //include lowerCharacters. if false/else, do not include lowercase in var charList in function.

        //On button click, generate password.
        function generatePassword() {

            //var charList is initially blank, as the user has not input their preferences.
            var charList = "";

            //if specialCharacters is true, the string gets added to charList.
            if (specialCharacters) {
                charList = charList + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
            }

            //if numberCharacters is true, the string gets added to charList.
            if (numberCharacters) {
                charList = charList + "1234567890";
            }

            //if upperCharacters is true, the string gets added to charList.
            if (upperCharacters) {
                charList = charList + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }

            //if lowerCharacters is true, the string gets added to charList.
            if (lowerCharacters) {
                charList = charList + "abcdefghijklmnopqrstuvwxyz";
            }

            //if none are true, var charList stays blank. WHEN YOU CLICK GENERATE, THIS ALERT WILL POP UP BECAUSE YOU DIDN'T CHOOSE ANY CRITERIA!!!!!
            if (charList == "") {
                alert("You didn't pick any criteria! This is not a fingerprint reader. Refresh to try again.");
                return;
            }

            // var pass is user password.
            var pass = "";

            //i goes up to user's indicated pwCharsEl, and picks randomly from charList string.
            for (var i = 0; i < pwCharsEl; i++) {
                pass += charList[Math.floor(Math.random() * charList.length)];
            }
            document.getElementById('passwordBox').value = pass;
        }

        //Button copies the password generated to clipboard.
        function copyPassword() {
            var copyText = document.getElementById("passwordBox");
            copyText.select();
            copyText.setSelectionRange(0, 128);
            document.execCommand("copy");

        }
    }