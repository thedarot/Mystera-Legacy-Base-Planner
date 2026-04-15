/**
 * ANIMALS CONFIGURATION
 * Sistema para gerenciar animais com spritesheet dinâmico
 */

const ANIMALS_DATA = [
    {
        id: "cow",
        cat: "Animals",
        name: "Cow",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/2.png?v=5.0.9",
        width: 16,
        height: 16,
        frames: 12,
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        mats: {},
        animal: true
    },
    {
        id: "chicken",
        cat: "Animals",
        name: "Chicken",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/5.png?v=5.0.9",
        width: 16,
        height: 16,
        frames: 12,
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        mats: {},
        animal: true
    },
    {
        id: "sheep",
        cat: "Animals",
        name: "Sheep",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/8.png?v=5.0.9",
        width: 16,
        height: 16,
        frames: 12,
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        mats: {},
        animal: true
    },
    {
        id: "cat",
        cat: "Animals",
        name: "Cat (White)",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/19.png?v=5.0.9",
        width: 16,
        height: 16,
        frames: 12,
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        mats: {},
        animal: true
    },
    {
        id: "pig",
        cat: "Animals",
        name: "Pig",
        spriteUrl: "https://www.mysteralegacy.com/data/monsters/67.png?v=5.0.9",
        width: 16,
        height: 16,
        frames: 12,
        frameWidth: 16,
        frameHeight: 16,
        directions: {
            up: [0, 1, 2],
            right: [3, 4, 5],
            down: [6, 7, 8],
            left: [9, 10, 11]
        },
        build: true,
        mats: {},
        animal: true
    }
];

// Cache de imagens carregadas
const animalSpriteCache = {};

/**
 * Carrega sprite de animal de forma assíncrona
 */
async function loadAnimalSprite(url) {
    if (animalSpriteCache[url]) {
        return animalSpriteCache[url];
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            animalSpriteCache[url] = img;
            resolve(img);
        };
        img.onerror = () => {
            console.warn(`Falha ao carregar sprite de animal: ${url}`);
            reject(new Error(`Failed to load ${url}`));
        };
        img.src = url;
    });
}

/**
 * Renderiza animal em canvas context
 */
function drawAnimal(ctx, animalData, frameIndex, x, y, scale = 1) {
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
        animalData.frameWidth * scale,
        animalData.frameHeight * scale
    );
}

/**
 * Obtém sprite preview para UI
 */
function getAnimalPreviewImage(animalId) {
    const animal = ANIMALS_DATA.find(a => a.id === animalId);
    if (!animal) return null;
    
    return animalSpriteCache[animal.spriteUrl];
}

// Export para uso global
window.ANIMALS_DATA = ANIMALS_DATA;
window.loadAnimalSprite = loadAnimalSprite;
window.drawAnimal = drawAnimal;
window.getAnimalPreviewImage = getAnimalPreviewImage;