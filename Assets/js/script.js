//Select elements by CSS selectors and save it to a variable.
var userPasswordLengthText = document.getElementById("user-number");
var checkboxSelected = document.getElementsByClassName("checkbox-01");
var passwordText = document.querySelector("#password");
var resetBtn = document.querySelector("#reset");
var copyBtn = document.querySelector("#copy");
var generateBtn = document.querySelector("#generate");

//Created an object of all the character I am going to use.
var characterSet = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  special: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

//Created an event listener for reset button, where it clears all variable value from previous function
resetBtn.addEventListener("click", function () {
  passwordText.value = "";
  userPasswordLengthText.value = "";
  document.getElementById("error-01").textContent = "";
  document.getElementById("error-02").textContent = "";
  for (i = 0; i < checkboxSelected.length; i++) {
    checkboxSelected[i].checked = false;
  }
});

//Created an event listener for copy button, where it copies the generated password value.
copyBtn.addEventListener("click", function () {
  passwordText.select();
  document.execCommand("copy");
});

//When the generate password is clicked, it will run the generatePassword function.
generateBtn.addEventListener("click", generatePassword);

//Function clears all variable value from previous function, before the function is run every time.
function clearContents() {
  document.querySelector("#password").value = "";
  password = "";
  document.getElementById("error-01").textContent = "";
  document.getElementById("error-02").textContent = "";
}

function generatePassword() {
  clearContents();
  var userCheckboxSelected = [];

  //Error check
  if (userPasswordLengthText.value === "") {
    document.getElementById("error-01").textContent =
      "Please enter a password length number";
    return;
  }

  //The for loop will save the checked checkboxes in the userCheckboxSelected array.
  for (i = 0; i < checkboxSelected.length; i++) {
    if (checkboxSelected[i].checked) {
      userCheckboxSelected.push(checkboxSelected[i].value.toLowerCase());
    }
  }
  if (userCheckboxSelected.length === 0) {
    document.getElementById("error-02").textContent =
      "Please select at least one character";
    return;
  }

  //Convert user's password length input into an integer and saves it in the userPasswordLength variable.
  var userPasswordLength = parseInt(userPasswordLengthText.value);

  //Error check
  var isValidPasswordSize =
    userPasswordLength >= 8 && userPasswordLength <= 128;
  if (!isValidPasswordSize) {
    document.getElementById("error-01").textContent =
      "Please enter a valid password length";
    return;
  }
  //getPassword loops through checked characters and randomly generates a password.
  function getPassword() {
    var password = "";
    for (i = 0; i < userPasswordLength; i++) {
      var selectedCharacterIndex = Math.floor(
        Math.random() * userCheckboxSelected.length
      );
      var selectedCharacter =
        characterSet[userCheckboxSelected[selectedCharacterIndex]];
      var characterIndex = Math.floor(Math.random() * selectedCharacter.length);
      password += selectedCharacter[characterIndex];
    }
    return password;
  }
  passwordText.value = getPassword();
}
