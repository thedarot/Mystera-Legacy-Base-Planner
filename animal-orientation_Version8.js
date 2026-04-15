/**
 * ANIMAL ORIENTATION SYSTEM
 * Gerencia animais olhando para o Animal Gate mais próximo
 */

// Cache para sprites de animais
const animalSpriteCache = {};

// Configuração dos animais
const ANIMALS_DATA = [
    {
        id: "cow",
        cat: "Animals",
        name: "Cow",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/2.png?v=5.0.9",
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        animal: true,
        mats: {}
    },
    {
        id: "chicken",
        cat: "Animals",
        name: "Chicken",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/5.png?v=5.0.9",
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        animal: true,
        mats: {}
    },
    {
        id: "sheep",
        cat: "Animals",
        name: "Sheep",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/8.png?v=5.0.9",
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        animal: true,
        mats: {}
    },
    {
        id: "cat",
        cat: "Animals",
        name: "Cat (White)",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/19.png?v=5.0.9",
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        animal: true,
        mats: {}
    },
    {
        id: "pig",
        cat: "Animals",
        name: "Pig",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/67.png?v=5.0.9",
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        animal: true,
        mats: {}
    }
];

/**
 * Encontra o Animal Gate mais próximo de uma posição
 */
function findNearestAnimalGate(x, y, buildData) {
    const gates = Object.entries(buildData).filter(([, v]) => v.name === "Animal Gate");
    
    if (gates.length === 0) return null;

    let nearestGate = null;
    let minDistance = Infinity;

    gates.forEach(([key]) => {
        const [gx, gy] = key.split(" ").map(Number);
        const distance = Math.hypot(gx - x, gy - y);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestGate = {x: gx, y: gy, distance};
        }
    });

    return nearestGate;
}

/**
 * Calcula a direção do animal baseado na posição do gate
 * Retorna: "up", "down", "left" ou "right"
 */
function getAnimalDirection(animalX, animalY, gateX, gateY) {
    const dx = gateX - animalX;
    const dy = gateY - animalY;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDy > absDx) {
        return dy > 0 ? "down" : "up";
    } else {
        return dx > 0 ? "right" : "left";
    }
}

/**
 * Obtém o índice do frame baseado na direção
 */
function getAnimalFrameIndex(animalData, direction = "down") {
    if (!animalData.directions) return 0;
    
    const dirFrames = animalData.directions[direction] || animalData.directions.down || [0];
    const frameTime = Math.floor(Date.now() / 300) % dirFrames.length;
    return dirFrames[frameTime];
}

/**
 * Carrega sprite de animal
 */
async function loadAnimalSprite(url) {
    if (animalSpriteCache[url]) {
        return animalSpriteCache[url];
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            animalSpriteCache[url] = img;
            resolve(img);
        };
        img.onerror = () => {
            console.warn(`Falha ao carregar sprite: ${url}`);
            resolve(null);
        };
        img.src = url;
    });
}

/**
 * Renderiza animal em canvas context
 */
function renderAnimalToCanvas(ctx, animalData, frameIndex, x, y) {
    const spriteImg = animalSpriteCache[animalData.spriteUrl];
    if (!spriteImg) return;

    const col = frameIndex % 4;
    const row = Math.floor(frameIndex / 4);
    
    const sx = col * animalData.frameWidth;
    const sy = row * animalData.frameHeight;
    
    ctx.drawImage(
        spriteImg,
        sx, sy,
        animalData.frameWidth,
        animalData.frameHeight,
        x, y,
        animalData.frameWidth,
        animalData.frameHeight
    );
}

// Export global
window.ANIMALS_DATA = ANIMALS_DATA;
window.findNearestAnimalGate = findNearestAnimalGate;
window.getAnimalDirection = getAnimalDirection;
window.getAnimalFrameIndex = getAnimalFrameIndex;
window.loadAnimalSprite = loadAnimalSprite;
window.renderAnimalToCanvas = renderAnimalToCanvas;
window.animalSpriteCache = animalSpriteCache;