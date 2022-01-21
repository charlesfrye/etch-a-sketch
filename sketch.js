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
  block.style.backgroundColor = "#000";
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
