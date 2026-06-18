onmessage = event => {
    const KEY = {
        stone: {name: "Stone"},
        wood: {name: "Wood"},
        gold: {name: "Gold"},
        silver: {name: "Silver"},
        clay: {name: "Clay"},
        obsidian: {name: "Obsidian"},
        escape_lantern: {name: "Escape Lantern"},
        dragon_scale: {name: "Dragon Scale"},
        red_dye: {name: "Red Dye"},
        tinder: {name: "Tinder"},
        charcoal: {name: "Charcoal"},
        hide: {name: "Hide"},
        flint: {name: "Flint"},
        bone: {name: "Bone"},
        dirt: {name: "Dirt"},
        bronze: {name: "Bronze"},
        wool: {name: "Wool"},
        feather: {name: "Feather"},
        flower_seed: {name: "Flower Seed"},
        holly_seed: {name: "Holly Seed"},
        tomato_seed: {name: "Tomato Seed"},
        lettuce_seed: {name: "Lettuce Seed"},
        onion_seed: {name: "Onion Seed"},
        salmoberry_seed: {name: "Salmoberry Seed"},
        dye_seed: {name: "Dye Seed"},
        potato: {name: "Potato"},
        pinecone: {name: "Pinecone"},
        esmerald: {name: "Esmerald"},
        ruby: {name: "Ruby"}
    };

    const floorItems = Object.values(event.data.floor || {});
    const buildItems = Object.values(event.data.build || {});
    const stackedItems = Object.values(event.data.stackedItems || {});
    
    const allItems = floorItems.concat(buildItems).concat(stackedItems);
    
    const materialsMap = allItems.reduce((all, item) => {
        if (item && item.mats) {
            for (const key in item.mats) {
                all[key] = (all[key] || 0) + item.mats[key];
            }
        }
        return all;
    }, {});

    const result = Object.entries(materialsMap)
        .map(([key, qty]) => KEY[key] ? KEY[key].name + ": " + qty : key + ": " + qty)
        .join("\n");

    postMessage(result);
};
