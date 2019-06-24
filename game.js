const totalWidth = 32;
const totalHeight = 32;
const totalScale = 20; // Global Multiplier that makes things bigger.
const frameRate = 1000;

const LOG = (msg) => {
  const d = new Date
  const format = [d.getMonth()+1,
             d.getDate(),
             d.getFullYear()].join('/')+' '+
            [d.getHours(),
             d.getMinutes(),
             d.getSeconds()].join(':');
  console.log("[" + format + "]" + "[INFO] " + msg);
};

const wrapper = document.getElementById('wrapper');
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

svg.setAttribute('width', totalWidth * totalScale);
svg.setAttribute('height', totalHeight * totalScale);
svg.setAttribute('id', "svg");

wrapper.appendChild(svg);

const createBlockElement = (x, y, size) => {
  let el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  el.setAttribute('x', x * size);
  el.setAttribute('y', y * size);
  el.setAttribute('width', size);
  el.setAttribute('height', size);
  el.setAttribute('style', 'fill:black;stroke:white;stroke-width:1;');
  return el
}

let block = {
  X: totalWidth / 2, // start center
  Y: totalHeight / 2, // start center
  vx: 1,
  vy: 0,
  size: totalScale,
  el: createBlockElement(totalWidth / 2, totalHeight / 2, totalScale)
};

const tail = [];

tail.push({
  index: 0,
  parent: block,
  X: (totalWidth / 2) - 1, // start one cell to the left
  Y: totalHeight / 2, // start center
  size: totalScale,
  el: createBlockElement((totalWidth / 2) - 1, totalHeight / 2, totalScale)
});

tail.push({
  index: 1,
  parent: tail[0],
  X: (totalWidth / 2) - 2, // start two cells to the left
  Y: totalHeight / 2, // start center
  size: totalScale,
  el: createBlockElement((totalWidth / 2) - 2, totalHeight / 2, totalScale)
});

console.log(tail)

svg.appendChild(block.el);

tail.forEach(o => {
  svg.appendChild(o.el);
});

const draw = () => {
  tail.forEach(o => {
    o.X = o.parent.X
    o.Y = o.parent.Y
    o.el.setAttribute('x', o.X * o.size);
    o.el.setAttribute('y', o.Y * o.size);
    LOG(`[${o.index}](${o.X},${o.Y}) -> (${o.parent.X}, ${o.parent.Y}, ${o.parent.index})`);
  });

  block.X += block.vx;
  block.Y += block.vy;
  block.el.setAttribute('x', block.X * block.size);
  block.el.setAttribute('y', block.Y * block.size);
  LOG(`(${block.X},${block.Y})`);
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
    LOG(`No method defined for key: ${e.key}`);
  }
};

const gameLoop = () => {
  draw();
}


window.addEventListener('keydown', onKeyDown);
draw(); // Initial Draw

window.setInterval(gameLoop, frameRate);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})