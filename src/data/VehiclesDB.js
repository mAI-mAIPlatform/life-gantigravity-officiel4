export const VehiclesDB = {
    cars: [
        { id: 'car_sport', name: 'Z-Series Sport', price: 12000, speed: 200, acceleration: 15, handling: 8, rarity: 'Rare' },
        { id: 'car_neon', name: 'Neon Spectre', price: 50000, speed: 280, acceleration: 25, handling: 10, rarity: 'Legendary' },
        { id: 'car_sedan', name: 'Metro Sedan', price: 0, speed: 120, acceleration: 8, handling: 6, rarity: 'Common' },
        { id: 'car_truck', name: 'Heavy Mover', price: 8000, speed: 90, acceleration: 6, handling: 4, rarity: 'Common' }
    ],
    hover: [
        { id: 'hover_blade', name: 'Sky Blade', price: 100000, speed: 350, acceleration: 40, handling: 12, rarity: 'Exotic' }
    ]
};

// Autogenerate 30+ variants
for (let i = 0; i < 35; i++) {
    VehiclesDB.cars.push({
        id: `car_variant_${i}`,
        name: `Racer V${i + 1}`,
        price: 5000 + (i * 2000),
        speed: 150 + (i * 5),
        acceleration: 10 + (Math.random() * 10),
        handling: 5 + (Math.random() * 5),
        rarity: i > 25 ? 'Epic' : 'Rare'
    });
}

export const getVehicleById = (id) => {
    return Object.values(VehiclesDB).flat().find(v => v.id === id);
};
