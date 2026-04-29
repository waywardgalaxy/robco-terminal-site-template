const root = document.documentElement;
const screen = document.querySelector(".crt-screen");
const terminalOutput = document.querySelector("#terminalOutput");
const bootShutter = document.querySelector(".boot-shutter");

const siteConfig = {
  pageTitle: "RobCo Terminal Site",
  bootHeader: [
    "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
    "-Server 1-",
  ],
  logTitle: "Logs, Your Name",
  links: [
    { label: "Portfolio", url: "https://example.com" },
    { label: "GitHub", url: "https://github.com/yourname" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/yourname/" },
    { label: "Project One", url: "https://example.com/project-one" },
    { label: "Project Two", url: "https://example.com/project-two" },
  ],
};

function buildTerminalLines(config) {
  return [
    ...config.bootHeader.map((text) => ({ text, className: "center tight" })),
    { text: "", className: "spacer", pause: 190 },
    { text: config.logTitle, className: "title", pause: 290 },
    { text: "", className: "spacer", pause: 180 },
    ...config.links.map((link) => ({
      text: `> ${link.label}`,
      href: link.url,
      pause: 190,
    })),
    { text: ">", prompt: true },
  ];
}

const terminalLines = buildTerminalLines(siteConfig);
document.title = siteConfig.pageTitle;

let glowX = 68;
let glowY = 25;
let targetGlowX = 68;
let targetGlowY = 25;
let curveX = 50;
let curveY = 50;
let targetCurveX = 50;
let targetCurveY = 50;

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

async function typeLine(lineData) {
  const line = document.createElement("div");
  line.className = `terminal-line ${lineData.className || ""}`.trim();
  terminalOutput.append(line);

  if (!lineData.text) {
    await wait(lineData.pause || 120);
    return;
  }

  const target = lineData.href ? document.createElement("a") : line;

  if (lineData.href) {
    target.className = "terminal-link";
    target.href = lineData.href;
    target.target = "_blank";
    target.rel = "noopener";
    line.append(target);
  }

  for (const character of lineData.text) {
    target.textContent += character;
    const characterDelay = character === " " ? 16 : 24 + Math.random() * 18;
    await wait(characterDelay);
  }

  if (lineData.prompt) {
    const caret = document.createElement("span");
    caret.className = "terminal-caret";
    line.append(caret);
  }

  await wait(lineData.pause || 145);
}

async function bootTerminal() {
  await wait(1450);
  bootShutter.classList.add("is-finished");

  for (const line of terminalLines) {
    await typeLine(line);
  }
}

function updateTargets(event) {
  const rect = screen.getBoundingClientRect();
  const pointerX = (event.clientX - rect.left) / rect.width;
  const pointerY = (event.clientY - rect.top) / rect.height;
  const centeredX = Math.min(Math.max(pointerX, 0), 1) - 0.5;
  const centeredY = Math.min(Math.max(pointerY, 0), 1) - 0.5;

  targetGlowX = 68 + centeredX * 5;
  targetGlowY = 25 + centeredY * 4;
  targetCurveX = 50 + centeredX * 16;
  targetCurveY = 50 + centeredY * 12;
}

function idleTargets() {
  targetGlowX = 68 + Math.sin(Date.now() / 4300) * 1.4;
  targetGlowY = 25 + Math.cos(Date.now() / 5100) * 1;
  targetCurveX = 50 + Math.cos(Date.now() / 5200) * 2.4;
  targetCurveY = 50 + Math.sin(Date.now() / 4700) * 1.8;
}

function render() {
  const activePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!activePointer) {
    idleTargets();
  }

  glowX += (targetGlowX - glowX) * 0.04;
  glowY += (targetGlowY - glowY) * 0.04;
  curveX += (targetCurveX - curveX) * 0.035;
  curveY += (targetCurveY - curveY) * 0.035;

  const randomFlicker = 0.985 + Math.random() * 0.025;

  root.style.setProperty("--glow-x", `${glowX.toFixed(2)}%`);
  root.style.setProperty("--glow-y", `${glowY.toFixed(2)}%`);
  root.style.setProperty("--curve-x", `${curveX.toFixed(2)}%`);
  root.style.setProperty("--curve-y", `${curveY.toFixed(2)}%`);
  root.style.setProperty("--curve-rotate-x", `${((curveY - 50) * 0.015).toFixed(3)}deg`);
  root.style.setProperty("--curve-rotate-y", `${((curveX - 50) * -0.018).toFixed(3)}deg`);
  root.style.setProperty("--screen-brightness", randomFlicker.toFixed(3));

  requestAnimationFrame(render);
}

window.addEventListener("load", bootTerminal, { once: true });

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  window.addEventListener("pointermove", updateTargets);
  window.addEventListener("pointerleave", idleTargets);
}

render();
