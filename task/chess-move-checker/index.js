// Проверка, какие фигуры могут сделать ход
function checkMove() {
    const cellA = document.getElementById('cellA').value;
    const cellB = document.getElementById('cellB').value;
    const resultDiv = document.getElementById('result');

    const from = Square.fromString(cellA);
    const to = Square.fromString(cellB);

    if (from === null || to === null) {
        resultDiv.textContent = 'Введите корректные клетки, например: e2 и e4';

        return;
    }

    if (from.equals(to)) {
        resultDiv.textContent = 'Введите отличающиеся клетки, например: e2 и e4';

        return;
    }

    const pieces = getMovablePieces(new Move(from, to));

    resultDiv.textContent = pieces.length !== 0
        ? 'Могут пойти: ' + pieces.join(', ')
        : 'Ни одна фигура не может сходить так';
}

function getMovablePieces(move) {
    const pieces = [
        new Pawn('white'),
        new Pawn('black'),
        new Knight(),
        new Bishop(),
        new Rook(),
        new Queen(),
        new King()
    ];

    return pieces
        .filter(piece => piece.canMove(move))
        .map(piece => piece.toString());
}
