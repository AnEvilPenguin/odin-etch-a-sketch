const DEFAULT_GRID_SIZE = 16;

const sketch = document.querySelector('#sketch');


function createColumn(id) {
    const column = document.createElement('div');

    column.classList.add('column');
    column.id = id;

    const cell = document.createElement('div');
    cell.classList.add('cell');
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
    
    for (let row = 0; row < size; row++) {
        const newRow = createRow(size, row);
        sketch.appendChild(newRow);
    }
    
}

createGrid();