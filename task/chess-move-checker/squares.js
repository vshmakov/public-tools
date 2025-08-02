class Square {
    constructor(fileIndex, rankIndex) {
        this.fileIndex = fileIndex; // 0..7 для a..h
        this.rankIndex = rankIndex; // 0..7 для 1..8
    }

    // Парсит шахматную нотацию в Square
    static fromString(cell) {
        cell = cell.trim().toLowerCase();

        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        if (!/^[a-h][1-8]$/.test(cell)) return null;

        const fileIndex = files.indexOf(cell[0]);
        const rankIndex = (+cell[1]) - 1; // '4' → 4 → 3

        return new Square(fileIndex, rankIndex);
    }

    // Проверка равенства двух клеток
    equals(other) {
        return this.fileIndex === other.fileIndex
            && this.rankIndex === other.rankIndex;
    }
}

class Move {
    constructor(from, to) {
        this.from = from; // Square
        this.to = to;     // Square
    }

        // Разница по горизонтали (файлам), со знаком
    get fileDelta() {
        return this.to.fileIndex - this.from.fileIndex;
    }

    // Абсолютная разница по горизонтали
    get absoluteFileDelta() {
        return Math.abs(this.fileDelta);
    }

    // Разница по вертикали (рядам), со знаком
    get rankDelta() {
        return this.to.rankIndex - this.from.rankIndex;
    }

    // Абсолютная разница по вертикали
    get absoluteRankDelta() {
        return Math.abs(this.rankDelta);
    }
}
