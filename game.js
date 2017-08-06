const totalWidth = 32;
const totalHeight = 32;
const totalScale = 20; // Global Multiplier that makes things bigger.
const frameRate = 1000;
var actionCount = 0;

const wrapper = document.getElementById('wrapper');
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

svg.setAttribute('width', totalWidth * totalScale);
svg.setAttribute('height', totalHeight * totalScale);
svg.setAttribute('id', "svg");

wrapper.appendChild(svg);

let block = {
  X: totalWidth / 2, // start center
  Y: totalHeight / 2, // start center
  vx: 0,
  vy: 0,
  size: totalScale,
};

const draw = () => {
  svg.innerHTML = "";
  block.X = block.X += block.vx;
  block.Y = block.Y += block.vy;

  var e = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  e.setAttribute('x', block.X * block.size);
  e.setAttribute('y', block.Y * block.size);
  e.setAttribute('width', block.size);
  e.setAttribute('height', block.size);
  e.setAttribute('style', 'fill:black;stroke:white;stroke-width:1;');

  svg.appendChild(e)
  console.log('[', Date().toString(), ']', block.X, ",", block.Y, actionCount);
};

const up = () => {
  block.vy = -1;
  block.vx = 0;
};

const down = () => {
  block.vy = 1;
  block.vx = 0;
};

const left = () => {
  block.vx = -1;
  block.vy = 0;
};

const right = () => {
  block.vx = 1;
  block.vy = 0;
};

const onKeyDown = (e) => {
  actionCount++;
  if (e.code === "ArrowUp") {
    up();
  }

  if (e.code === "ArrowDown") {
    down();
  }

  if (e.code === "ArrowLeft") {
    left();
  }

  if (e.code === "ArrowRight") {
    right();
  }

  draw();
};

window.addEventListener('keydown', onKeyDown);
draw(); // Initial Draw
// window.setInterval(draw, frameRate);