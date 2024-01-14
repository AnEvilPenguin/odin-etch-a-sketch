const DEFAULT_GRID_SIZE = 16;
const OPACITY_INCREASE_RATE = 10;


const sketch = document.querySelector('#sketch');
const resetButton = document.querySelector('.reset-button');
const opacityOption = document.querySelector('#opacity');
const randomColorOption = document.querySelector('#randomColor');


/** Options the user can set to modify behavior */
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


/**
 * Generates a div to be used as a part of the etch a sketch.
 * The smallest functional unit of our sketching area. This div handles
 *     color.
 * 
 * @returns A cell element
 */
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


/**
 * Generates a div that acts as a column in our sketching grid.
 * Contains a cell.
 * 
 * @param {String} id Unique identifier to be used as HTML id
 * @returns A div to be used as a column
 */
function createColumn(id) {
    const column = document.createElement('div');

    column.classList.add('column');
    column.id = `c-${id}`;

    const cell = createCell()

    column.appendChild(cell);

    return column;
}


/**
 * Generates a div that acts as a row in our sketching grid.
 * Has a number of columns generated inside of it.
 * 
 * @param {Number} size The number of columns to contain
 * @param {string} id Unique identifier to be used as HTML id
 * @returns A div to be used as a row
 */
function createRow(size, id) {
    const row = document.createElement('div');
    
    row.classList.add('row');
    row.id = `r-${id}`;

    for (let column = 0; column < size; column++) {
        const columnElement = createColumn(`${id}:${column}`);
        row.appendChild(columnElement);
    }

    return row;
}


/**
 * Generates a new etch a sketch grid.
 * 
 * @param {?Number} size The size of the grid to generate.
 */
function createGrid(size = DEFAULT_GRID_SIZE) {

    while(sketch.firstChild) {
        sketch.removeChild(sketch.lastChild);
    }
    
    for (let row = 0; row < size; row++) {
        const newRow = createRow(size, row);
        sketch.appendChild(newRow);
    }
    
}


/**
 * Prompts the user for a grid size.
 * 
 * @returns The size of the grid a user has selected or NaN.
 */
function promptForGridSize() {
    const size = +prompt('Select a new grid size [8 - 120]');
    return size;
}


/**
 * Handles an onClickEvent to generate a new etch a sketch grid
 */
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


/**
 * Takes an input element, and a variable name. Sets the appropriate
 *     user option.
 * 
 * @param {String} variable 
 * @param {*} element 
 */
function checkChecked (variable, element) {
    options[variable] = element.checked;
}


opacityOption.addEventListener('click', () => checkChecked('opacity', opacityOption));
randomColorOption.addEventListener('click', () => checkChecked('randomColor', randomColorOption));


createGrid();