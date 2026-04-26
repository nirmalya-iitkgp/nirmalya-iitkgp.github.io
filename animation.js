const newParticlesPerFrame = 5;

// Helper function to generate hsla color string
const color = (hsl, opacity) =>
  `hsla(${hsl.h | 0}, ${hsl.s}%, ${hsl.l}%, ${opacity})`;

class TextSparks {
  constructor() {
    this.opa = 0; // global opacity for fade in/out
    this.tick = 0; // animation tick counter
    this.drawCB = null; // bound draw callback for animation loop
    this.mask = null; // current pixel mask for particles

    // Get canvas and context
    this.canvas = document.querySelector("canvas");
    this.engine = this.canvas.getContext("2d");

    this.maskTick = 0; // counter for fading masks
    this.nextMaskCb = this.nextMask.bind(this); // pointer to next mask function
    this.maskCache = []; // cache of prepared masks for text stacks

    // Initialize sizes, fetch text data, build caches
    this.resize();
    this.fetchData();
    this.buildStackCache();

    this.particleMap = new Map(); // store active particles

    // Bind resize event
    window.addEventListener("resize", () => this.resize());
  }

  // Build a mask (opacity and pixel info) for each text stack and cache it
  buildStackCache() {
    this.maskCache = this.stack.map((stack) => this.buildTextMask(stack.texts));
  }

  // Fetch text stacks and their properties from spark DOM element
  fetchData() {
    this.stackId = -1;
    this.stack = [...document.querySelectorAll("div > ul")].map((ul) => ({
      ticks: 0.05 * (ul.hasAttribute("data-time") ? ul.getAttribute("data-time") : 0),
      fadeIn: ul.hasAttribute("data-fade-in")
        ? 50 / Number(ul.getAttribute("data-fade-in"))
        : 0,
      fadeOut: ul.hasAttribute("data-fade-out")
        ? 50 / Number(ul.getAttribute("data-fade-out"))
        : 0,
      texts: [...ul.querySelectorAll("li")].map((li) => ({
        text: li.innerHTML.trim(),
        hsl: {
          h: li.hasAttribute("data-hue") ? Number(li.getAttribute("data-hue")) : 0,
          s: li.hasAttribute("data-saturation") ? Number(li.getAttribute("data-saturation")) : 100,
          l: li.hasAttribute("data-lightness") ? Number(li.getAttribute("data-lightness")) : 50,
        },
      })),
    }));
  }

  // Resize canvas maintaining 16:9 aspect ratio relative to parent width
  resize() {
    const parent = this.canvas.parentElement;
    const width = parent.offsetWidth || 300;
    const height = (width * 9) / 16;
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  // Build a pixel opacity mask from text for particle emission
  buildTextMask(texts) {
    const mask = [];
    // Flatten all texts for full measurement
    const textAll = texts.reduce((all, ts) => all + ts.text, "");

    const sizeFactor = 0.8;
    const width = 200;
    const height = Math.floor(width / (this.width / this.height));
    const baseFontSize = 20;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = width;
    canvas.height = height;

    const font = (size) => `bold ${size}px Arial`;

    ctx.fillStyle = "#000";
    ctx.font = font(baseFontSize);
    const measure = ctx.measureText(textAll);
    const rel = measure.width / (width * sizeFactor);
    const fontSize = Math.min(height * 0.8, baseFontSize / rel);

    ctx.font = font(fontSize);
    const fontWidth = ctx.measureText(textAll).width;

    ctx.fillText(textAll, (width - fontWidth) / 2, height / 2 + fontSize * 0.35);

    let left = (width - fontWidth) / 2;
    const bottom = height / 2 + fontSize * 0.35;

    for (const textStack of texts) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillText(textStack.text, left, bottom);
      left += ctx.measureText(textStack.text).width;

      const imgData = ctx.getImageData(0, 0, width, height);
      const subStack = [];

      for (let i = 0; i < imgData.width * imgData.height; i++) {
        if (imgData.data[i * 4 + 3]) {
          subStack.push({
            x: (i % imgData.width) / imgData.width,
            y: Math.floor(i / imgData.width) / imgData.height,
            o: Math.random(),
            t: Math.random(),
          });
        }
      }

      mask.push({ hsl: textStack.hsl, s: subStack });
    }

    return mask;
  }

  // Create new particles based on current mask to add to particleMap
  createNewParticle() {
    for (let i = 0; i < newParticlesPerFrame; i++) {
      const main = Math.floor(Math.random() * this.mask.length);
      const subMask = this.mask[main];
      const maskElement =
        subMask && subMask.s[Math.floor(Math.random() * subMask.s.length)];

      if (subMask && maskElement) {
        const particle = {
          x: maskElement.x,
          y: maskElement.y,
          hsl: subMask.hsl,
          c: this.prepareParticle.bind(this),
        };

        this.particleMap.set(particle, particle);
      }
    }
  }

  // Clears canvas with black background
  clear() {
    this.engine.fillStyle = "black";
    this.engine.fillRect(0, 0, this.width, this.height);
  }

  // Average random values helper used in prepareParticle
  randFromList(...vals) {
    return vals.reduce((acc, v) => acc + v, 0) / vals.length;
  }

  // Prepares particle properties for movement and animation
  prepareParticle(particle) {
    const r1 = Math.random();
    const r2 = Math.random();
    const r3 = Math.random();
    const rad = r3 * Math.PI * 2;

    particle.x += (-0.5 + r1) / 300;
    particle.y += (-0.5 + r2) / 300;
    particle.si = 1 + Math.floor(Math.random() * 4);

    particle.s = 0.003 + this.randFromList(r1, r2) / 10;
    particle.l = 0;

    particle.mx = Math.cos(rad) * (particle.s / (r1 < 0.05 ? 10 : 400));
    particle.my = Math.sin(rad) * (particle.s / (r1 < 0.05 ? 10 : 400));

    particle.c = this.drawParticle.bind(this);
  }

  // Draws and updates individual particle animation frame
  drawParticle(particle) {
    if (particle.l >= 1) {
      particle.c = null; // mark for removal
      return;
    }

    particle.l += particle.s;
    particle.x += particle.mx;
    particle.y += particle.my;

    this.engine.fillStyle = color(particle.hsl, this.opa * Math.sin(particle.l * Math.PI));
    this.engine.fillRect(
      particle.x * this.width,
      particle.y * this.height,
      particle.si,
      particle.si
    );
  }

  // Render all active particles, removing finished ones
  renderParticles() {
    this.particleMap.forEach((particle) => {
      particle.c.call(this, particle);
      if (!particle.c) this.particleMap.delete(particle);
    });
  }

  // Draw static background spark effects behind particles
  drawStatic() {
    let count = 0;
    const step = 0.01;

    this.mask.forEach((subMask) => {
      subMask.s.forEach((pos) => {
        count++;

        this.engine.fillStyle = color(
          subMask.hsl,
          ((1 +
            Math.cos(pos.x * 5 * pos.y * 5 + this.tick / 10)) /
            2) *
            this.opa *
            pos.t *
            0.5
        );
        this.engine.fillRect(
          pos.x * this.width,
          pos.y * this.height,
          this.width / 150,
          this.width / 150
        );

        if (count % 2) return;

        pos.o += step;
        const opa = Math.max(0, Math.sin(pos.o * Math.PI * 2));
        const padding = opa * this.width / 200;

        this.engine.fillStyle = color(subMask.hsl, this.opa * opa * 0.2);

        if (pos.t < 0.5) {
          this.engine.beginPath();
          this.engine.arc(
            pos.x * this.width,
            pos.y * this.height,
            this.width / 500 + padding,
            0,
            Math.PI * 2
          );
          this.engine.fill();
        } else {
          this.engine.fillRect(
            pos.x * this.width - padding,
            pos.y * this.height - padding,
            this.width / 150 + padding * 2,
            this.width / 150 + padding * 2
          );
        }
      });
    });
  }

  // Main draw loop handled by requestAnimationFrame
  draw() {
    this.tick++;
    this.nextMaskCb();
    this.createNewParticle();
    this.clear();

    this.engine.globalCompositeOperation = "lighter";
    this.drawStatic();
    this.renderParticles();
    this.engine.globalCompositeOperation = "source-over";

    requestAnimationFrame(this.drawCB);
  }

  // Fade in opacity animation handling
  fadeInMask() {
    this.opa += this.stack[this.stackId].fadeIn;
    if (this.opa >= 1) {
      this.opa = 1;
      this.afterFadeIn();
    }
  }

  // Actions after fade in completes
  afterFadeIn() {
    this.opa = 1;
    if (this.stack[this.stackId].ticks) {
      this.maskTick = 0;
      this.nextMaskCb = this.tickMask.bind(this);
    } else {
      this.nextMaskCb = () => {};
    }
  }

  // Fade out opacity animation
  fadeOutMask() {
    this.opa -= this.stack[this.stackId].fadeOut;
    if (this.opa <= 0) {
      this.afterFadeOut();
    }
  }

  // Actions after fade out completes
  afterFadeOut() {
    this.opa = 0;
    this.nextMaskCb = this.nextMask.bind(this);
  }

  // Tick counts mask display time and transitions to fade out
  tickMask() {
    this.maskTick++;
    if (this.maskTick >= this.stack[this.stackId].ticks) {
      if (this.stack[this.stackId].fadeOut) {
        this.nextMaskCb = this.fadeOutMask.bind(this);
      } else {
        this.afterFadeOut();
      }
    }
  }

  // Switch to the next mask in the sequence and prepare fade in
  nextMask() {
    this.stackId++;
    if (this.stackId >= this.stack.length) {
      this.stackId = 0;
    }
    this.mask = this.maskCache[this.stackId];

    if (this.stack[this.stackId].fadeIn) {
      this.nextMaskCb = this.fadeInMask.bind(this);
    } else {
      this.opa = 1;
      this.afterFadeIn();
    }
  }

  // Start animation loop
  run() {
    this.drawCB = this.draw.bind(this);
    this.drawCB();
  }
}

// Instantiate and start animation
const textSparksInstance = new TextSparks();
textSparksInstance.run();
