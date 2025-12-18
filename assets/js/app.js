const form = document.querySelector("form");
const slider = document.getElementById("slider");
const sliderShowValue = document.querySelector(".slider--value");
const uppercaseBtn = document.querySelector("#uppercase");
const lowercaseBtn = document.querySelector("#lowercase");
const numbersBtn = document.querySelector("#numbers");
const symbolsBtn = document.querySelector("#symbols");
const infoIcons = document.querySelectorAll(".info--icon");
const passwordFeild = document.querySelector("#password--feild");
const passwordPower = document.querySelector(".password--power");
const copyBtn = document.querySelector(".icon--copy");
const copyTxtSection = document.querySelector(".copy--success");

// list
const upperCaseChars = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
const lowerCaseChars = "QWERTYUIOPASDFGHJKLZXCVBNM".toLowerCase().split("");
const nums = "123456789".split("");
const symbs = "!@#$%^&*()_+-=".split("");

// events
slider.addEventListener("input", calcLength);
form.addEventListener("submit", handeler);
copyBtn.addEventListener("click", copyPass);

// function
function calcLength(e) {
  const sliderValue = Math.floor(e.target.value / 100);
  const prsentage = Math.floor(e.target.value / 20);
  sliderShowValue.textContent = sliderValue;
  slider.style.background = `linear-gradient(to right,var(--color-green-200)${prsentage}%, var(--color-grey-900)${prsentage}%)`;
}

function handeler(e) {
  const passwordLength = Number(sliderShowValue.textContent);
  e.preventDefault();
  try {
    const calcChar = () => {
      let finalCharList = [];
      if (uppercaseBtn.checked) {
        finalCharList.unshift(...upperCaseChars);
      }

      if (lowercaseBtn.checked) {
        finalCharList.unshift(...lowerCaseChars);
      }

      if (numbersBtn.checked) {
        finalCharList.unshift(...nums);
      }

      if (symbolsBtn.checked) {
        finalCharList.unshift(...symbs);
      }

      if (finalCharList.length === 0) {
        return;
      }

      let password = [];

      for (let i = 0; i < passwordLength; i++) {
        password.push(finalCharList[randomNum(finalCharList)]);
      }
      return password.join("");
    };

    const password = calcChar();

    if (password.length <= 0 || password === undefined) {
      return;
    }
    passwordFeild.style.opacity = "1";
    passwordFeild.value = password;
    const checkBtns = [
      uppercaseBtn,
      lowercaseBtn,
      numbersBtn,
      symbolsBtn,
    ].filter((btn) => btn.checked);

    // reset info icon back ground
    infoIcons.forEach((icon) => {
      icon.style.background = ``;
    });

    checkBtns.forEach((btn, indexBtn) => {
      infoIcons.forEach((icon, indecIcon) => {
        if (indexBtn < indecIcon) {
          return;
        }
        icon.style.background = ``;

        if (checkBtns.length == 1) {
          icon.style.background = `var(--color-red-500)`;
          icon.style.transition = `all 400ms`;
          passwordPower.textContent = "TOO WEAK!";
        }
        if (checkBtns.length == 2) {
          icon.style.background = `var(--color-orange-400)`;
          icon.style.transition = `all 400ms`;
          passwordPower.textContent = "WEAK";
        }
        if (checkBtns.length == 3) {
          icon.style.background = `var(--color-yellow-300)`;
          icon.style.transition = `all 400ms`;
          passwordPower.textContent = "MEDIUM";
        }
        if (checkBtns.length == 4) {
          icon.style.background = `var(--color-green-200)`;
          icon.style.transition = `all 400ms`;
          passwordPower.textContent = "STRONG!";
        }
      });
    });
  } catch (e) {
    console.log();
  }
}

function copyPass(e) {
  if (passwordFeild.value.length === 0) {
    console.log("first");
    return;
  }
  navigator.clipboard.writeText(passwordFeild.value);

  copyTxtSection.textContent = "COPIED";
  setTimeout(() => {
    copyTxtSection.textContent = "";
  }, 4000);
}

function randomNum(maxNum = []) {
  return Math.floor(Math.random() * (maxNum.length - 0));
}
