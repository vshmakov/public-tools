class Piece {
    /**
     * @param {Move} move - объект хода
     * @returns {boolean}
     */
    canMove(move) {
        return false;
    }
}

class Pawn extends Piece {
    constructor(color) {
super();
        this.color = color; // 'white' или 'black'
    }

    toString() {
        return (this.color === 'white' ? 'Белая' : 'Чёрная') + ' пешка';
    }

    canMove(move) {
        const {fileDelta, rankDelta} = move;

        // 5️⃣ Пешка ходит только прямо по колонке:
        if (fileDelta !== 0) return false;

        // Определяем направление движения по вертикали в зависимости от цвета:
        const rankDirection = this.color === 'white' ? 1 : -1;

        // Определяем стартовую горизонталь для двойного шага:
        const rankStart = this.color === 'white' ? 1 : 6;

        // Обычный шаг вперёд на 1 клетку
        if (rankDelta === rankDirection) return true;

        // Двойной ход с начальной позиции
        if (rankDelta === 2 * rankDirection && move.from.rankIndex === rankStart) return true;

        // Все остальные варианты (например, слишком большой шаг или шаг назад)
        return false;
    }
}

class Knight extends Piece {
    toString() {
        return 'Конь';
    }

    canMove(move) {
        const {absoluteFileDelta, absoluteRankDelta} = move;
        return (absoluteFileDelta === 2 && absoluteRankDelta === 1) || (absoluteFileDelta === 1 && absoluteRankDelta === 2);
    }
}

class Bishop extends Piece {
    toString() {
        return 'Слон';
    }

    canMove(move) {
        const {absoluteFileDelta, absoluteRankDelta} = move;
        return absoluteFileDelta === absoluteRankDelta;
    }
}

class Rook extends Piece {
    toString() {
        return 'Ладья';
    }

    canMove(move) {
        const {absoluteFileDelta, absoluteRankDelta} = move;
        return absoluteFileDelta === 0 || absoluteRankDelta === 0;
    }
}

class Queen extends Piece {
    toString() {
        return 'Ферзь';
    }

    canMove(move) {
        const {absoluteFileDelta, absoluteRankDelta} = move;
        return absoluteFileDelta === absoluteRankDelta || absoluteFileDelta === 0 || absoluteRankDelta === 0;
    }
}

class King extends Piece {
    toString() {
        return 'Король';
    }

    canMove(move) {
        const {absoluteFileDelta, absoluteRankDelta} = move;
        return absoluteFileDelta <= 1 && absoluteRankDelta <= 1;
    }
}
