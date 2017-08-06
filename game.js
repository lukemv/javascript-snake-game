const totalWidth = 32;
const totalHeight = 32;
const totalScale = 20; // Global Multiplier that makes things bigger.
const frameRate = 1000;

let block = {
  X: totalWidth / 2, // start center
  Y: totalHeight / 2, // start center
  vx: 0,
  vy: 0,
  size: totalScale,
};

const wrapper = document.getElementById('wrapper');
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

svg.setAttribute('width', totalWidth * totalScale);
svg.setAttribute('height', totalHeight * totalScale);
svg.setAttribute('id', "svg");

wrapper.appendChild(svg);

let blockElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
blockElement.setAttribute('x', block.X * block.size);
blockElement.setAttribute('y', block.Y * block.size);
blockElement.setAttribute('width', block.size);
blockElement.setAttribute('height', block.size);
blockElement.setAttribute('style', 'fill:black;stroke:white;stroke-width:1;');

svg.appendChild(blockElement);

const draw = () => {
  block.X += block.vx;
  block.Y += block.vy;
  blockElement.setAttribute('x', block.X * block.size);
  blockElement.setAttribute('y', block.Y * block.size);
  console.log('[', Date().toString(), ']', block.X, ",", block.Y);
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

  behaviours = {
    ArrowUp: up,
    ArrowDown: down,
    ArrowLeft: left,
    ArrowRight: right
  };

  if (Object.keys(behaviours).indexOf(e.code) !== -1) {
    behaviours[e.code]();
  } else {
    console.log(`No method defined for key: ${e.key}`);
  }

  draw();
};

window.addEventListener('keydown', onKeyDown);
draw(); // Initial Draw
// window.setInterval(draw, frameRate);