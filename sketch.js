const blockGrid = document.querySelector('.block-grid')
const resetButton = document.querySelector('.reset')

const setupGrid = function(size) {
  clearGrid();
  addToGrid(size);
  const blocks = document.querySelectorAll('.block')
  blocks.forEach(block => block.addEventListener('mouseover', colorBlock))
};

const colorBlock = function(e) {
  const block = e.target;
  const initColorString = window.getComputedStyle(block).backgroundColor;
  const colorArray = getColorArray(initColorString);
  update(colorArray);
  const colorString = fromColorArray(colorArray)
  console.log(colorString);
  block.style.backgroundColor = colorString;
}

const getColorArray = function(colorString) {
  if (!colorString.startsWith("rgb")) {
    throw Error(`invalid colorString ${colorString}`);
  };

  const prefix = colorString.slice(0, 4);
  let start = null;
  if (prefix === "rgb(") {
    start = 4;
  } else if (prefix === "rgba") {
    start = 5;
  } else {
    throw Error(`invalid colorString ${colorString}`);
  }

  colorString = colorString.slice(start, -1); // drop function call
  const colorArray = colorString.split(",").map(parseFloat);

  if (prefix === "rgb(") {
    colorArray[3] = 1;
  };
  return colorArray;
};

const update = function(colorArray) {
  console.log(colorArray);
  console.log(colorArray[3]);
  console.log(colorArray[3] + 0.1);
  colorArray[3] = Math.min(1, colorArray[3] + 0.1);
};

const fromColorArray = function (colorArray) {
  if (!colorArray.length === 4) {
    throw Error(`invalid colorArray ${colorArray}`);
  };
  let colorString = "rgba";

  const commaSepColors = colorArray.join();
  colorString += `(${commaSepColors})`;

  return colorString;
}

const clearGrid = function() {
  while (blockGrid.firstChild) {
    blockGrid.removeChild(blockGrid.firstChild);
  };
};

const addToGrid = function(size) {
  for (let i = 0; i < size; i++) {
    const column = addColumn(size);
    blockGrid.appendChild(column);
  };
};

const addColumn = function(size) {
  const column = document.createElement('div');
  column.classList.add('column');
  for (let i = 0; i < size; i++) {
    const block = addBlock();
    column.appendChild(block);
  }
  return column;
};

const addBlock = function() {
  const block = document.createElement('div');
  block.classList.add('block');

  return block;
};

const reset = function () {
  clearGrid();
  let accepted = false;
  while (!accepted) {
    const input = prompt("How many grid squares [1-100] on each side?");
    const number = parseInt(input, 10);
    if (isNaN(number)) {
      break;
    }
    if (number < 1 || number > 100) {
      continue;
    } else {
      accepted = true;
      setupGrid(number);
    };
  };
}

resetButton.addEventListener("click", reset);
setupGrid(16);
