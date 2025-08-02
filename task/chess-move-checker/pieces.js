class Piece {
    constructor(start) {
        this.start = start; // [x, y]
    }

    // Универсальный метод: возвращает [dx, dy, sx, sy]
    // dx, dy — модуль разницы; sx, sy — разница со знаком
    diff(end) {
        const sx = end[0] - this.start[0];
        const sy = end[1] - this.start[1];
        return [Math.abs(sx), Math.abs(sy), sx, sy];
    }

    canMove(end) {
        // Базовая проверка: не стоять на месте
        return !(this.start[0] === end[0] && this.start[1] === end[1]);
    }
}

class Pawn extends Piece {
    constructor(start, color) {
        super(start);
        this.color = color; // 'white' или 'black'

        const rank = start[1];
        if (rank === 0 || rank === 7) {
            throw new Error(`Пешка не может находиться на ${rank + 1}-й горизонтали`);
        }
    }

    static createSafe(start, color) {
        const rank = start[1];
        if (rank === 0 || rank === 7) {
            return null;
        }
        return new Pawn(start, color);
    }

    toString() {
        return (this.color === 'white' ? 'Белая' : 'Чёрная') + ' пешка';
    }

    canMove(end) {
        //   - Клетка назначения не совпадает со стартовой.
        if (!super.canMove(end)) return false;

        const [dx, dy, sx, sy] = this.diff(end);

        // Определяем направление движения по вертикали в зависимости от цвета:
        const yDirection = this.color === 'white' ? 1 : -1;

        // Определяем стартовую горизонталь для двойного шага:
                const yStart = this.color === 'white' ? 1 : 6;

        // 5️⃣ Пешка ходит только прямо по колонке:
        if (dx !== 0) return false;

        // 6️⃣ Обычный шаг вперёд на 1 клетку
                if (sy === yDirection) return true;

        // Двойной ход с начальной позиции
                if (sy === 2 * yDirection && this.start[1] === yStart) return true;

        // Все остальные варианты (например, слишком большой шаг или шаг назад)
                return false;
    }
}

class Knight extends Piece {
    toString() {
        return 'Конь';
    }

    canMove(end) {
        if (!super.canMove(end)) return false;

        const [dx, dy] = this.diff(end);
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    }
}

class Bishop extends Piece {
    toString() {
        return 'Слон';
    }

    canMove(end) {
        if (!super.canMove(end)) return false;

        const [dx, dy] = this.diff(end);
        return dx === dy;
    }
}

class Rook extends Piece {
    toString() {
        return 'Ладья';
    }

    canMove(end) {
        if (!super.canMove(end)) return false;

        const [dx, dy] = this.diff(end);
        return dx === 0 || dy === 0;
    }
}

class Queen extends Piece {
    toString() {
        return 'Ферзь';
    }

    canMove(end) {
        if (!super.canMove(end)) return false;

        const [dx, dy] = this.diff(end);
        return dx === dy || dx === 0 || dy === 0;
    }
}

class King extends Piece {
    toString() {
        return 'Король';
    }

    canMove(end) {
        if (!super.canMove(end)) return false;

        const [dx, dy] = this.diff(end);
        return dx <= 1 && dy <= 1;
    }
}
