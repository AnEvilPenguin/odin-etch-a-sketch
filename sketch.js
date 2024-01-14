const DEFAULT_GRID_SIZE = 16;


const sketch = document.querySelector('#sketch');
const resetButton = document.querySelector('.reset-button');


function createCell() {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // inline arrow function as we're going to make use of closure later
    const onHover = () => {
        cell.style['background-color'] = 'black'
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


createGrid();