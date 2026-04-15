/**
 * Items Manager
 * Handles loading and managing item entities
 */

class ItemsManager {
    constructor() {
        this.items = new Map();
        this.spriteCache = new Map();
        this.loadedItems = [];
    }

    async loadItemsConfig() {
        try {
            const response = await fetch('items/config.json');
            const config = await response.json();
            
            for (const item of config.items) {
                await this.loadItem(item.id);
            }
            
            return this.items;
        } catch (error) {
            console.error('Failed to load items config:', error);
            return new Map();
        }
    }

    async loadItem(itemId) {
        try {
            const response = await fetch(`items/${itemId}.json`);
            const itemData = await response.json();
            
            // Preload sprite
            if (itemData.spriteSheet) {
                await this.preloadSprite(itemData.spriteSheet);
            }
            
            this.items.set(itemId, itemData);
            this.loadedItems.push(itemData);
            
            return itemData;
        } catch (error) {
            console.error(`Failed to load item ${itemId}:`, error);
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

    getItem(id) {
        return this.items.get(id) || null;
    }

    getAllItems() {
        return Array.from(this.items.values());
    }

    getSprite(url) {
        return this.spriteCache.get(url) || null;
    }

    addItem(itemId, itemData) {
        this.items.set(itemId, itemData);
        this.loadedItems.push(itemData);
    }

    removeItem(itemId) {
        this.items.delete(itemId);
        this.loadedItems = this.loadedItems.filter(item => item.id !== itemId);
    }
}

// Export for use in main script
const itemsManager = new ItemsManager();