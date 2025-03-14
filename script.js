// Particle system configuration
const PARTICLE_CONFIG = {
  count: 100,
  maxSize: 20,
  baseSpeed: 0.5,
  colorPalettes: [
    ["#FF00FF", "#00FF00", "#0000FF"], // Traditional Holi colors
    ["#FF6B6B", "#4ECDC4", "#45B7D1"], // Modern pastel mix
    ["#FF0000", "#00FF00", "#FFFF00"], // Bright primary colors
  ],
};

// Canvas elements and particles
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

// Initialize canvas dimensions
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Particle class definition
class Particle {
  constructor() {
    this.colorPalette =
      PARTICLE_CONFIG.colorPalettes[
        Math.floor(Math.random() * PARTICLE_CONFIG.colorPalettes.length)
      ];
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * PARTICLE_CONFIG.maxSize + 1;
    this.speedX = (Math.random() - 0.5) * PARTICLE_CONFIG.baseSpeed;
    this.speedY = (Math.random() - 0.5) * PARTICLE_CONFIG.baseSpeed;
    this.color =
      this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
  }

  update() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      const force = (mouse.radius - distance) / mouse.radius;
      this.speedX += (dx / distance) * force * 0.1;
      this.speedY += (dy / distance) * force * 0.1;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles
function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
    particles.push(new Particle());
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

// Event listeners
window.addEventListener("resize", () => {
  initCanvas();
  initParticles();
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle());
  }
});

// Name personalization feature
function updateGreeting() {
  const nameInput = document.getElementById("nameInput");
  const greeting = document.getElementById("greeting");
  const subtitle = document.querySelector(".subtitle");

  if (nameInput.value.trim()) {
    greeting.textContent = `Happy Holi, ${nameInput.value}!`;
    subtitle.textContent = "May your life be as colorful as this festival!";

    subtitle.style.animation = "none";
    void subtitle.offsetHeight;
    subtitle.style.animation = "float 3s ease-in-out";

    setTimeout(() => {
      nameInput.value = "";
      greeting.textContent = "Happy Holi";
      subtitle.textContent = "Let's Paint the Digital Sky!";
    }, 30000);
  }
}

// Holi facts system
let HOLI_FACTS = [];
let currentFact = 0;
const factElement = document.querySelector(".fact-bubble");
const FALLBACK_FACTS = [
  "Holi marks the arrival of spring and victory of good over evil",
  "Traditional colors were made from flowers like tesu & palash",
  "The festival is celebrated as Dol Jatra in West Bengal",
  "Holi celebrations date back to 4th century CE",
  "The night before Holi is called Holika Dahan",
  "Lathmar Holi in Barsana is famous for women playfully hitting men",
  "Bhagavad Gita mentions Holi as 'Vasanta-Mahotsava'",
  "Holi powder colors are called 'gulal' in Hindi",
  "World's biggest Holi celebration happens in Uttar Pradesh",
  "Holi colors were originally made from medicinal herbs",
];

function showNextFact() {
  // Initialize with fallback facts if empty
  if (HOLI_FACTS.length === 0) {
    HOLI_FACTS = FALLBACK_FACTS;
  }

  // Sparkle animation
  for (let i = 0; i < 15; i++) {
    setTimeout(() => createHoliGraphic(), i * 50);
  }

  // Show current fact
  factElement.textContent = HOLI_FACTS[currentFact];
  factElement.classList.add("show");

  // Schedule next fact
  setTimeout(() => {
    factElement.classList.remove("show");
    currentFact = (currentFact + 1) % HOLI_FACTS.length;
    setTimeout(showNextFact, Math.random() * 4000 + 1000);
  }, 5000);
}

// SVG graphics system
function createHoliGraphic() {
  const svgNS = "http://www.w3.org/2000/svg";
  const graphic = document.createElementNS(svgNS, "svg");
  const useElement = document.createElementNS(svgNS, "use");

  graphic.setAttribute("class", "holi-graphic");
  graphic.setAttribute("width", "50");
  graphic.setAttribute("height", "50");
  graphic.style.left = `${Math.random() * window.innerWidth}px`;
  graphic.style.top = `${Math.random() * window.innerHeight}px`;

  useElement.setAttribute("href", Math.random() > 0.5 ? "#pichkari" : "#gulal");
  graphic.appendChild(useElement);
  document.body.appendChild(graphic);
  setTimeout(() => graphic.remove(), 5000);
}

// Character animation system
function createCharacter(symbolId, xPos, delay) {
  const svgNS = "http://www.w3.org/2000/svg";
  const character = document.createElementNS(svgNS, "svg");

  character.setAttribute("class", "holi-character");
  character.setAttribute("width", "120");
  character.setAttribute("height", "120");
  character.style.left = xPos;
  character.style.bottom = "-10px";
  character.innerHTML = `<use href="#${symbolId}"/>`;

  if (symbolId === "dog") {
    character.style.height = "60px";
    character.style.filter = "drop-shadow(0 0 5px #FFD600)";
    character.style.animation = "dogRun 1.5s ease-in-out infinite";
  }

  // Click handler for extra color bursts
  character.addEventListener("click", () => {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createHoliGraphic(), i * 50);
    }
  });

  setTimeout(() => {
    document.body.appendChild(character);
  }, delay * 1000);

  return character;
}

// Progressive reveal system
function createProgressiveCharacters() {
  // First kid with pichkari (left side)
  createCharacter("kid1", "10%", 0);

  // Dog appears after 15 seconds
  createCharacter("dog", "30%", 15);

  // Second kid appears after 30 seconds (right side)
  createCharacter("kid2", "70%", 30);
}

// Initialize application
initCanvas();
initParticles();
animate();
showNextFact();
createProgressiveCharacters();
setInterval(createHoliGraphic, 3000);

// Airplane system
let clickAeroplaneCount = 0;
function createAirplane() {
  const svgNS = "http://www.w3.org/2000/svg";
  const plane = document.createElementNS(svgNS, "svg");

  plane.setAttribute("class", "holi-plane");
  plane.innerHTML = `<use href="#holi-plane"/>`;
  plane.style.top = `${Math.random() * 50 + 10}vh`;

  plane.addEventListener("click", () => {
    clickAeroplaneCount++;

    // Create color burst on click
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createHoliGraphic(), i * 10);
    }

    // When 10 clicks have been reached, show the floating video
    if (clickAeroplaneCount === 10) {
      showFloatingVideo();
    }
  });

  document.body.appendChild(plane);
  setTimeout(() => plane.remove(), 30000); // Match animation duration
}

// Initialize airplane system
createAirplane(); // Immediate test
setInterval(createAirplane, 40000); // Regular flights

function showFloatingVideo() {
  // Create a container for the floating video
  const videoContainer = document.createElement("div");
  videoContainer.setAttribute("id", "floating-video");

  // Create the YouTube iframe
  const iframe = document.createElement("iframe");
  iframe.width = "280";
  iframe.height = "158";
  iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  iframe.title = "YouTube video player";
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  videoContainer.appendChild(iframe);
  document.body.appendChild(videoContainer);

  // Function to move the video container to a random position
  function moveVideoRandomly() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const videoWidth = videoContainer.offsetWidth;
    const videoHeight = videoContainer.offsetHeight;

    // Calculate maximum left and top so the video stays in view
    const maxLeft = windowWidth - videoWidth;
    const maxTop = windowHeight - videoHeight;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    videoContainer.style.left = randomLeft + "px";
    videoContainer.style.top = randomTop + "px";
  }

  // Move the video every 5 seconds
  setInterval(moveVideoRandomly, 5000);
  // Initial random placement
  moveVideoRandomly();
}
