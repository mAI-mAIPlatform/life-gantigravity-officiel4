export const ItemsDB = {
    skins: [
        { id: 'skin_alpha', name: 'Alpha Elite', price: 1500, description: 'Standard issue NeoCity combat suit.', rarity: 'Rare', type: 'Skin' },
        { id: 'skin_phantom', name: 'Phantom Ghost', price: 5000, description: 'Experimental stealth technology.', rarity: 'Legendary', type: 'Skin' },
        { id: 'skin_citizen', name: 'Default Citizen', price: 0, description: 'Basic urban attire.', rarity: 'Common', type: 'Skin' },
        { id: 'skin_cyber', name: 'Cyber Rogue', price: 2500, description: 'Hacker-themed street style.', rarity: 'Epic', type: 'Skin' },
        { id: 'skin_neon', name: 'Neon Ninja', price: 3500, description: 'Glow-in-the-dark infiltration suit.', rarity: 'Epic', type: 'Skin' }
    ],
    weapons: [
        { id: 'weapon_pistol', name: 'N-Type Pistol', price: 500, damage: 15, range: 50, rarity: 'Common', type: 'Weapon' },
        { id: 'weapon_rifle', name: 'M-12 Rifle', price: 2500, damage: 25, range: 100, rarity: 'Rare', type: 'Weapon' },
        {
            id: 'weapon_gold', name: 'Golden M's', price: 10000, damage: 30, range: 120, rarity: 'Legendary', type: 'Weapon' },
        { id: 'weapon_smg', name: 'Neo SMG', price: 1800, damage: 12, range: 40, rarity: 'Rare', type: 'Weapon' }
    ],
    utility: [
        { id: 'health_pack', name: 'Life Kit', price: 200, effect: 'Heals 50 HP', rarity: 'Common', type: 'Utility' },
        { id: 'shield_cell', name: 'Armor Cell', price: 300, effect: 'Restores 25 Armor', rarity: 'Common', type: 'Utility' },
        { id: 'xp_boost', name: 'Pass Booster', price: 1000, effect: '+500 Life Pass XP', rarity: 'Rare', type: 'Utility' }
    ]
};

// Autogenerate to match requested scale (mocking entries for now)
for (let i = 0; i < 50; i++) {
    ItemsDB.skins.push({
        id: `skin_variant_${i}`,
        name: `Proto-Skin #${i + 1}`,
        price: 1000 + (i * 100),
        description: `Procedurally generated prototype suit variant ${i}.`,
        rarity: i > 40 ? 'Legendary' : 'Common',
        type: 'Skin'
    });
}

export const getItemById = (id) => {
    return Object.values(ItemsDB).flat().find(item => item.id === id);
};
