// Перевод шахматной нотации в координаты
function toCoords(cell) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']; // колонки

    // Проверка формата
    if (!/^[a-h][1-8]$/.test(cell)) return null;

    const file = cell[0]; // буква, например "e"
    const rank = cell[1]; // цифра, например "4"

    const col = files.indexOf(file); // 0..7
    const row = (+rank) - 1; // 0..7

    return [col, row];
}

// Проверка, какие фигуры могут сделать ход
function checkMove() {
    const cellA = document.getElementById('cellA').value.trim().toLowerCase();
    const cellB = document.getElementById('cellB').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');

    if (cellA === cellB) {
        resultDiv.textContent = 'Введите отличающиеся клетки, например: e2 и e4';
        return;
    }

    const start = toCoords(cellA);
    const end = toCoords(cellB);

    if (!start || !end) {
        resultDiv.textContent = 'Введите корректные клетки, например: e2 и e4';
        return;
    }

    const pieces = getMovablePieces(start, end);

    resultDiv.textContent = pieces.length !== 0
        ? 'Могут пойти: ' + pieces.join(', ')
        : 'Ни одна фигура не может сходить так';
}

function getMovablePieces(start, end) {
    const pieces = [
        Pawn.createSafe(start, 'white'),
        Pawn.createSafe(start, 'black'),
        new Knight(start),
        new Bishop(start),
        new Rook(start),
        new Queen(start),
        new King(start)
    ];

    return pieces
        .filter(piece => piece !== null && piece.canMove(end))
        .map(piece => piece.toString());
}
