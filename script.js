var userPasswordLengthText = document.getElementById("user-number");

var checkboxSelected = document.getElementsByClassName("checkbox-01");

// var userPasswordLength = userNumber.value;

var passwordText = document.querySelector("#password");


var resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", function() {
  passwordText.value = "";
  userPasswordLengthText.value = "";
  document.getElementById('error-01').textContent = '';
  document.getElementById('error-02').textContent = '';
  
  for (i = 0; i < checkboxSelected.length; i++){
    checkboxSelected[i].checked = false ;
  }
});

var copyBtn = document.querySelector("#copy");
copyBtn.addEventListener("click", function() {
  passwordText.select();
  document.execCommand('copy')
});

var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", generatePassword);

var characterSet = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  special: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};


function generatePassword() {
  clearContents();

  var userCheckboxSelected = [];
  if (userPasswordLengthText.value === '') {
    document.getElementById('error-01').textContent = 'Please enter a password length number';
    return;
  }
  
  for (i = 0; i < checkboxSelected.length; i++) {
    if (checkboxSelected[i].checked) {
      userCheckboxSelected.push(checkboxSelected[i].value.toLowerCase());
    }
  }

  if(userCheckboxSelected.length === 0) {
    document.getElementById('error-02').textContent = 'Please select at least one character';
    return;
  }

  var userPasswordLength = parseInt(userPasswordLengthText.value);

  var isValidPasswordSize = userPasswordLength >= 8 && userPasswordLength <= 128;

  if (!isValidPasswordSize) {
    document.getElementById('error-01').textContent = 'Please enter a valid password length';
    return;
  }

  passwordText.value = getPassword();
  function clearContents() {
    document.querySelector("#password").value = "";
    password = "";
    document.getElementById('error-01').textContent = '';
    document.getElementById('error-02').textContent = '';

  }

  function getPassword() {
    var password = "";
    for (i = 0; i <= userPasswordLength; i++) {
      var selectedCharacterIndex = Math.floor(
        Math.random() * userCheckboxSelected.length
      );
      var selectedCharacter = characterSet[userCheckboxSelected[selectedCharacterIndex]];
      var characterIndex = Math.floor(Math.random() * selectedCharacter.length);
      password += selectedCharacter[characterIndex];
    }

    return password;
  }
}
