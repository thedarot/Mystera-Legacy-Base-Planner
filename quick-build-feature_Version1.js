/**
 * QUICK BUILD SYSTEM
 * 
 * Como usar:
 * 1. Selecione um material/item (Stone Wall, Wood Wall, etc)
 * 2. CLIQUE no canvas com SHIFT pressionado (ponto 1)
 * 3. ARRASTE mantendo SHIFT + Mouse Down
 * 4. SOLTE o mouse
 * 
 * RESULTADOS:
 * - Horizontal (← →): Preenche uma linha horizontal
 * - Vertical (↑ ↓):   Preenche uma linha vertical
 * - Diagonal (↖↗↙↘):  Preenche retângulo completo (ponta 1 até ponta 2)
 */

function getDirection(startX, startY, endX, endY) {
    const dx = endX - startX;
    const dy = endY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Detectar diagonal (preencher retângulo)
    if (absDx > 0 && absDy > 0 && absDx !== absDy) {
        return { type: 'rectangle', dx, dy };
    }

    // Diagonal perfeita
    if (absDx === absDy && absDx > 0) {
        return { type: 'diagonal', dx, dy };
    }

    // Horizontal
    if (absDy === 0 && absDx > 0) {
        return { type: 'horizontal', dx };
    }

    // Vertical
    if (absDx === 0 && absDy > 0) {
        return { type: 'vertical', dy };
    }

    return { type: 'none' };
}

function fillLine(startX, startY, endX, endY, item, isBuild, isFloor) {
    const cells = [];
    const dx = Math.sign(endX - startX);
    const dy = Math.sign(endY - startY);
    const steps = Math.max(Math.abs(endX - startX), Math.abs(endY - startY));

    for (let i = 0; i <= steps; i++) {
        const x = startX + dx * i;
        const y = startY + dy * i;
        cells.push({ x, y });
    }

    return cells;
}

function fillRectangle(startX, startY, endX, endY) {
    const cells = [];
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            cells.push({ x, y });
        }
    }

    return cells;
}