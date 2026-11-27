/* DN3008 Generative Art, Cheng Ziren Alex 2026
 * Week 9 - Fractals & Recursion 
 * Assignment
*/


// ==========================================
// 1. GLOBAL VARIABLES
// ==========================================
// Maximum recursion depth of the tree
const DEPTH = 9;
// Store the random seed
let treeSeed = 7;
// Store the background graphics
let sky;
// Store the current season
// 0 = Spring, 1 = Summer, 2 = Autumn, 3 = Winter
let season = 0;
// Store the names of the seasons
const seasonNames = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
// Store falling particles in an array
let particles = [];
// Store wind movement
let wind = 0;


// ==========================================
// 2. SETUP
// ==========================================
// Setup canvas and background
function setup() {
  // Create an 800 by 800 canvas
  createCanvas(800, 800);
  // Set the color mode to HSB
  colorMode(HSB, 360, 100, 100, 100);
  // Create a separate graphics layer for the sky
  sky = createGraphics(width, height);
  // Draw the seasonal background
  paintSky(sky);
}


// ==========================================
// 3. DRAW
// ==========================================
// Draw the tree and background
function draw() {
  // Display the background
  image(sky, 0, 0);
  // Reset the random seed
  randomSeed(treeSeed);
  // Change the branch angle according to mouse position
  const angle = map(mouseX, 0, width, 0.15, 0.95);
  // Save the drawing settings
  push();
  // Move the origin to the bottom-centre
  translate(width / 2, height - 90);
  // Draw the recursive tree
  branch(150, DEPTH, angle);
  // Restore the previous drawing settings
  pop();

  // Draw the seasonal ground
  drawGround();
  // Create falling particles
  createParticles();
  // Update and display falling particles
  updateParticles();
  // Display the current season
  drawSeasonName();
}


// ==========================================
// 4. RECURSIVE TREE BRANCHES
// ==========================================
// Branch function
function branch(len, depth, angle) {
  // Calculate branch progress
  const t = 1 - depth / DEPTH;
  // Create variables for branch colours
  let bark;
  let twig;

  // SPRING: Brown bark and green twig
  if (season === 0) {
    bark = color(20, 45, 35);
    twig = color(110, 65, 65);
  }
  // SUMMER: Brown bark and green twig
  else if (season === 1) {
    bark = color(20, 45, 35);
    twig = color(110, 65, 65);
  }
  // AUTUMN: Brown bark and orange-red twig
  else if (season === 2) {
    bark = color(20, 45, 35);
    twig = color(15, 90, 85);
  }
  // WINTER: Brown bark and white twig
  else {
    bark = color(20, 45, 35);
    twig = color(0, 0, 100);
  }

  // Blend the bark and twig colours
  stroke(lerpColor(bark, twig, t));
  // Make thicker branches near the bark
  strokeWeight(map(depth, 0, DEPTH, 0.6, 16));
  // Make branch ends rounded
  strokeCap(ROUND);

  // Draw the branch upwards
  line(0, 0, 0, -len);
  // Move the origin to the branch tip
  translate(0, -len);

  // Stop branching when depth reaches zero
  if (depth === 0) {
    // Draw seasonal decorations
    blossom();
    return;
  }

  // Calculate the first branch angle
  const a1 = angle + random(-0.15, 0.15);
  // Calculate the second branch angle
  const a2 = -angle + random(-0.15, 0.15);
  // Calculate wind movement using Perlin noise
  wind = (noise(depth * 0.3, frameCount * 0.008) - 0.5) * 0.5 * t;

  // Draw the first branch
  push();
  rotate(a1 + wind);
  branch(len * random(0.66, 0.8), depth - 1, angle);
  pop();

  // Draw the second branch
  push();
  rotate(a2 + wind);
  branch(len * random(0.66, 0.8), depth - 1, angle);
  pop();
}


// ==========================================
// 5. SEASONAL TREE ELEMENTS
// ==========================================
// Blossom function
function blossom() {
  // Remove outlines
  noStroke();
  // Generate the same number of random values in every season
  // Keeps tree branching random sequence consistent in different seasons
  const choice = random(); // Separate some circles as flowers and fruits
  const huePick = random(); // Random hue
  const size = random(5, 11); // Random size between 5 and 11 pixels
  // Width and height of leaves
  const leafW = random(5, 10);
  const leafH = random(3, 8);


  // SPRING
  if (season === 0) {
    if (choice < 0.75) {
      // Pink flowers
      fill(map(huePick, 0, 1, 320, 360), 45, 100, 75);
      circle(0, 0, size);
    } else { // Green leaves
      fill(110, 65, 65);
      ellipse(3, 0, leafW, leafH);
    }
  }

  // SUMMER
  else if (season === 1) {
    if (choice < 0.45) {
      // Red fruits
      fill(map(huePick, 0, 1, 0, 15), 85, 90);
      circle(0, 0, size);
    } else { // Green leaves
      fill(110, 65, 65);
      ellipse(3, 0, leafW, leafH);
    }
  }

  // AUTUMN
  else if (season === 2) {
    // Orange and red leaves
    fill(map(huePick, 0, 1, 0, 40), 85, 95);
    ellipse(0, 0, leafW, leafH);
  }

  // WINTER
  else { // Snow
    fill(0, 0, 100, 90);
    circle(0, 0, size);
  }
}


// ==========================================
// 6. SEASONAL GROUND
// ==========================================
// Ground function
function drawGround() {
  // Remove outlines
  noStroke();
  // SPRING, SUMMER, AUTUMN: Green ground
  if (season === 0 || season === 1 || season === 2) {
    fill(110, 65, 25);
  }
  // WINTER: White snowy ground
  else {
    fill(0, 0, 100);
  }

  // Draw the ground
  ellipse(width / 2, height + 40, width * 1.6, 300);

  // Set a fixed random seed for ground elements
  randomSeed(88);

  // Draw 100 ground elements
  for (let i = 0; i < 100; i++) {
    // Generate random positions
    let x = random(width);
    let y = random(700, 790);

    // SPRING: Pink flowers
    if (season === 0) {
      fill(random(320, 360), 50, 100);
      circle(x, y, random(3, 7));
    }

    // SUMMER: Red fruits
    else if (season === 1) {
      fill(random(0, 15), 90, 90);
      circle(x, y, random(3, 7));
    }

    // AUTUMN: Fallen leaves
    else if (season === 2) {
      fill(random(0, 40), 90, 95);
      ellipse(x, y, random(4, 9), random(3, 6));
    }

    // WINTER: Snow
    else {
      fill(200, 10, 100);
      circle(x, y, random(2, 6));
    }
  }
}


// ==========================================
// 7. CREATE & UPDATE FALLING PARTICLES
// ==========================================
// Create falling particles function
function createParticles() {
  // Check whether the mouse has moved
  if (dist(mouseX, mouseY, pmouseX, pmouseY) > 2) {
    // Create two particles when the mouse moves
    for (let i = 0; i < 2; i++) {
      // Create a variable to store particle colour
      let particleColour;
      // SPRING: Pink particles
      if (season === 0) {
        particleColour = color(random(320, 360), 50, 100);
      }
      // SUMMER: Green particles
      else if (season === 1) {
        particleColour = color(random(90, 130), 70, 75);
      }
      // AUTUMN: Orange-red particles
      else if (season === 2) {
        particleColour = color(random(0, 40), 90, 95);
      }
      // WINTER: White particles
      else {
        particleColour = color(0, 0, 100);
      }

      // Add a new particle to the array
      particles.push({
        // Set its starting position near the mouse
        x: mouseX + random(-8, 8),
        y: mouseY + random(-8, 8),
        // Set horizontal movement
        vx: random(-1, 1),
        // Set downward movement
        vy: random(1, 3),
        // Store colour
        c: particleColour,
        // Set size
        size: random(3, 7),
        // Set lifespan
        life: 100
      });
    }
  }
}

// Update falling particles function
function updateParticles() {
  // Loop backwards through the particle array
  for (let i = particles.length - 1; i >= 0; i--) {
    // Get the current particle
    let p = particles[i];
    // Update horizontal position
    p.x += p.vx;
    // Update vertical position
    p.y += p.vy;
    // Add gravity to make particles fall faster
    p.vy += 0.035;
    // Reduce particle lifespan
    p.life -= 1.2;

    // Remove particles that disappear or leave canvas
    if (p.life <= 0 || p.y > height + 20) {
      particles.splice(i, 1);
    } else {
      // Remove outlines
      noStroke();
      // Set particle colour and transparency
      fill(
        hue(p.c),
        saturation(p.c),
        brightness(p.c),
        p.life
      );
      // Draw the particle
      circle(p.x, p.y, p.size);
    }
  }
}


// ==========================================
// 8. DISPLAY SEASON NAME
// ==========================================
// Display the season function
function drawSeasonName() {
  // Remove text outlines
  noStroke();
  // Set text colour to white
  fill(0, 0, 100);
  // Set text size
  textSize(18);
  // Centre the text
  textAlign(CENTER);
  // Display the current season
  text(seasonNames[season], width / 2, 35);
}


// ==========================================
// 9. SEASONAL BACKGROUND
// ==========================================
// Sky function
function paintSky(g) {
  // Set background colour mode to HSB
  g.colorMode(HSB, 360, 100, 100, 100);
  // Remove background outlines
  g.noStroke();

  // SPRING: Blue sky, red sun
  if (season === 0) {
    // Draw the sky gradient
    for (let y = 0; y < g.height; y++) {
      // Calculate gradient position
      let t = y / g.height;
      // Blend blue into warm orange
      g.fill(lerpColor(
        color(210, 55, 90),
        color(35, 35, 100),
        pow(t, 1.8)
      ));
      // Draw one row of the gradient
      g.rect(0, y, g.width, 1);
    }
    // Draw the red sun
    g.fill(0, 85, 90);
    g.circle(g.width * 0.78, g.height * 0.24, 65);
    // Draw stationary clouds
    drawClouds(g);
  }

  // SUMMER: Blue, yellow & orange sky
  else if (season === 1) {
    // Draw the summer gradient
    for (let y = 0; y < g.height; y++) {
      // Calculate gradient position
      let t = y / g.height;
      // Create a variable for the sky colour
      let skyColour;
      // Upper half: Blue to yellow
      if (t < 0.5) {
        skyColour = lerpColor(
          color(205, 65, 95),
          color(48, 45, 100),
          t * 2
        );
      }
      // Lower half: Yellow to orange
      else {
        skyColour = lerpColor(
          color(48, 45, 100),
          color(25, 70, 95),
          (t - 0.5) * 2
        );
      }
      // Apply the gradient colour
      g.fill(skyColour);
      // Draw one row
      g.rect(0, y, g.width, 1);
    }
    // Draw red sun
    g.fill(0, 90, 100);
    g.circle(g.width * 0.78, g.height * 0.24, 65);
    // Draw stationary clouds
    drawClouds(g);
  }

  // AUTUMN: Orange-red sunset
  else if (season === 2) {
    // Draw the autumn gradient
    for (let y = 0; y < g.height; y++) {
      // Calculate gradient position
      let t = y / g.height;
      // Blend blue into a warm orange colour
      g.fill(lerpColor(
        color(210, 60, 65),
        color(30, 55, 100),
        pow(t, 1.8)
      ));
      // Draw one row
      g.rect(0, y, g.width, 1);
    }
    // Draw the red sun
    g.fill(0, 90, 90);
    g.circle(g.width * 0.78, g.height * 0.24, 70);
  }

  // WINTER: Night sky, moon & stars
  else {
    // Draw the original dusk gradient
    for (let y = 0; y < g.height; y++) {
      // Calculate gradient position
      let t = y / g.height;
      // Blend dark blue into orange
      g.fill(lerpColor(
        color(250, 60, 14),
        color(15, 55, 75),
        pow(t, 1.8)
      ));
      // Draw one row
      g.rect(0, y, g.width, 1);
    }
    // Set fixed random seed for stars
    randomSeed(3);
    // Draw 140 stars
    for (let i = 0; i < 140; i++) {
      // Set stars to white with random transparency
      g.fill(0, 0, 100, random(20, 80));
      // Draw stars in the upper 55% of the canvas
      g.circle(
        random(g.width),
        random(g.height * 0.55),
        random(0.8, 2.2)
      );
    }
    // Draw the moon
    g.fill(40, 20, 100, 90);
    g.circle(g.width * 0.78, g.height * 0.24, 70);
  }
}


// ==========================================
// 10. STATIONARY CLOUDS
// ==========================================
// Clouds function
function drawClouds(g) {
  // Set cloud colour to white
  g.fill(0, 0, 100, 85);
  // First cloud
  g.ellipse(130, 160, 85, 30);
  g.ellipse(110, 150, 40, 35);
  g.ellipse(145, 145, 45, 45);
  g.ellipse(175, 155, 40, 30);
  // Second cloud
  g.ellipse(570, 250, 100, 30);
  g.ellipse(550, 240, 45, 40);
  g.ellipse(585, 230, 50, 50);
  g.ellipse(620, 245, 45, 30);
  // Third cloud
  g.ellipse(300, 320, 75, 25);
  g.ellipse(280, 310, 40, 35);
  g.ellipse(315, 305, 40, 40);
}


// ==========================================
// 11. KEYBOARD CONTROLS
// ==========================================
// Keyboard function
function keyPressed() {
  // SPACEBAR: Change to the next season
  if (key === " ") {
    // Increase the season number
    season++;
    // Return to spring after winter
    if (season > 3) {
      season = 0;
    }
    // Clear existing falling particles
    particles = [];
    // Redraw the background
    paintSky(sky);
  }

  // R or r: Generate a different tree
  if (key === "r" || key === "R") {
    // Generate a new random tree
    treeSeed = floor(random(100000));
  }

  // S or s: Save the artwork
  if (key === "s" || key === "S") {
    // Save as a PNG file with the season name
    saveCanvas("living-tree-" + seasonNames[season], "png");
  }
}
