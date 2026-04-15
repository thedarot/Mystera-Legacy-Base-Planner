/**
 * Animals Manager
 * Handles loading and managing animal entities with animation
 */

class AnimalsManager {
    constructor() {
        this.animals = new Map();
        this.spriteCache = new Map();
        this.loadedAnimals = [];
    }

    async loadAnimalsConfig() {
        try {
            const response = await fetch('animals/config.json');
            const config = await response.json();
            
            for (const animal of config.animals) {
                await this.loadAnimal(animal.id);
            }
            
            return this.animals;
        } catch (error) {
            console.error('Failed to load animals config:', error);
            return new Map();
        }
    }

    async loadAnimal(animalId) {
        try {
            const response = await fetch(`animals/${animalId}.json`);
            const animalData = await response.json();
            
            // Preload sprite
            await this.preloadSprite(animalData.spriteSheet);
            
            this.animals.set(animalId, animalData);
            this.loadedAnimals.push(animalData);
            
            return animalData;
        } catch (error) {
            console.error(`Failed to load animal ${animalId}:`, error);
            return null;
        }
    }

    async preloadSprite(url) {
        if (this.spriteCache.has(url)) return;
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.spriteCache.set(url, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    getAnimal(id) {
        return this.animals.get(id) || null;
    }

    getAllAnimals() {
        return Array.from(this.animals.values());
    }

    getAnimationFrames(animalId, direction = 'down') {
        const animal = this.getAnimal(animalId);
        if (!animal) return [];
        
        return animal.directions[direction]?.frames || [];
    }

    getSprite(url) {
        return this.spriteCache.get(url) || null;
    }
}

// Export for use in main script
const animalsManager = new AnimalsManager();