const para = [
  "Trust in Allah is the key to relief: Whenever you feel distressed, remember that Allah is with you and will never abandon you. Just trust Him and be patient; after hardship comes ease.",
  "Patience is the path to success: Never give up no matter how long the road is. Patience is one of the greatest virtues encouraged in Islam and it leads to relief and achievement.",
  "Knowledge and action go hand in hand: Seeking knowledge is a duty, and acting upon it is an honor. Set a goal for yourself and strive for it with faith in Allah and reliance on Him.",
  "Good intentions bring blessings: Make your intention sincere for Allah in every action, for actions are judged by intentions. Pure intentions open the doors of mercy and blessing.",
  "Reliance on Allah leads to right guidance: Tawakkul (trust in God) doesn’t mean neglecting effort but relying on Allah after you have done your best.",
  "Righteous deeds are the path to contentment: Fill your life with good deeds that bring you closer to Allah and strengthen your heart and peace of mind.",
  "Humility is strength, not weakness: Be humble in all matters. Humility is a trait of the Prophets and makes people love and accept you.",
  "Persistence is the secret to excellence: Don’t stop at the first obstacle. Islam encourages perseverance, diligence, and hard work.",
  "Optimism in Allah gives you hope: Never close the door of hope no matter how tough things get. Allah writes good for you in ways you cannot imagine.",
  "Forgiving others frees your soul: Forgiveness is a characteristic of great believers. It frees your heart from bitterness and increases your happiness.",
  "Remembering Allah strengthens the heart: Make dhikr (remembrance of God) a daily habit. It soothes the heart and increases focus and determination.",
  "A noble goal always motivates: Set a noble goal to pursue, like being a source of good for your community. High goals elevate a person’s value.",
  "Honesty is the foundation of every successful action: Being truthful with Allah, yourself, and others opens the doors of blessing and success in this life and the Hereafter.",
  "Thankfulness to Allah increases blessings: Always thank Allah for every blessing in your life. Gratitude brings more and strengthens your relationship with the Creator.",
  "Believing in yourself is part of believing in Allah: Value yourself and give yourself the chance to succeed. Islam encourages positivity and self-confidence.",
  "Love and kindness build strong communities: Be a source of love and goodness. Acts of kindness illuminate your path and leave a beautiful impact on others.",
  "Never giving up is the secret of the great: Don’t let despair creep in. The Prophet Muhammad (sallallahu alaihi wasallam) said: “Amazing is the affair of the believer; verily all of his affairs are good.”",
  "Balance between this world and the Hereafter is the secret to happiness: Work for your worldly life in a way that pleases Allah, and be ready for the Hereafter. True happiness lies in balance.",
  "Supplication is the believer’s weapon: Never neglect dua (prayer). It is the best way to connect with Allah and seek help and blessings in every matter."
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * para.length);
  typingText.innerHTML = "";
  para[ranIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    mistakeTag.innerText = mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
