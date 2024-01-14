const DEFAULT_GRID_SIZE = 16;
const OPACITY_INCREASE_RATE = 10;


const sketch = document.querySelector('#sketch');
const resetButton = document.querySelector('.reset-button');
const opacityOption = document.querySelector('#opacity');
const randomColorOption = document.querySelector('#randomColor');


const options = {
    opacity: false,
    randomColor: false
}


/**
 * Returns a random integer
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * 
 * @param { Number } max The maximum number
 * @returns A number from [0-max)
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function createCell() {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    let myOpacity;
    let initialized = false;

    const randomRed = getRandomInt(255);
    const randomBlue = getRandomInt(255);
    const randomGreen  = getRandomInt(255);

    const onHover = () => {

        if (!initialized) {
            cell.style['background-color'] = options.randomColor ?
                `rgb(${randomRed}, ${randomBlue}, ${randomGreen})`:
                'black';
            
            options.opacity ?
                myOpacity = 0 :
                myOpacity = 100;

            initialized = true;
        }

        if (options.opacity && myOpacity < 100) {
            myOpacity += OPACITY_INCREASE_RATE;
            cell.style['opacity'] = myOpacity + '%';
        }
    };
    cell.addEventListener('mouseover', onHover);

    return cell;
}

function createColumn(id) {
    const column = document.createElement('div');

    column.classList.add('column');
    column.id = id;

    const cell = createCell()

    column.appendChild(cell);

    return column;
}


function createRow(size, id) {
    const row = document.createElement('div');
    
    row.classList.add('row');
    row.id = id;

    for (let column = 0; column < size; column++) {
        const cell = createColumn(column);
        row.appendChild(cell);
    }

    return row;
}


function createGrid(size = DEFAULT_GRID_SIZE) {

    while(sketch.firstChild) {
        sketch.removeChild(sketch.lastChild);
    }
    
    for (let row = 0; row < size; row++) {
        const newRow = createRow(size, row);
        sketch.appendChild(newRow);
    }
    
}


function promptForGridSize() {
    const size = +prompt('Select a new grid size [8 - 120]');
    return size;
}


function onClickNewGrid() {
    const size = promptForGridSize();

    if (size == null || isNaN(size)) {
        alert('Must provide valid number for size [8 - 120]');
        return;
    }

    if (size < 8 || 120 < size) {
        // square brackets inclusive, parentheses exclusive
        alert('Must provide size between [8 - 120] (inclusive)');
        return;
    }

    createGrid(size);
}


resetButton.addEventListener('click', onClickNewGrid);


function checkChecked (variable, element) {
    options[variable] = element.checked;
}


opacityOption.addEventListener('click', () => checkChecked('opacity', opacityOption));
randomColorOption.addEventListener('click', () => checkChecked('randomColor', randomColorOption));


createGrid();