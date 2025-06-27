// main.js

// Demo animal data for encyclopedia page
const demoAnimals = [
  {
    name: "Glitternox",
    feature: "Shines with rainbow fur at night",
    fact: "It can communicate using colorful light patterns."
  },
  {
    name: "Leafhopper",
    feature: "Jumps between treetops with wing-like ears",
    fact: "Its ears help it glide for long distances."
  },
  {
    name: "Bubbletail",
    feature: "Has a tail that blows floating bubbles",
    fact: "The bubbles carry its scent to attract friends."
  }
];

// Render animal cards on encyclopedia.html
if (document.querySelector(".animal-list")) {
  const list = document.querySelector(".animal-list");
  demoAnimals.forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.innerHTML = `
      <h3>${animal.name}</h3>
      <div class="feature">Feature: ${animal.feature}</div>
      <div class="fact">Fun Fact: ${animal.fact}</div>
    `;
    list.appendChild(card);
  });
}

// Handle create animal form on create.html
if (document.querySelector("#create-animal-form")) {
  const form = document.querySelector("#create-animal-form");
  const output = document.querySelector("#generated-animal");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get values from form
    const name = form["animal-name"].value.trim();
    const feature = form["animal-feature"].value.trim();
    const fact = form["animal-fact"].value.trim();

    // Simple validation
    if (!name || !feature || !fact) {
      output.innerHTML = `<p style="color:red;">Please fill in all fields.</p>`;
      return;
    }

    // Show generated animal card
    output.innerHTML = `
      <div class="animal-card">
        <h3>${name}</h3>
        <div class="feature">Feature: ${feature}</div>
        <div class="fact">Fun Fact: ${fact}</div>
      </div>
      <p>Your animal has been created!</p>
    `;
    form.reset();
  });
}

// Handle feedback form on feedback.html
if (document.querySelector("#feedback-form")) {
  const form = document.querySelector("#feedback-form");
  const message = document.querySelector("#feedback-message");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get values from form
    const name = form["name"].value.trim();
    const email = form["email"].value.trim();
    const comments = form["comments"].value.trim();
    const rating = form["rating"].value;

    // Simple validation
    if (!name || !email || !comments || !rating) {
      message.innerHTML = `<p style="color:red;">Please fill in all fields.</p>`;
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      message.innerHTML = `<p style="color:red;">Please enter a valid email address.</p>`;
      return;
    }

    // Show thank you message
    message.innerHTML = `<p style="color:green;">Thank you for your feedback!</p>`;
    form.reset();
  });
}