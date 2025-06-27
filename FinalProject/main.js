// MINI GAME LOGIC
if (document.getElementById('letters')) {
  const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const GRID_SIZE = 60; // 10x6

  let correctLetter = '';
  let msgEl = document.getElementById('msg');
  let lettersEl = document.getElementById('letters');
  let answerForm = document.getElementById('answer-form');
  let answerInput = document.getElementById('answer');

  function randomLetter(exclude) {
    let letter;
    do {
      letter = ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
    } while (letter === exclude);
    return letter;
  }

  function setGame() {
    msgEl.textContent = '';
    answerInput.value = '';
    answerInput.focus();

    const mainLetter = ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
    correctLetter = randomLetter(mainLetter);

    const correctPos = Math.floor(Math.random() * GRID_SIZE);
    let arr = Array(GRID_SIZE).fill(mainLetter);
    arr[correctPos] = correctLetter;

    lettersEl.innerHTML = '';
    arr.forEach(l => {
      const span = document.createElement('span');
      span.textContent = l;
      lettersEl.appendChild(span);
    });
  }

  answerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userAns = answerInput.value.trim().toUpperCase();
    if (!userAns) return;

    if (userAns === correctLetter) {
      msgEl.textContent = `Good job! The answer was "${correctLetter}".`;
      setTimeout(setGame, 1400);
    } else {
      msgEl.textContent = 'Try again!';
      answerInput.value = '';
      answerInput.focus();
    }
  });

  window.onload = setGame;
}

// PERSONALITY TEST LOGIC
if (document.getElementById('quiz')) {
  //types
  let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // Qesstions
  const questions = [
  // E/I
  { q: "You enjoy parties with many people.", a: ["Yes", "No"], axis: ["E", "I"] },
  { q: "You find it easy to approach strangers.", a: ["Yes", "No"], axis: ["E", "I"] },
  { q: "You feel drained after socializing.", a: ["Yes", "No"], axis: ["I", "E"] }, // Yes→I, No→E

  // S/N
  { q: "You focus on details rather than big ideas.", a: ["Yes", "No"], axis: ["S", "N"] },
  { q: "You prefer facts over theories.", a: ["Yes", "No"], axis: ["S", "N"] },
  { q: "You are drawn to abstract concepts.", a: ["Yes", "No"], axis: ["N", "S"] }, // Yes→N, No→S

  // T/F
  { q: "You make decisions with your head, not your heart.", a: ["Yes", "No"], axis: ["T", "F"] },
  { q: "You find it easy to empathize.", a: ["Yes", "No"], axis: ["F", "T"] }, // Yes→F, No→T
  { q: "You value logic over feelings.", a: ["Yes", "No"], axis: ["T", "F"] },

  // J/P
  { q: "You like to plan ahead.", a: ["Yes", "No"], axis: ["J", "P"] },
  { q: "You adapt easily to changes.", a: ["Yes", "No"], axis: ["P", "J"] }, // Yes→P, No→J
  { q: "You keep to-do lists.", a: ["Yes", "No"], axis: ["J", "P"] }
  ];

  // MBTItype and description
  const mbtiTypes = {
  ISTJ: {
    label: "The Inspector",
    aliases: ["Elsa (Frozen)", "Hermione Granger", "Levi Ackerman (Attack of Titan)", "Batman (Batman)"],
    desc: "Dependable and detail-oriented, you keep order even when chaos is knocking at the door. People may say you’re a stickler for rules, but deep down, you know every group needs someone who reads the fine print. Sometimes your practical approach can feel a bit frosty, but your reliability is the stuff of legends. Remember: even the most steadfast need a break—don’t be afraid to let your hair down!"
  },
  ISFJ: {
    label: "The Protector",
    aliases: ["Mother Teresa", "Baymax (Big Hero 6)", "Cinderella", "Hinata Hyuga (Naruto)"],
    desc: "You’re the gentle heart and loyal friend, always ready to lend a hand (or an ear). Your kindness is your superpower; you’re often the unsung hero behind the scenes. While you sometimes forget your own needs, the world would be a colder place without your warm support. Don’t be afraid to ask for help yourself—heroes deserve kindness too!"
  },
  INFJ: {
    label: "The Advocate",
    aliases: ["Martin Luther King Jr.", "Gandalf (The Lord of the Rings)", "Albus Dumbledore (Harry Potter)", "Light Yagami (Death Note)"],
    desc: "Visionary and empathetic, you strive to make the world a better place—one earnest conversation at a time. You see potential where others see problems, and your insights are often ahead of their time. People may not always understand your depth, but that’s okay: your unique perspective is a rare gift. Don’t forget to recharge your own magic while you’re helping others find theirs."
  },
  INTJ: {
    label: "The Architect",
    aliases: ["Doctor Strange (Marvel)", "Scar (The Lion King)", "Sherlock Holmes (Sherlock Holmes)", "Mark Zuckerberg"],
    desc: "Strategic and independent, you can see five moves ahead when others are just learning the rules. Your plans are as intricate as a Marvel multiverse—just don’t be surprised if people don’t always keep up! Sometimes your high standards can seem intimidating, but your vision inspires those who dare to dream big. Remember, even masterminds need a team now and then."
  },
  ISTP: {
    label: "The Virtuoso",
    aliases: ["Mulan", "Han Solo", "Iron Man (Tony Stark)", "James Bond"],
    desc: "You’re the hands-on hero, always ready to fix, tinker, or leap into action. Calm in a crisis, you solve problems others haven’t even noticed. While your independence is legendary, sometimes you forget to tell the team what you’re up to! Remember: even lone wolves need a pack from time to time."
  },
  ISFP: {
    label: "The Artist",
    aliases: ["Michael jackson", "Mozart", "Harry Potter", "Lana Del Rey"],
    desc: "Gentle, creative, and in tune with beauty, you bring color to the world around you. Sensitive to others’ feelings, you may retreat when things get loud—but your quiet presence is deeply valued. Your unique perspective turns the ordinary into art. Don’t be afraid to share your colors with the world—it’s brighter because of you."
  },
  INFP: {
    label: "The Mediator",
    aliases: ["Belle (Beauty and the Beast)", "Chihiro Ogino (Spirited Away)", "Kenshin Himura (Rurouni Kenshin)", "John Lennon"],
    desc: "Idealistic and compassionate, you see the world not only as it is, but as it could be. You’re a champion for the underdog, and your imagination knows no bounds. Sometimes your daydreaming can leave you adrift, but your kindness and hope inspire everyone you meet. Don’t let the world harden your heart—your dreams matter."
  },
  INTP: {
    label: "The Thinker",
    aliases: ["Sherlock Holmes", "Alice (Alice in Wonderland)", "Albert Einstein", "Rei Ayanami (Neon Genesis Evangelion)"],
    desc: "Curious and analytical, you love dissecting ideas as much as others love their morning coffee. Your mind is a playground for theories, and you’re never afraid to question the status quo. While some may find you lost in thought, you’re just exploring the universe within. Remember: sometimes the best discoveries happen when you share your ideas out loud."
  },
  ESTP: {
    label: "The Entrepreneur",
    aliases: ["Flynn Rider (Tangled)", "Jack Sparrow", "Iron Man (Tony Stark)", "Rengoku Kyojuro (Demon Slayer)"],
    desc: "Bold, energetic, and always ready for action, you turn every moment into an adventure. Your charm gets you out of (and into) trouble—sometimes faster than you can say 'improvise.' While risk is your middle name, don’t forget to check your parachute! The world needs your daring spirit—just remember to look before you leap (occasionally)."
  },
  ESFP: {
    label: "The Performer",
    aliases: ["Genie (Aladdin)", "Olaf (Frozen)", "Jessie (Pokémon)", "Beyoncé"],
    desc: "Life is your stage, and you make every day a celebration! Your infectious energy brings joy to those around you, and you’re always ready to turn up the music. Sometimes your quest for fun can lead to distraction, but your zest for life is your superpower. The world is brighter (and louder) with you in it—keep shining!"
  },
  ENFP: {
    label: "The Campaigner",
    aliases: ["Rapunzel (Tangled)", "Monkey D. Luffy (One Piece)", "Spider-Man (Peter Parker)", "Hoshino Ai (Oshi no Ko)"],
    desc: "You bring color to the world with your energy and imagination, brightening up even the dullest day! People love your infectious enthusiasm, though occasionally your ideas might tangle you up. You may find it hard to finish what you start, but your ability to inspire is second to none. Keep dreaming—and don’t forget to let your hair down!"
  },
  ENTP: {
    label: "The Debater",
    aliases: ["Hades (Hercules)", "Ryuk (Death Note)", "Dazai Osamu", "Gintoki Sakata (Gintama)"],
    desc: "Quick-witted and endlessly curious, you can argue any side (sometimes just for fun). Your creativity knows no bounds, and new ideas are your playground. While some may struggle to keep up with your mental gymnastics, your debates spark innovation. Just remember, not every conversation has to be a competition—sometimes it’s okay to let others win (once in a while)."
  },
  ESTJ: {
    label: "The Supervisor",
    aliases: ["Captain America (Marvel)", "Vegeta (Dragon Ball)", "Woody (Toy Story)", "Princess Leia (Star Wars) "],
    desc: "Organized, pragmatic, and direct, you keep everyone on track—even when they’d rather be anywhere else! Your leadership is invaluable, but sometimes your high standards can feel a bit much. Remember, not everyone loves rules as much as you do. The world needs your structure, but don’t forget to enjoy the ride too."
  },
  ESFJ: {
    label: "The Consul",
    aliases: ["Snow White", "Mickey Mouse", "Takashi Morinozuka (Ouran High School Host Club)", "Oprah Winfrey"],
    desc: "You’re the ultimate host, making everyone feel welcome and valued. Your kindness and sense of duty bring people together—just don’t wear yourself out trying to please everyone! Remember, it’s okay to take a bite out of life for yourself, too. The world is sweeter with you in it."
  },
  ENFJ: {
    label: "The Protagonist",
    aliases: ["Mufasa (The Lion King)", "Wonder Woman", "All Might (My Hero Academia)", "Barack Obama"],
    desc: "Charismatic and inspiring, you lead by example—lifting others up along the way. Your empathy and drive to help are legendary, but sometimes you take on too much. Remember, even heroes need rest: your light shines brightest when you care for yourself, too. Keep guiding others—your story is only getting started."
  },
  ENTJ: {
    label: "The Commander",
    aliases: ["Steve Jobs", "Azula (Avatar)", "Darth Vader (Star Wars)", "Maleficent"],
    desc: "Bold and strategic, you blaze trails where others see roadblocks. You’re a natural leader who thrives on challenges, but your intensity can sometimes intimidate. Remember, even the strongest commanders need allies—and a little kindness goes a long way. The future is yours to shape."
  }
};

let answers = [];
let current = 0;
let shuffledQuestions = [];

function shuffleArray(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

window.choose = function(ans) {
  answers.push(ans);
  // Yes→axis[0]+1, No→axis[1]+1
  const axis = shuffledQuestions[current].axis; 
  if (ans === 0) {
    scores[axis[0]]++;
  } else {
    scores[axis[1]]++;
  }
  current++;
  if (current < shuffledQuestions.length) { 
    showQuestion();
  } else {
    showResult();
  }
};

function showQuestion() {
  const quiz = document.getElementById('quiz');
  quiz.style.display = "block";
  document.getElementById('result').style.display = "none";
  if (current < shuffledQuestions.length) { 
    quiz.innerHTML = `
      <h2>Question ${current + 1} of ${shuffledQuestions.length}</h2>
      <p>${shuffledQuestions[current].q}</p>
      <button onclick="choose(0)">${shuffledQuestions[current].a[0]}</button>
      <button onclick="choose(1)">${shuffledQuestions[current].a[1]}</button>
    `;
  }
}

function getType(scores) {
  function resolve(a, b) {
    if (scores[a] > scores[b]) return a;
    if (scores[b] > scores[a]) return b;
    return Math.random() < 0.5 ? a : b; // 同点ならランダム
  }
  return (
    resolve("E", "I") +
    resolve("S", "N") +
    resolve("T", "F") +
    resolve("J", "P")
  );
}

function showResult() {
  const result = document.getElementById('result');
  const type = getType(scores); 
  const quiz = document.getElementById('quiz');
  quiz.style.display = "none";

  const tinfo = mbtiTypes[type];
  document.getElementById('result-img1').src = `Images/${type}1.jpg`;
  document.getElementById('result-img2').src = `Images/${type}2.jpg`;
  document.getElementById('result-type').innerText = tinfo.label;
  document.getElementById('result-aliases').innerText = tinfo.aliases ? tinfo.aliases.join(", ") : "";
  document.getElementById('result-desc').innerText = tinfo.desc;
  result.style.display = "block";
}

window.onload = function() {
  answers = [];
  current = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  shuffledQuestions = shuffleArray(questions); 
  showQuestion();
};
}

// FEEDBACK FORM LOGIC
if (document.getElementById('form')) {
  document.getElementById('form').onsubmit = function(e) {
    e.preventDefault();
    var msg = document.getElementById('msg');
    var comments = document.getElementById('comments').value.trim();
    var rating = document.getElementById('rating').value;

    if(comments.length < 5) {
      msg.textContent = "Please enter at least 5 characters in comments.";
      msg.style.color = "crimson";
      return;
    }
    if(!rating) {
      msg.textContent = "Please select a rating.";
      msg.style.color = "crimson";
      return;
    }
    msg.textContent = "Thank you for your feedback!";
    msg.style.color = "#43c6ac";
    document.getElementById('form').reset();
  }
}