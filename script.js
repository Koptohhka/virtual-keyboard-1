(() => {
    const CELL_ID = [];
    let cells = document.querySelectorAll('.keyboard__cell');

    cells.forEach((it) => {
        CELL_ID.push(it.id);
    })
    console.log(CELL_ID);
}) ()